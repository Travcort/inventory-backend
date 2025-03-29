import express from 'express';
import { Product } from './product.schema.js';
import { auth } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const products = await Product.find();
    if (!products || products.length === 0) {
        return res.status(404).json({ success: false, message: 'The Inventory is empty!' });
    }
    res.status(200).json({ success: true, products });
});

router.post('/', [auth, admin], async (req, res) => {
    // Manual validation for required fields
    const { name, description, image, stock } = req.body;
    if (!name || !description || !image || stock === undefined) {
        return res.status(400).json({ success: false, message: 'All fields (name, description, image, stock) are required' });
    }

    try {
        const product = new Product({
            name,
            description,
            image,
            stock
        });

        await product.save();
        res.status(201).json({ success: true, product });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.put('/:id', [auth, admin], async (req, res) => {
    // Manual validation for required fields
    const { name, description, image, stock } = req.body;
    if (!name || !description || !image || stock === undefined) {
        return res.status(400).json({ success: false, message: 'All fields (name, description, image, stock) are required' });
    }

    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name,
                description,
                image,
                stock
            },
            { new: true }
        );

        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.delete('/:id', [auth, admin], async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    res.status(200).json({ success: true, message: 'Product deleted' });
});

export { router as productRoutes };