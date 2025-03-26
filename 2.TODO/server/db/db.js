import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

if(!process.env.MONGO_URL){
    console.error("Mongo URL nie jest zdefiniowany");
    process.exit(1);
}

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Połączono z bazą danych")
    }catch(error){
        console.error(`Błąd: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;