import mongoose from "mongoose";
import 'dotenv/config'


const connectionString = process.env.MONGO_URL


// 1
export const dbConnection = () => {
    mongoose.connect(connectionString).then(() => {
        console.log('Database is connected');
    })
}