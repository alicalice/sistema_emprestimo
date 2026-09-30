const express = require('express');

const cors = require('cors');

const customerRoutes = require('./routes/customerRoutes')

const app = express();

app.use(express.json());

app.use(cors());

app.use(customerRoutes);

module.exports = app;