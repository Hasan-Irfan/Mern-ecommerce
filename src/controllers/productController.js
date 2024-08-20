import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../model/product.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// Controller functions

///////////////////////////////////////////////////////////////////////////////////////

export const addProduct = asyncHandler(async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    return res.status(201).json(new ApiResponse(200, product));
  } catch (error) {
    throw new ApiError(400, error.message);
  }
});

///////////////////////////////////////////////////////////////////////////////////////

export const viewAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(201).json(new ApiResponse(200, products));
  } catch (error) {
    throw new ApiError(404, "Not Found", error);
  }
});

///////////////////////////////////////////////////////////////////////////////////////

// export const viewProduct = asyncHandler(async (req, res) => {
//   const id = parseInt(req.params.id, 10);
//   const product = products.find(p => p.id === id);
//   if (product) {
//     return res.status(201).json(new ApiResponse(200,product));
//   } else {
//     throw new ApiError(404 , "Not Found")
//   }
// });

///////////////////////////////////////////////////////////////////////////////////////

export const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);
    return res.status(201).json(new ApiResponse(200, product, "Deleted successfully"));
  } catch (error) {
    throw new ApiError(404, "Product not found");
  }

  //   const id = parseInt(req.params.id, 10);
  //   const productIndex = products.findIndex(p => p.id === id);
  //   if (productIndex !== -1) {
  //   products.splice(productIndex, 1);
  //   return res.status(200).json(new ApiResponse(200, products, "Deleted successfully"));
  // } else {
  //   throw new ApiError(404, "Product not found");
  // }
});

///////////////////////////////////////////////////////////////////////////////////////
// put used for updating the entire resource
export const updatePutProduct = asyncHandler(async (req, res) => {
 
  try {
    const id = req.params.id;
    let product = await Product.findOneAndReplace({_id: id},req.body);
    return res.status(201).json(new ApiResponse(200, product, "Updated successfully"));
  } catch (error) {
    throw new ApiError(404, "Product not found");
  }
  // const id = parseInt(req.params.id, 10);
  // const productIndex = products.findIndex((p) => p.id === id);
  // if (productIndex !== -1) {
  //   products[productIndex].id = id;
  //   products[productIndex].name = req.body.name;
  //   products[productIndex].stock = req.body.stock;
  //   products[productIndex].price = req.body.price;
  //   return res
  //     .status(201)
  //     .json(new ApiResponse(200, req.body, "Updated succesfully"));
  // } else {
  //   res.status(404).json({ message: "Product not found" });
  // }
});

///////////////////////////////////////////////////////////////////////////////////////
// patch used for updating a single field or multiple fields in a resource
export const updatePatchProduct = asyncHandler(async (req, res) => {

  try {
    const id = req.params.id;
    let product = await Product.findByIdAndUpdate(id,req.body);
    return res.status(201).json(new ApiResponse(200, product, "Updated successfully"));
  } catch (error) {
    throw new ApiError(404, "Product not found");
  }

  // const id = parseInt(req.params.id, 10);
  // const productIndex = products.findIndex((p) => p.id === id);
  // if (productIndex !== -1) {
  //   products[productIndex] = { ...products[productIndex], ...req.body };
  //   return res
  //     .status(201)
  //     .json(
  //       new ApiResponse(200, products[productIndex], "Updated succesfully")
  //     );
  // } else {
  //   throw new ApiError(404, "Not Found");
  // }
});
