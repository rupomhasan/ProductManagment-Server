"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const date_fns_1 = require("date-fns");
const product_services_1 = require("../Products/product.services");
const order_Zod_Validation_1 = require("./order.Zod.Validation");
const order_services_1 = require("./order.services");
const createOrder = async (req, res) => {
    try {
        const { order } = req.body;
        const product = await product_services_1.productServices.getSingleProductById(order.productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Order not found',
            });
        }
        if (product.inventory.inStock === false &&
            product.inventory.quantity === 0) {
            return res.json({
                success: false,
                message: 'Stock Out',
            });
        }
        if (product.inventory.quantity < order.quantity) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient quantity available in inventory',
            });
        }
        const productId = order.productId;
        const newOrder = {
            email: order.email,
            productId,
            price: order.quantity * product.price,
            quantity: order.quantity,
            address: order.address,
            date: (0, date_fns_1.format)(new Date(), 'dd-MM-yyyy hh:mm a'),
        };
        //  zod validation
        const zodParsedOrder = order_Zod_Validation_1.orderValidationSchema.parse(newOrder);
        // set current value for update
        const quantity = product.inventory.quantity - order.quantity;
        let inStock;
        quantity > 1 ? (inStock = true) : (inStock = false);
        // set order into db
        const result = await order_services_1.OrderService.createOrder(zodParsedOrder);
        res.status(200).json({
            success: true,
            message: 'Order created successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error,
        });
    }
};
const getAllOrders = async (req, res) => {
    try {
        if (typeof req.query.email === 'string') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const email = req.query.email;
            if (emailRegex.test(email)) {
                const order = await order_services_1.OrderService.getOrdersByEmail(email);
                if (order.length === 0) {
                    res.status(404).json({
                        success: false,
                        message: 'No order found of this email',
                    });
                }
                else {
                    res.status(200).json({
                        success: true,
                        message: 'Order fetched successfully for use email',
                        data: order,
                    });
                }
            }
            else {
                res.json({
                    success: false,
                    message: 'is not a valid Email',
                });
            }
        }
        else {
            const result = await order_services_1.OrderService.getAllOrders();
            res.status(500).json({
                success: true,
                message: 'order fetched successfully',
                data: result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error,
        });
    }
};
exports.OrderController = {
    createOrder,
    getAllOrders,
};
