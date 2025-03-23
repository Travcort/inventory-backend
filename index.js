import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';
import { userRoutes } from './Auth/routes/users.js';
import { authRoutes } from './Auth/routes/auth.js';
import { productRoutes } from './Products/product.routes.js';

const app = express();

app.use(cors()); // Enable CORS for all origins
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

mongoose.connect(process.env.MONGO_LOCAL)
    .then(() => console.log('Successfully Connected to the Database'))
    .catch(err => console.log(err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
