import { format } from "date-fns"
import { productServices } from "../Products/product.servic"
import { orderValidationSchema } from "./order.Zod.Validatin"
import { Order } from "./order.model"
import { OrderService } from "./order.services"
import { Request, Response } from "express"


const createOrder = async (req: Request, res: Response) => {

    try {
        const { order } = req.body

        const product = await productServices.getSingleProductById(order.productId)

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            })
        }

        if (product.inventory.inStock === false && product.inventory.quantity === 0) {
            return res.json({
                success: false,
                message: "Stock Out"
            })
        }

        if (product.inventory.quantity < order.quantity) {
            return res.status(400).json({
                success: false,
                message: "Insufficient quantity available in inventory"
            })
        }

        const productId = order.productId

        const newOrder = {
            email: order.email,
            productId,
            price: order.quantity * product.price,
            quantity: order.quantity,
            address: order.address,
            date: format(new Date(), 'dd-MM-yyyy hh:mm a')
            

        }

        //  zod validation

        const zodParsedOrder = orderValidationSchema.parse(newOrder)

        // set current value for update 
        let inStock;
        const quantity = product.inventory.quantity - order.quantity;

        quantity > 1 ? inStock = true : inStock = false

        // set order into db
        const result = await OrderService.createOrder(zodParsedOrder)

        // updating product

        const updatingProduct = await OrderService.updateProductAfterOrder({ productId, inStock, quantity })



        //  to check this 

        const updatedProduct = await productServices.getSingleProductById(order.productId)


        res.status(200).json({ success: true, message: "Order created successfully", data: result, })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error
        })

    }
}


export const OrderController = {
    createOrder
}