import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './db/db.js';
import todoRoutes from "./routes/todo.route.js";

const app = express();

app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
))

app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use('/todos', todoRoutes);


app.listen(PORT,()=>{
    connectDB();
    console.log(`Serwer działa na porcie ${PORT}`)
})