"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_router_1 = require("./app/modules/Products/product.router");
const cors_1 = __importDefault(require("cors"));
const order_router_1 = require("./app/modules/Orders/order.router");
const app = (0, express_1.default)();
//parser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/products', product_router_1.ProductRoutes);
app.use('/api/orders', order_router_1.OrderRoutes);
app.get('/', (req, res) => {
    res.send('hello');
});
app.use((req, res, next) => {
    res.json({
        success: false,
        message: 'Route not found',
    });
    next;
});
exports.default = app;
