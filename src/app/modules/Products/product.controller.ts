import { productServices } from './product.services';
import { Request, Response } from 'express';
import { productValidationSchema } from './product.zod.validation';
import slugify from 'slugify';

const createProductIntoDB = async (req: Request, res: Response) => {
  try {
    const { product } = req.body;
    const zodParsedProduct = productValidationSchema.parse(product);

    const result = await productServices.createProductIntoDB(zodParsedProduct);

    res.status(200).json({
      success: true,
      message: 'Product created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error,
    });
  }
};

const getAllProduct = async (req: Request, res: Response) => {
  try {
    let result;

    if (typeof req.query.searchTerm === 'string') {
      const { searchTerm } = req.query;
      const slug = slugify(searchTerm, { lower: true });

      result = await productServices.getProductBySlug(slug);

      if (result.length === 0) {
        const searchToLowerCase = searchTerm.toLowerCase().trim();
        const allProducts = await productServices.getAllProduct();
        result = allProducts.filter((item) =>
          item.name.toLowerCase().includes(searchToLowerCase),
        );
      }
    } else {
      result = await productServices.getAllProduct();
    }

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};
const getSingleProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.getSingleProductById(productId);

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error,
    });
  }
};

const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { newProduct } = req.body;
    const zodParsedNewProduct = productValidationSchema.parse(newProduct);
    const result =
      await productServices.updateSingleProduct(zodParsedNewProduct);
    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error,
    });
  }
};

const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.deleteSingleProduct(productId);
    if (result.deletedCount > 0) {
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
        data: null,
      });
    }

    res.status(500).json({
      success: false,
      message: 'something went wrong , product not deleted',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};
export const productController = {
  getSingleProductById,
  createProductIntoDB,
  updateSingleProduct,
  deleteSingleProduct,
  getAllProduct,
};
