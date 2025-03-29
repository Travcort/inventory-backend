import express from 'express';
import { User } from '../../models/user.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, isAdmin } = req.body;

        // Manual validation for required fields
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
        }

        // Name length validation (3–50 characters)
        if (name.length < 3 || name.length > 50) {
            return res.status(400).json({ success: false, message: 'Name must be between 3 and 50 characters' });
        }

        // Email format and length validation (5–255 characters)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email format' });
        }
        if (email.length < 5 || email.length > 255) {
            return res.status(400).json({ success: false, message: 'Email must be between 5 and 255 characters' });
        }

        // Password length validation (6–1024 characters)
        if (password.length < 6 || password.length > 1024) {
            return res.status(400).json({ success: false, message: 'Password must be between 6 and 1024 characters' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            isAdmin: isAdmin || false
        });

        await user.save();
        res.json({ success: true, user: { name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error registering user' });
    }
});

export { router as userRoutes };