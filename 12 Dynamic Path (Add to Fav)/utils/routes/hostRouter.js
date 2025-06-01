const express = require('express');
const hostRouter = express.Router();
const hostController = require('../controllers/hostController');

// Route to display the add product form
hostRouter.get('/add-product', hostController.getAddProducts);

// Route to handle form submission
hostRouter.post('/add-product', hostController.postAddProducts);
hostRouter.get('/hostHome', hostController.getHostHome);
hostRouter.get('/edit-product', hostController.getEditProduct);

module.exports = hostRouter;