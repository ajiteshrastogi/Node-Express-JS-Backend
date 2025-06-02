const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtil');

const favDataPath  = path.join(rootDir, 'data', 'favourites.json');

module.exports = class Favourite {
   static addFavourite(productId, callback){
    Favourite.getFavourites((favData)=>{
        if(favData.includes(productId)){
            callback("Home already in favourites");
        }else{
            favData.push(productId);
            fs.writeFile(favDataPath, JSON.stringify(favData), (err)=>{
                callback(err);
            });   
        } 
    });
   }

    static getFavourites(callback){
        const filePath = path.join(rootDir, 'data', 'favourites.json');
        fs.readFile(filePath, (err, data)=>{
            if(err){
                callback([]);
            }
            callback(JSON.parse(data));
        });
    }       
    static deletebyID(delProductId, callback){
        Favourite.getFavourites((favData)=>{
            const updatedFav = favData.filter(id => id !== delProductId);
            fs.writeFile(favDataPath, JSON.stringify(updatedFav), callback);
        });
    }
};