import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

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

const app = express();
app.use(express.json());
import { router } from './product.routes.js';
app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`)
})