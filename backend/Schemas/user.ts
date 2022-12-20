import mongoose from 'mongoose';
import {productSchema} from './product';

const userSchema = new mongoose.Schema({
    userID: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String,
    email: String,
    cart: [productSchema]
});
export const User = mongoose.model('User', userSchema);