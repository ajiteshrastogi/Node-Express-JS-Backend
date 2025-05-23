const express = require('express');
const path = require('path');
const userRouter = express.Router();

const productController = require('../controllers/product');

userRouter.get('/', productController.getProducts);

module.exports = userRouter;