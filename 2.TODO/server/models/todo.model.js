import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },  
  description: { type: String }, 
  completed: { type: Boolean, default: false }, 
  createdAt: { type: Date, default: Date.now },
},{timestamps: true});