const mongo = require('mongodb');

const mongoClient = mongo.MongoClient;

const MONGO_URL = ""

let _db;

const mongoConnect = (callback) => {
    mongoClient.connect(MONGO_URL)
    .then(client => {
        console.log("Connected to MongoDB");
        callback();
        _db = client.db("E-CommerceMart");
    }).catch(err => {
        console.log('Error connecting to MongoDB', err);
    })
}

const getDB = () => {
    if(!_db){
        throw new Error("No database found");       
    }
    return _db;
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
