const Favourite = require('../models/favourite');
const Product = require('../models/products');

exports.getProducts = (req, res, next) => {
    console.log("session value", req.session);
    Product.find().then((registeredProducts)=>{
        res.render('store/home', { 
            registeredProducts,
            isLoggedIn: req.session.isLoggedIn 
        });
    });
};

exports.getCart = (req, res, next) => {
    res.render('store/cart', {
        isLoggedIn: req.session.isLoggedIn
    });
};

exports.getFavourites = (req,res,next)=>{
    Favourite.find()
    .populate('productId')
    .then((favData)=>{
        const favouriteProducts = favData.map(fav => fav.productId);
        res.render('store/favourites', { 
            favouriteProducts, 
            isLoggedIn: req.session.isLoggedIn 
        });
    });
};

exports.getProductDetail = (req, res, next) => {
    const productId = req.params.id;
    Product.findById(productId).then((product) => {
        if (!product) {
            console.log("product not found");
            return res.redirect('/store/home');
        }
        res.render('store/productDetail', { 
            product,
            isLoggedIn: req.isLoggedIn 
        });
    });
};
    
exports.addFavourite = (req, res, next) => {
    const productId = req.body.productId;
    Favourite.findOne({productId: productId}).then((existingFav)=>{
        if(existingFav){
            console.log("product already in favourites");
            return res.redirect('/favourites');
        }else{
            const fav = new Favourite({productId: productId});
            fav.save()
            .then((result)=>{
                console.log("added to favourites", result);
                res.redirect('/favourites');
            }).catch((err)=>{
                console.log("error in adding favourite", err);
            })
        }
    })
};

exports.postRemoveFavourite = (req, res, next) => {
    const productId = req.params.id;
    Favourite.findOneAndDelete({productId: productId})
    .then(result => {
        console.log("removed from favourites", result);
        res.redirect('/favourites');
    }).catch((err) => {
        console.error("error in removing favourite", err);
        res.redirect('/favourites');
    });
};