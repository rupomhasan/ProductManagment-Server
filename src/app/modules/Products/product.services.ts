import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (product: TProduct) => {
  const productInstance = new Product(product);
  const result = productInstance.save();
  return result;
};

const getAllProduct = async () => {
  const result = await Product.find({});
  return result;
};

const getSingleProductById = async (id: string) => {
  const result = await Product.findOne({ _id: id });
  return result;
};
const getProductBySlug = async (name: string) => {
  const result = await Product.find({ slug: name });
  return result;
};

const updateSingleProduct = async (
  productId: string,
  newProduct: Partial<TProduct>,
) => {
  const { _id, ...updatedFields } = newProduct;
  const updatedProduct = await Product.findOneAndUpdate(
    { _id: productId },
    updatedFields,
    { new: true },
  );
  return updatedProduct;
};

const deleteSingleProduct = async (id: string) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};

export const productServices = {
  getSingleProductById,
  createProductIntoDB,
  updateSingleProduct,
  deleteSingleProduct,
  getProductBySlug,
  getAllProduct,
};
