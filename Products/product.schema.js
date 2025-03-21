import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        requrired: true
    },
    stock: {
        type: Number,
        required: true
    }
});

export const Product = mongoose.model('Product', ProductSchema);