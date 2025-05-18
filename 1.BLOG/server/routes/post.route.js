import {Router} from "express";
import {protectRoute} from "../middleware/auth.js";
import {
    addComment, createPost,
    deleteComment,
    deletePost,
    editComment, editPost,
    getPostById, getPosts,
    toggleLike
} from "../controllers/blog.controller.js";

const postRouter = Router();

//http://localhost:3000/api/v1/post/create-post
postRouter.post('/create-post', protectRoute, createPost);
//http://localhost:3000/api/v1/post/get-posts
postRouter.get('/get-posts', getPosts);

//http://localhost:3000/api/v1/post/:id
postRouter.get('/:postId', getPostById);
//http://localhost:3000/api/v1/post/edit-post/:id
postRouter.put('/edit-post/:id', protectRoute, editPost);
//http://localhost:3000/api/v1/post/delete-post
postRouter.delete('/delete-post/:id', protectRoute, deletePost);


//http://localhost:3000/api/v1/post/toggle-like
postRouter.put('/:postId/toggle-like', protectRoute, toggleLike);
//http://localhost:3000/api/v1/post/add-comment
postRouter.put('/:postId/add-comment', protectRoute, addComment);
//http://localhost:3000/api/v1/post/edit-comment
postRouter.put('/edit-comment/', protectRoute, editComment)
//http://localhost:3000/api/v1/post/delete-comment
postRouter.delete('/delete-comment/', protectRoute, deleteComment)


export default postRouter;