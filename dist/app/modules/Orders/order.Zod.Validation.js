"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidationSchema = void 0;
const zod_1 = require("zod");
exports.orderValidationSchema = zod_1.z.object({
    productId: zod_1.z.string(),
    email: zod_1.z.string().email().trim(),
    price: zod_1.z.number().nonnegative(),
    quantity: zod_1.z.number().int().positive(),
    address: zod_1.z.string().min(1),
    dateTime: zod_1.z.string().optional(),
});
