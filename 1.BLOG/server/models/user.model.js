import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    profilePic:{
        type:String,
        default: "",
    },
    bio:{
        type:String,
        default: "",
    },
    city:{
        type:String,
        default: "",
    },
    linkBio:{
        type:String,
        default: "",
    },
    backgroundPic:{
        type:String,
        default: "",
    },

}, { timestamps: true })

export const User = mongoose.model('User', userSchema)
