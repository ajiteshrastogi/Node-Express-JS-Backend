const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtil');
const Favourite = require('./favourite');
const filePath = path.join(rootDir, 'data', 'productData.json');

module.exports = class Product {
    constructor(id, name, price, description, image, rating) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.image = image;
        this.rating = rating;
    }

    save() {
        Product.fetchAll((registeredProducts)=>{    
            if(this.id){
                const updatedProducts = registeredProducts.map(product => {
                    if(product.id === this.id){
                        return this;
                    }
                    return product;
                });
                fs.writeFileSync(filePath, JSON.stringify(updatedProducts), (err)=>{
                    if(err) console.log(err);
                });
            }else{
                this.id = Math.random().toString();
                registeredProducts.push(this);
                fs.writeFileSync(filePath, JSON.stringify(registeredProducts), (err)=>{
                    if(err) console.log(err);
                });
            }
        });
    }

    static fetchAll(callback){
        fs.readFile(filePath, (err, data)=>{    
            if(err){    
                callback([]);   
            }   
            callback(JSON.parse(data));
        }); 
    }

    static findById(id, callback) {
        this.fetchAll(products => {
            const product = products.find(p => p.id === id);
            callback(product);
        });
    }
    static removeById(id, callback){
        this.fetchAll(products => {
            const updatedProducts = products.filter(product =>  product.id !== id);
            fs.writeFile(filePath, JSON.stringify(updatedProducts), error=>{
                Favourite.deletebyID(id,callback);
            });
        });
    }
};
