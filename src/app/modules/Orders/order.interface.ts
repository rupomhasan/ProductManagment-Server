export type TOrder = {
  email: string;
  productId: string;
  price: number;
  quantity: number;
  address: string;
  date?: string;
};

export type TParam = {
  productId: string;
  quantity: number;
  inStock: boolean;
};
