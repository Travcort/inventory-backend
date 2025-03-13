const mongoose=require('mongoose');
const express = require('express');
const app = express();
const users =require('./routes/users')

mongoose.connect('mongodb://localhost/inventory')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

    app.use(express.json());

    app.use('/api/users', users);

    const port = process.env.PORT || 4000;
    app.listen(port, () => console.log(`Server running on port ${port}`));