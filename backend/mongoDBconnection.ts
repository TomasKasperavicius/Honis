// getting-started.js
import mongoose from 'mongoose';
export const mongoConnection = async () =>{
    return await mongoose.connect('mongodb://localhost:27017/E-shop');
}
