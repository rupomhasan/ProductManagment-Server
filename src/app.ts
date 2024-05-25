import express, { Request, Response } from 'express';
import { ProductRoutes } from './app/modules/Products/product.router';
import cors from 'cors';
import { OrderRoutes } from './app/modules/Orders/order.router';
const app = express();

//parser
app.use(express.json());
app.use(cors());

app.use('/api/products', ProductRoutes);

app.use('/api/orders', OrderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('hello');
});

app.use((req: Request, res: Response, next) => {
  res.json({
    success: false,
    message: 'Route not found',
  });
  next;
});

export default app;
