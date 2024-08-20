import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../model/user.model.js";
import { Product } from "../model/product.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import mongoose from "mongoose";

// Controller functions

export const viewCart = asyncHandler(async (req, res) => {
  try {
    const cartItems = await User.find();
    return res.status(201).json(new ApiResponse(200, cartItems));
  } catch (error) {
    throw new ApiError(404, "Not Found", error);
  }
});

///////////////////////////////////////////////////////////////////////////////////////
export const addToCart = asyncHandler(async (req, res) => {
  try {
    const { productId, count } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      throw new ApiError(404, "Product not found");
    }
    
    if (product.stock < count) {
      throw new ApiError(400, "Not enough stock");
    }

    let cartItem = await User.findOne({ productId });

    if (cartItem) {
      cartItem.count += count;
    } else {
      cartItem = new User({
        productId,
        count,
        name: product.name,
        price: product.price,
      });
    }

    product.stock -= count;

    await Product.findByIdAndUpdate(productId, { stock: product.stock });
    await cartItem.save();

    return res.status(201).json(new ApiResponse(200, cartItem, "Added successfully"));
  } catch (error) {
    throw new ApiError(400, error.message);
  }
});

///////////////////////////////////////////////////////////////////////////////////////

export const deleteFromCart = asyncHandler(async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    const cartItem = await User.findOne({ productId });
    
    if (!product) {
      throw new ApiError(404, "Product not found");
    }
    if (!cartItem) {
      throw new ApiError(404, "Item not found in cart" ); 
    }

    product.stock = product.stock + cartItem.count;

    await Product.findByIdAndUpdate(productId, { stock: product.stock });
    await User.deleteOne({ productId });

    res.status(200).json(new ApiResponse(200, cartItem, "Item removed from cart successfully"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

///////////////////////////////////////////////////////////////////////////////////////////

export const deleteAllCartItems = asyncHandler( async(req, res) => {
  try {
     const cartItems = await User.find();
     if (cartItems.length === 0) {
       return res.status(200).json(new ApiResponse(200, null, "Cart is already empty"));
     }
    await User.deleteMany();
    res.status(200).json(new ApiResponse(200, "All items removed from cart successfully"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});
