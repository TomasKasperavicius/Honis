import mongoose from "mongoose";
export const productSchema = new mongoose.Schema(
  {
    price: { type: mongoose.Schema.Types.Decimal128, default: 0 },
    units: { type: Number, default: 0 },
    title: { type: String, default: "" },
    image: { type: String, default: "" },
    description: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { versionKey: false, minimize: false }
);
export const Product = mongoose.model("Product", productSchema);
