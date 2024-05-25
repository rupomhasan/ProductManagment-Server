import mongoose, { Schema } from 'mongoose';
import { TOrder } from './order.interface';

export const orderSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  productId: {
    type: String,
    required: true,
    ref: 'Product',
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: String,
  },
});

export const Order = mongoose.model<TOrder & Document>('Order', orderSchema);
