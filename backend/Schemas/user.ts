import mongoose from "mongoose";
import { productSchema } from "./product";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, default: "" },
    role: { type: String, default: "user" },
    password: { type: String, default: "" },
    email: { type: String, default: "" },
    cart: [{ type: productSchema, default: [] }],
  },
  { versionKey: false, minimize: false }
);
export const User = mongoose.model("User", userSchema);
