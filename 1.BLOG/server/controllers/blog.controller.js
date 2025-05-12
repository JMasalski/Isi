import { Blog } from "../models/blog.model.js";
import cloudinary from "../lib/cloudinary.js";

export const createPost = async (req, res) => {
  const { content,image } = req.body;
  const id = req.user.id;
  if (!content) {
    return res.status(400).json({
      success: false,
      message: "Please provide all fields",
    });
  }
  let imageUrl;

  if(image){
    const uploadRes = await cloudinary.uploader.upload(image);
    imageUrl = uploadRes.secure_url
  }
  try {
    const blog = await Blog.create({
      content,
      author: id,
      image: imageUrl
    });
    res.status(201).json({
      success: true,
      blog,
    });
  } catch (err) {
    console.log("Error in createPost: ", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
export const getPosts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const cursor = req.query.cursor;

    let query = {};
    if (cursor) {
      // Pobieramy post referencyjny (aby znać jego createdAt)
      const cursorPost = await Blog.findById(cursor);
      if (!cursorPost) return res.status(404).json({ message: "Cursor not found" });

      query = { createdAt: { $lt: cursorPost.createdAt } };
    }

    const posts = await Blog.find(query)
        .sort({ createdAt: -1 })
        .limit(limit + 1)
        .populate("author", "name profilePic")
        .populate({
          path: "comments.user",
          select: "name profilePic -_id",
        })
        .populate("likes", "name -_id");

    const hasMore = posts.length > limit;
    const resultPosts = hasMore ? posts.slice(0, -1) : posts;

    res.status(200).json({
      posts: resultPosts,
      nextCursor: hasMore ? resultPosts[resultPosts.length - 1]._id : null,
    });
  } catch (err) {
    console.error("Pagination error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
export const getMyPosts = async (req, res) => {
  const id = req.user.id;
  const posts = await Blog.find({ author: id }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    posts,
  });
};

export const getPostById = async (req, res) => {
  //TODO: get post by id
};
export const editPost = async (req, res) => {
  const { ...data } = req.body;
  const postID = req.params.id;

  if (!postID) {
    return res.status(400).json({
      success: false,
      message: "Post not found",
    });
  }

  try {
    const updatedPost = await Blog.findOneAndUpdate(
      {
        _id: postID,
        author: req.user.id,
      },
      { ...data },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found or not authorized",
      });
    }
    res.status(200).json({
      success: true,
      post: updatedPost,
    });
  } catch (err) {
    console.log("Error in editPost: ", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const deletePost = async (req, res) => {
  const id = req.user.id;
  const postID = req.params.id;
  if (!postID) {
    return res.status(400).json({
      success: false,
      message: "Post not found",
    });
  }
  try {
    const deletedPost = await Blog.findOneAndDelete({
      author: id,
      _id: postID,
    });
    if (!deletedPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found or not authorized",
      });
    }
    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (err) {
    console.log("Error in deletePost: ", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
export const toggleLike = async (req, res) => {
  try {
    const { postId } = req.body;
    const post = await Blog.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    const userId = req.user.id;
    const hasLiked = post.likes.includes(userId);

    if (hasLiked) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }
    await post.save();

    res.status(200).json({
      success: true,
      message: hasLiked ? "Post unliked" : "Post liked",
      liked: !hasLiked,
      likesCount: post.likes.length,
    });
  } catch (err) {
    console.log("Error in toggleLike: ", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
export const addComment = async (req, res) => {
  try {
    const { postId, text } = req.body;
    const post = await Blog.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    const userId = req.user.id;

    const comment = {
      user: userId,
      text,
    };

    post.comments.push(comment);

    await post.save();

    res.status(200).json({
      success: true,
      message: "Comment added successfully",
    });
  } catch (err) {
    console.log("Error in toggleLike: ", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
export const editComment = async (req, res) => {
  try {
    const { postId, commentId, newText } = req.body;

    const post = await Blog.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // znajdź komentarz
    const comment = post.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to edit this comment",
      });
    }

    comment.text = newText;

    await post.save();

    res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      comment,
    });
  } catch (err) {
    console.log("Error in editComment: ", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.body;

    const post = await Blog.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const comment = post.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this comment",
      });
    }

    post.comments.pull(commentId);
    
    await post.save();

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
      comment,
    });
  } catch (err) {
    console.log("Error in deleteComment: ", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
