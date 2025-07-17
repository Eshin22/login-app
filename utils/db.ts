import mongoose from "mongoose";

export const connectMongoDB=async() =>{
    try{
        const mongoUrl = process.env.MONGODB_URL;
        if (!mongoUrl) {
            throw new Error("MONGODB_URL environment variable is not defined");
        }
        await mongoose.connect(mongoUrl);
        console.log("MongoDB connected successfully");
    }catch(error){
        console.error("Error connecting to MongoDB:", error);
        throw error; // Re-throw the error to handle it in the calling function
    }
}