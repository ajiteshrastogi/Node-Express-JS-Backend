const Favourite = require('../models/favourite');
const Product = require('../models/products');

exports.getProducts = (req, res) => {
    Product.fetchAll((registeredProducts)=>{
        res.render('store/home', { registeredProducts });
    });
};

exports.getCart = (req, res) => {
    res.render('store/cart');
};

exports.getFavourites = (req,res)=>{
    Favourite.getFavourites((favData)=>{
        Product.fetchAll((registeredProducts)=>{
            const favouriteDetails = registeredProducts.filter((product)=>favData.includes(product.id.toString()));
            res.render('store/favourites', { registeredProducts, favouriteDetails });
        });
    })
}

exports.getProductDetail = (req, res) => {
    const productId = req.params.id;
    Product.findById(productId, (product) => {
        if (!product) {
            return res.redirect('/404');
        }
        res.render('store/productDetail', { product });
    });
};

exports.addFavourite = (req, res) => {
    Favourite.addFavourite(req.body.productId, (err)=>{
        if(err){
            console.log("error in adding favourite");
        }
        res.redirect('/favourites');
    });
}