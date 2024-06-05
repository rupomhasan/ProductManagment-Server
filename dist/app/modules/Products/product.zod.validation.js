"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidationSchema = exports.inventoryValidationSchema = exports.variantsValidationSchema = void 0;
const zod_1 = require("zod");
exports.variantsValidationSchema = zod_1.z.object({
    type: zod_1.z.string(),
    value: zod_1.z.string(),
});
exports.inventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z.number(),
    inStock: zod_1.z.boolean(),
});
exports.productValidationSchema = zod_1.z.object({
    _id: zod_1.z.string().optional(),
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    price: zod_1.z.number(),
    category: zod_1.z.string(),
    tags: zod_1.z.array(zod_1.z.string()),
    variants: zod_1.z.array(exports.variantsValidationSchema),
    inventory: exports.inventoryValidationSchema,
    slug: zod_1.z.string().optional(),
});
