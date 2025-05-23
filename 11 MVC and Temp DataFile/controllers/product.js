const Product = require('../models/products');

exports.getAddProducts = (req, res) => {
    res.render('addProduct');
}; 

exports.postAddProducts = (req, res) => {
    const { name, price, description, image, rating } = req.body;
    const product = new Product(name, price, description, image, rating);
    product.save();
    console.log('Product Data:', { name, price, description, image, rating });
    res.render('success');
};

exports.getProducts = (req, res) => {
    Product.fetchAll((registeredProducts)=>{
        res.render('home', { registeredProducts });
    });
};