import mongoose from "mongoose";

const connectDb=async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        })
        console.log("✅ Database connected successfully")
    } catch (error) {
        console.error("❌ Database connection error:", error.message)
        console.error("Please check:")
        console.error("1. MongoDB URL is correct in .env")
        console.error("2. Your IP is whitelisted in MongoDB Atlas")
        console.error("3. MongoDB cluster is running")
        process.exit(1)
    }
}

export default connectDb
