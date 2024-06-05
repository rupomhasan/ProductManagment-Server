"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const product_model_1 = require("../Products/product.model");
const order_model_1 = require("./order.model");
const createOrder = async (order) => {
    const orderInstance = new order_model_1.Order(order);
    return await orderInstance.save();
};
const updateProductAfterOrder = async ({ productId, quantity, inStock, }) => {
    return await product_model_1.Product.findByIdAndUpdate({ _id: productId }, {
        $set: {
            'inventory.quantity': quantity,
            'inventory.inStock': inStock,
        },
    });
};
const getAllOrders = async () => {
    return await order_model_1.Order.find({});
};
const getOrdersByEmail = async (email) => {
    return await order_model_1.Order.find({ email });
};
exports.OrderService = {
    updateProductAfterOrder,
    getOrdersByEmail,
    getAllOrders,
    createOrder,
};
