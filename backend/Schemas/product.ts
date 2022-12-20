import mongoose from 'mongoose';
export const productSchema = new mongoose.Schema({
    productID: mongoose.Schema.Types.ObjectId,
    price: mongoose.Schema.Types.Decimal128,
    type: String,
    description: mongoose.Schema.Types.Mixed
});
export const Product = mongoose.model('Product', productSchema);