import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`database connected at host : ${connectionInstance.connection.host} `);
    } catch (error) {
        console.error(`mongodb connection error: ${error}`);
    }
}

export default connectDB