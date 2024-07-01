// getting-started.js
import mongoose from 'mongoose';
mongoose.set('strictQuery', false);
export const mongoConnection = async () => {
    return await mongoose.connect(process.env.MONGODB_CONNECTION_STRING || "");
}
