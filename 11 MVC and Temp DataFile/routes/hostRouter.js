const express = require('express');
const hostRouter = express.Router();
const productController = require('../controllers/product');

// Route to display the add product form
hostRouter.get('/add-product', productController.getAddProducts);

// Route to handle form submission
hostRouter.post('/add-product', productController.postAddProducts);

exports.hostRouter = hostRouter;