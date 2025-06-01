const express = require('express');
const userRouter = express.Router();

const storeController = require('../controllers/storeController');

userRouter.get('/', storeController.getProducts);
userRouter.get('/cart', storeController.getCart);
userRouter.get('/favourites', storeController.getFavourites);
userRouter.get('/product/:id', storeController.getProductDetail);
userRouter.post("/favourites", storeController.addFavourite);
module.exports = userRouter;