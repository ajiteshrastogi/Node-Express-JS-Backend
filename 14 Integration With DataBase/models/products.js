const { ObjectId } = require('mongodb');
const { getDB } = require('../utils/database');
const mongo = require('mongodb');
module.exports = class Product {
    constructor(_id, name, price, description, image, rating) {
        if(_id){
            this._id = _id;
        }
        this.name = name;
        this.price = price;
        this.description = description;
        this.image = image;
        this.rating = rating;
    }

    save() {
        const db = getDB();
        if(this._id){  //update
            const updateFields = {  
                name: this.name,
                price: this.price,
                description: this.description,
                image: this.image,
                rating: this.rating
            }
            return db.collection('products').updateOne({_id: new ObjectId(String(this._id))}, {$set: updateFields});
        }else{  //insert
            return db.collection('products').insertOne(this);
        }
    }

    static fetchAll(){
        const db = getDB();
        return db.collection('products').find().toArray();
    }

    static findById(productId) {
        const db = getDB();
        return db.collection('products').find({_id: new ObjectId(String(productId))}).next();
    }
    static removeById(productId){
        const db = getDB();
        return db.collection('products').deleteOne({_id: new ObjectId(String(productId))});
    }
};
