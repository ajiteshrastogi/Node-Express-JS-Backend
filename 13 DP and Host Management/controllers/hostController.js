const Product = require('../models/products');
let registeredProducts = [];
exports.getAddProducts = (req, res) => {
    res.render('host/addProduct', { edit: false });
}; 

exports.postAddProducts = (req, res) => {
    const { name, price, description, image, rating } = req.body;
    const product = new Product(null, name, price, description, image, rating);
    product.save();
    res.redirect('/host/hostHome');
};

exports.getHostHome = (req, res) => {
    Product.fetchAll((registeredProducts)=>{
        res.render('host/hostHome', { registeredProducts });
    });
};

exports.getEditProduct = (req, res, next) =>{
    const productId = req.params.id;
    const edit = req.query.edit === 'true';
    Product.findById(productId, (product)=>{
        if(!product){
            return res.redirect('/host/hostHome');
        }
        res.render('host/addProduct', { product, edit: true });
    });
}

exports.postEditProduct = (req, res, next) =>{
    const { id, name, price, description, image, rating } = req.body;
    const product = new Product(id, name, price, description, image, rating);
    product.save();
    res.redirect('/host/hostHome');
};

exports.postRemoveProduct = (req, res, next) =>{
    const productId = req.params.id;
    Product.removeById(productId, (error)=>{
        if(error){
            console.error(error);
        }
        res.redirect('/host/hostHome');
    });
};