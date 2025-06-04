const { ObjectId } = require('mongodb');
const { getDB } = require("../utils/database");

module.exports = class Favourite {
   constructor(productId){
    this.productId = productId;
   }
   save(){
    const db = getDB();
    return db.collection('favourites').findOne({productId: this.productId})
    .then(existingFav => {
        if(!existingFav){
            return db.collection('favourites').insertOne(this);
        }
        return Promise.resolve();
        })
    }
    static getFavourites(){
        const db = getDB();
        return db.collection('favourites').find().toArray();
    }       

    static deletebyID(delProductId){
        const db = getDB();
        return db.collection('favourites').deleteOne({productId: delProductId});
    }
};