const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/alumni-network', { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
    res.send('Alumni Network Backend');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
