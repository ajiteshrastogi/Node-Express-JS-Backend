const Product = require('../models/products');

exports.getAddProducts = (req, res, next) => {
    res.render('host/addProduct', { 
        edit: false,
        product: null,
        isLoggedIn: req.session.isLoggedIn
    });
}; 

exports.postAddProducts = (req, res, next) => {
    const { name, price, description, image, rating } = req.body;
    const product = new Product({name, price, description, image, rating});
    product.save().then(() => {
        console.log("Product saved");
    }).catch(err => {
        console.error("Error saving product:", err);
    });
    res.redirect('/host/hostHome');
};

exports.getHostHome = (req, res, next) => {
    Product.find().then((registeredProducts)=>{
        res.render('host/hostHome', { registeredProducts, isLoggedIn: req.session.isLoggedIn });
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
            edit: edit,
            isLoggedIn: req.session.isLoggedIn
        });
    });
}

exports.postEditProduct = (req, res, next) =>{ 
    const { id, name, price, description, image, rating } = req.body;
    Product.findById(id).then((product)=>{
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.rating = rating;
        product.save().then((result)=>{
            console.log("updated product", result);
        }).catch(err =>{
            console.log("error in updating product", err);
        })
        res.redirect('/host/hostHome');
    }).catch((err)=>{ 
        console.log("error in finding product", err);
    });
};

exports.postRemoveProduct = (req, res, next) =>{
    const productId = req.params.id;
    Product.findByIdAndDelete(productId)
    .then(()=>{
        console.log("removed product");
        res.redirect('/host/hostHome');
    }).catch((err)=>{
        console.log("error in removing product", err);
    });
};