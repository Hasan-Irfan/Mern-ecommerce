import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    rating: { type: Number, default: 0 },
    stock: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);


