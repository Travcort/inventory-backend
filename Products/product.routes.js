import express from 'express';
import mongoose from 'mongoose'
import { Product } from "./product.schema.js";

const router = express.Router();

router.get('/products', async (req,res) => {
    try {
        const allProducts = await Product.find({});
        if(!allProducts) return res.status(404).json({ success: false, message: 'The Inventory is empty!' });

        return res.status(200).json({ success: true, products: allProducts });
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error!' });
    }
});

router.delete('/products/:id', async (req,res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid Product ID" });
    }

    const productToDelete = await Product.findById(id);
    if(!productToDelete) return res.status(404).json({ success: false, message: 'The Product does not exist!' });

    try {
        await Product.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: 'Successfully deleted the Product' });
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error!' });
    }

})

router.post('/products', async (req,res) => {
    const { name, description, image, stock } = req.body;

    if(!name || !description || !image || !stock) {
        return res.status(400).json({ success: false, message: 'You have undefined properties in the body!' });
    }

    if (isNaN(stock)) return res.status(400).json({ success: false, message: 'Stock field should be a number' });

    const newProduct = new Product({
        name: name,
        description: description,
        image: image,
        stock: stock
    });

    try {
        const updated = await newProduct.save();
        return res.status(201).json({ success: true, message: 'The Product has been created', products: updated });
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error!' });
    }
});

router.put('/products/:id', async (req,res) => {
    const id = req.params.id;
    const { name, description, image, stock } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid Product ID!" });
    }

    if(!name || !description || !image || !stock) {
        return res.status(400).json({ success: false, message: 'You have undefined properties in the body!' });
    }

    if (isNaN(stock)) return res.status(400).json({ success: false, message: 'Stock field should be a number!' });

    const newProduct = {
        name,
        description,
        image,
        stock
    };

    try {
        const updated = await Product.findByIdAndUpdate(id, newProduct, { new: true });
        return res.status(200).json({ success: true, message: 'The Product has been updated', products: updated });
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error!' });
    }
})

router.patch('/products/:id/stock', async (req,res) => {
    const id = req.params.id;
    const { stock } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid Product ID" });
    }

    if(stock === undefined) {
        return res.status(400).json({ success: false, message: 'You have undefined stock in the body!' });
    }
    if (isNaN(stock)) return res.status(400).json({ success: false, message: 'Stock field should be a number' });

    const existingProduct = await Product.findById(id);
    if(!existingProduct) return res.status(404).json({ success: false, message: 'That product does not exist!' });

    existingProduct.stock = stock;

    try {
        const updated = await existingProduct.save();
        return res.status(200).json({ success: true, message: 'The Product Stock has been updated', products: updated });
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error!' });
    }
});

export { router as productRoutes };