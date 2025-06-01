const Product = require('../models/products');
let registeredProducts = [];
exports.getAddProducts = (req, res) => {
    res.render('host/addProduct');
}; 

exports.postAddProducts = (req, res) => {
    const { name, price, description, image, rating } = req.body;
    const product = new Product(name, price, description, image, rating);
    product.save();
    console.log('Product Data:', { name, price, description, image, rating });
    res.render('host/success');
};

exports.getHostHome = (req, res) => {
    Product.fetchAll((registeredProducts)=>{
        res.render('host/hostHome', { registeredProducts });
    });
};


exports.getEditProduct = (req, res) => {
    res.render('host/editProduct');
};