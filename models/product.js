// models/product.js
import mongoose from 'mongoose';
import Joi from 'joi';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 500
    },
    image: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    }
});

export const Product = mongoose.model('Product', productSchema);

export function validateProduct(product) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        description: Joi.string().min(5).max(500).required(),
        image: Joi.string().min(5).max(255).required(),
        stock: Joi.number().min(0).required()
    });
    return schema.validate(product);
}
