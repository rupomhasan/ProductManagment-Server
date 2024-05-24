import mongoose, { Schema } from 'mongoose';
import { TInventory, TProduct, TVariants } from './product.interface';
import slugify from 'slugify';

const variantsSchema = new Schema<TVariants>({
  type: { type: String, required: true },
  value: { type: String, required: true },
});

const inventorySchema = new Schema<TInventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

const productSchema = new Schema<TProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: { type: [variantsSchema], required: true },
  inventory: { type: inventorySchema, required: true },
  slug: { type: String }
})

productSchema.pre('save', async function (next) {
  this.slug = slugify(this.name, { lower: true })
  next

})



export const Product = mongoose.model<TProduct>('Product', productSchema);
