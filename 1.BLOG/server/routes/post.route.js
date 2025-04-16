import {Router} from "express";
import {protectRoute} from "../middleware/auth.js";
import {
    addComment, createPost,
    deleteComment,
    deletePost,
    editComment, editPost,
    getMyPosts, getPostById, getPosts,
    toggleLike
} from "../controllers/blog.controller.js";

const postRouter = Router();


postRouter.post('/create-post', createPost);
postRouter.get('/get-posts', getPosts);
postRouter.get('/get-my-posts', getMyPosts);
postRouter.get('/post/:id', getPostById);
postRouter.put('/edit-post/:id', protectRoute, editPost);
postRouter.delete('/delete-post',protectRoute,deletePost);

postRouter.put('/toggle-like',toggleLike);
postRouter.post('/add-comment', addComment);
postRouter.put('/comment/:commentId', protectRoute, editComment)
postRouter.delete('/comment/:commentId', protectRoute, deleteComment)


export default postRouter;