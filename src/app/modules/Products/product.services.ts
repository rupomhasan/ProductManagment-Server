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
  const result = await Product.findById({ _id: id });
  return result;
};
const getProductBySlug = async (name: string) => {
  const result = await Product.find({ slug: name });
  return result;
};
const updateSingleProduct = async (newProduct: TProduct) => {
  await Product.updateOne(newProduct);
  if (typeof newProduct._id === 'string') {
    const updated = await productServices.getSingleProductById(newProduct._id);

    return updated;
  }
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
