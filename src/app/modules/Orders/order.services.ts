import { Product } from '../Products/product.model';
import { TOrder, TParam } from './order.interface';
import { Order } from './order.model';

const createOrder = async (order: TOrder) => {
  const orderInstance = new Order(order);
  return await orderInstance.save();
};

const updateProductAfterOrder = async ({
  productId,
  quantity,
  inStock,
}: TParam) => {
  return await Product.findByIdAndUpdate(
    { _id: productId },
    {
      $set: {
        'inventory.quantity': quantity,
        'inventory.inStock': inStock,
      },
    },
  );
};

const getAllOrders = async () => {
  return await Order.find({});
};

const getOrdersByEmail = async (email: string) => {
  return await Order.find({ email });
};

export const OrderService = {
  updateProductAfterOrder,
  getOrdersByEmail,
  getAllOrders,
  createOrder,
};
