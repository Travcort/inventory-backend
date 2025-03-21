import express from 'express';
const app = express();
app.use(express.json());
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const jwtPrivateKey = process.env.JWT_PRIVATE_KEY;

if(!jwtPrivateKey){
    console.error('FATAL ERROR: JWT Private Key is not defined.');
    process.exit(1);
}

const { PORT, NODE_ENV, MONGO_URL, MONGO_LOCAL } = process.env;
const dbUrl = NODE_ENV === 'development' ? MONGO_LOCAL : MONGO_URL;

if(!dbUrl) {
    console.error('Please set the Connection String');
    process.exit(1);
}

// Database Connection
mongoose.connect(dbUrl)
.then(() => console.log('Successfully Connected to the Database'))
.catch((error) => console.error('Failed Database Connection', error.message));

// Authentication
import { userRoutes } from './Auth/routes/users.js';
app.use('/api/users', userRoutes);

// Products
import { productRoutes } from './Products/product.routes.js';
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
