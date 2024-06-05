"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const product_services_1 = require("./product.services");
const product_zod_validation_1 = require("./product.zod.validation");
const slugify_1 = __importDefault(require("slugify"));
const createProductIntoDB = async (req, res) => {
    try {
        const { product } = req.body;
        const zodParsedProduct = product_zod_validation_1.productValidationSchema.parse(product);
        const result = await product_services_1.productServices.createProductIntoDB(zodParsedProduct);
        res.status(200).json({
            success: true,
            message: 'Product created successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'something went wrong',
            error,
        });
    }
};
const getAllProduct = async (req, res) => {
    try {
        let result;
        if (typeof req.query.searchTerm === 'string') {
            const { searchTerm } = req.query;
            const slug = (0, slugify_1.default)(searchTerm, { lower: true });
            result = await product_services_1.productServices.getProductBySlug(slug);
            if (result.length === 0) {
                const searchToLowerCase = searchTerm.toLowerCase().trim();
                const allProducts = await product_services_1.productServices.getAllProduct();
                result = allProducts.filter((item) => item.name.toLowerCase().includes(searchToLowerCase));
            }
        }
        else {
            result = await product_services_1.productServices.getAllProduct();
        }
        res.status(200).json({
            success: true,
            message: 'Products fetched successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error,
        });
    }
};
const getSingleProductById = async (req, res) => {
    try {
        const { productId } = req.params;
        const result = await product_services_1.productServices.getSingleProductById(productId);
        if (result) {
            res.status(200).json({
                success: true,
                message: 'Products fetched successfully',
                data: result,
            });
        }
        res.status(200).json({
            success: false,
            message: 'Products does not exist',
            data: null,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'something went wrong',
            error,
        });
    }
};
const updateSingleProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { newProduct } = req.body;
        const zodParsedNewProduct = product_zod_validation_1.productValidationSchema.parse(newProduct);
        const result = await product_services_1.productServices.updateSingleProduct(productId, zodParsedNewProduct);
        if (result) {
            res.status(200).json({
                success: true,
                message: 'Product updated successfully',
                data: result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'something went wrong',
            error,
        });
    }
};
const deleteSingleProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const result = await product_services_1.productServices.deleteSingleProduct(productId);
        if (!result) {
            res.status(404).json({
                success: false,
                message: 'Already deleted',
                data: null,
            });
        }
        else if (result.deletedCount > 0) {
            res.status(200).json({
                success: true,
                message: 'Product deleted successfully',
                data: null,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'something went wrong , product not deleted',
                data: null,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error,
        });
    }
};
exports.productController = {
    getSingleProductById,
    createProductIntoDB,
    updateSingleProduct,
    deleteSingleProduct,
    getAllProduct,
};
