"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productServices = void 0;
const product_model_1 = require("./product.model");
const createProductIntoDB = async (product) => {
    const productInstance = new product_model_1.Product(product);
    const result = productInstance.save();
    return result;
};
const getAllProduct = async () => {
    const result = await product_model_1.Product.find({});
    return result;
};
const getSingleProductById = async (id) => {
    const result = await product_model_1.Product.findOne({ _id: id });
    return result;
};
const getProductBySlug = async (name) => {
    const result = await product_model_1.Product.find({ slug: name });
    return result;
};
const updateSingleProduct = async (productId, newProduct) => {
    const { _id, ...updatedFields } = newProduct;
    const updatedProduct = await product_model_1.Product.findOneAndUpdate({ _id: productId }, updatedFields, { new: true });
    return updatedProduct;
};
const deleteSingleProduct = async (id) => {
    const result = await product_model_1.Product.deleteOne({ _id: id });
    return result;
};
exports.productServices = {
    getSingleProductById,
    createProductIntoDB,
    updateSingleProduct,
    deleteSingleProduct,
    getProductBySlug,
    getAllProduct,
};
