import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from "./lib/db.js";
import authRouter from "./routes/auth.route.js";
import postRouter from "./routes/post.route.js";
import userRoute from "./routes/user.route.js";

const app = express();

app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true,
    }
));
app.use(cookieParser());
//app.use(express.json());
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/post', postRouter);
app.use('/api/v1/user', userRoute);


app.listen(PORT, () =>{
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})