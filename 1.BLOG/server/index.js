import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from "./db/db.js";
import authRouter from "./routes/auth.route.js";
import postRouter from "./routes/post.route.js";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/post', postRouter);


app.listen(PORT, () =>{
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})