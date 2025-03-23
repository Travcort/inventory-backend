import express from 'express';
import { Product, validateProduct } from '../models/product.js';
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
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });

    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        stock: req.body.stock
    });

    await product.save();
    res.status(201).json({ success: true, product });
});

router.put('/:id', [auth, admin], async (req, res) => {
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            stock: req.body.stock
        },
        { new: true }
    );

    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    res.status(200).json({ success: true, product });
});

router.delete('/:id', [auth, admin], async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    res.status(200).json({ success: true, message: 'Product deleted' });
});

export { router as productRoutes };
