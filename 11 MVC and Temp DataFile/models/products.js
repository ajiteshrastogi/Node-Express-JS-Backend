const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtil');

const dataDir = path.join(rootDir, 'data');
const filePath = path.join(dataDir, 'products.json');

// Create data directory if it doesn't exist
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

let registeredProducts = [];

module.exports = class Product {
    constructor(name, price, description, image, rating) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.image = image;
        this.rating = rating;
    }

    save() {
        Product.fetchAll((registeredProducts)=>{    
            registeredProducts.push(this);
            const filePath = path.join(rootDir, 'data', 'productData.json');
            fs.writeFileSync(filePath, JSON.stringify(registeredProducts), (err)=>{
                console.log(err);
            });
        });
    }
    static fetchAll(callback){
        const filepath = path.join(rootDir, 'data', 'productData.json');
        fs.readFile(filepath, (err, data)=>{    
            if(err){    
                callback([]);   
            }   
            callback(JSON.parse(data));
        }); 
    }
};