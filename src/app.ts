import express, { Request, Response } from 'express';
import { ProductRoutes } from './app/modules/Products/product.router';
const app = express();

//parser 
app.use(express.json())



app.use('/api/products', ProductRoutes)


app.get('/', (req: Request, res: Response) => {
  res.send('hello');
});

export default app;
