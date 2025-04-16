import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            text: {
                type: String,
                required: true,
                trim: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            }
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ]
}, { timestamps: true })

export const Blog = mongoose.model('Blog', blogSchema)