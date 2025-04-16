import {Blog} from "../models/blog.model.js";

export const createPost = async (req, res) => {
    const {title , content} = req.body;
    const id = req.user._id
    if(!title || !content){
        return res.status(400).json({
            success:false,
            message:'Please provide all fields'
        })
    }

    try{
        const blog = await Blog.create({
            title,
            content,
            author: id,
        })
        res.status(201).json({
            success:true,
            blog
        })
    }catch(err){
        console.log("Error in createPost: ",err)
        return res.status(500).json({
            success:false,
            message:'Server error'
        })
    }

}
export const getPosts = async (req, res) => {
}
export const getMyPosts = async (req, res) => {
}

export const getPostById = async (req, res) => {

}
export const editPost = async (req, res) => {

}

export const deletePost = async (req, res) => {
}
export const toggleLike = async (req, res) => {
}
export const addComment = async (req, res) => {
}
export const editComment = async (req, res) => {
}
export const deleteComment = async (req, res) => {
}