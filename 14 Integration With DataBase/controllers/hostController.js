const Product = require('../models/products');

exports.getAddProducts = (req, res, next) => {
    res.render('host/addProduct', { 
        edit: false,
        product: null
    });
}; 

exports.postAddProducts = (req, res, next) => {
    const { name, price, description, image, rating } = req.body;
    const product = new Product(null, name, price, description, image, rating);
    product.save().then(() => {
        console.log("Product saved");
    }).catch(err => {
        console.error("Error saving product:", err);
    });
    res.redirect('/host/hostHome');
};

exports.getHostHome = (req, res, next) => {
    Product.fetchAll().then((registeredProducts)=>{
        res.render('host/hostHome', { registeredProducts });
    });
};

exports.getEditProduct = (req, res, next) =>{
    const productId = req.params.id;
    const edit = req.query.edit === 'true';
    Product.findById(productId).then((product)=>{
        if(!product){
            return res.redirect('/host/hostHome');
        }
        res.render('host/addProduct', { 
            product: product,
            edit: edit
        });
    });
}

exports.postEditProduct = (req, res, next) =>{ 
    const { id, name, price, description, image, rating } = req.body;
    const product = new Product(id, name, price, description, image, rating);
    product.save().then((result)=>{
        console.log("updated product", result);
    });
    res.redirect('/host/hostHome');
};

exports.postRemoveProduct = (req, res, next) => {
    const productId = req.params.id;
    Product.removeById(productId)
        .then(() => {
            console.log("Product removed successfully");
            res.redirect('/host/hostHome');
        })
        .catch((err) => {
            console.error("Error removing product:", err);
            res.redirect('/host/hostHome');
        });
};