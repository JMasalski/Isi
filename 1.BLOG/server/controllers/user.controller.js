import {User} from "../models/user.model.js";
import {Blog} from "../models/blog.model.js";

export const getUserByProfile = async (req,res) =>{
    const {username} = req.params;
    try{
        const existingUser = await User.findOne({name:username}).select('-password ')
        if(!existingUser){
            return res.status(404).json({
                success:false,
                message:'User not found'
            })
        }

        const posts = await Blog.find({ author: existingUser._id })
            .select('content comments likes image createdAt updatedAt')
            .sort({ createdAt: -1 })
            .limit(5)
            .populate({
                path: 'comments.user',
                select: 'name profilePic -_id',
            })
            .populate('likes', '_id') // Dodaj tę linię
            .lean();



        res.status(200).json({
            success:true,
            user:existingUser,
            posts
        })

    }catch(err){
        console.log("Error in getUserByName: ",err)
        return res.status(500).json({
            success:false,
            message:'Server error'
        })
    }
}

export const updatedProfile = async(req,res) =>{
    try {
        const {...data} = req.body;
        const user = await User.findByIdAndUpdate(req.user.id, {
            ...data
        }, {new: true}).select("-password");
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({
            success: true,
            user
        })

    } catch (e) {
        console.log("Error in update user route", e);
        if (e.code === 11000 && e.keyPattern?.name) {
            return res
                .status(400)
                .json({ message: "This username is already taken." });
        }

        return res.status(500).json({message: "Internal server error"});
    }
}