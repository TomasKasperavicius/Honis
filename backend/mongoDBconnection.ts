// getting-started.js
import mongoose from 'mongoose';
mongoose.set('strictQuery', false);
export const mongoConnection = async () =>{
    return await mongoose.connect('mongodb://localhost:27017/E-shop');
}
