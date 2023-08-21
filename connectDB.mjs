import { set, connect } from "mongoose";
const DB_URI = process.env.MONGODB_URI

const connectDB = async () => {
    try {
        set('strictQuery', false);
        const conn = await connect(process.env.MONGODB_URI);
        console.log(`Database Connected ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;