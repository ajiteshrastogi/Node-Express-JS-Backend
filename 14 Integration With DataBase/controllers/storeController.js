const Favourite = require('../models/favourite');
const Product = require('../models/products');

exports.getProducts = (req, res, next) => {
    Product.fetchAll().then((registeredProducts)=>{
        res.render('store/home', { registeredProducts });
    });
};

exports.getCart = (req, res, next) => {
    res.render('store/cart');
};

exports.getFavourites = (req,res,next)=>{
    Favourite.getFavourites().then((favData)=>{
        favData = favData.map(fav => fav.productId);
        Product.fetchAll().then((registeredProducts)=>{
            const favouriteDetails = registeredProducts.filter((product)=>favData.includes(product._id.toString()));
            res.render('store/favourites', { registeredProducts, favouriteDetails });
        });
    })
}

exports.getProductDetail = (req, res, next) => {
    const productId = req.params.id;
    Product.findById(productId).then((product) => {
        if (!product) {
            console.log("product not found");
            return res.redirect('/store/home');
        }
        res.render('store/productDetail', { product });
    });
};

exports.addFavourite = (req, res, next) => {
    const productId = req.body.productId;
    const fav = new Favourite(productId);
    fav.save().then((result)=>{
        console.log("added to favourites", result);
    }).catch((err)=>{
        console.log("error in adding favourite", err);
    }).finally(()=>{
        res.redirect('/favourites');
    });
};

exports.postRemoveFavourite = (req, res, next) => {
    const productId = req.params.id;
    Favourite.deletebyID(productId).then(result => {
        console.log("removed from favourites", result);
        res.redirect('/favourites');
    }).catch((err) => {
        console.error("error in removing favourite", err);
        res.redirect('/favourites');
    });
};