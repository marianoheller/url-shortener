const dns = require('dns');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');


/**
 * //Shorten url
 * @param {string} url 
 */
function urlShortener (url) {
    return isUrlValid(url)
    .then( () => {
        //Valid URL
        return {
            original_url: url,
            short_url: 1,
        }
    }, (ret) => ret);
}

/**
 * Checks if an url is valid or not
 * @param {string} url 
 */
function isUrlValid(url) {
    return new Promise( (resolve, reject) => {
        const errorObject =  {"error":"invalid URL"};
        dns.lookup(url, (err, addr) => {
            if (err) {
                if (err.code === "ENOTFOUND") reject( errorObject );
                else reject(err);
            }
            resolve(addr);
        })
    })
}



/**
 * Interacts with DB. Saves url and returns code.
 * @param {string} url 
 */
function generateUrlCode(url) {
    const dbUrl = 'mongodb://localhost/url_records';
    mongoose.Promise = global.Promise;
    const connection = mongoose.connect(dbUrl, {
        keepAlive: true,
        reconnectTries: Number.MAX_VALUE,
        useMongoClient: true
    });
    autoIncrement.initialize(connection);


    const Schema = mongoose.Schema;
    const ObjectId = Schema.ObjectId;

    const urlRecordSchema = new Schema({
        original_url: String,
        short_url: ObjectId,
    });
    urlRecordSchema.plugin(autoIncrement.plugin, 'urlRecord');

    
    const urlRecordModel = connection.model('urlRecord', urlRecordSchema);


    const urlRecord = new urlRecordModel( { original_url: url } );
    return new Promise( (resolve, reject) => {
        urlRecord.save(function (err) {
            if( err ) reject(err);
            urlRecordModel.findOne({ original_url: url}, (err, res) => {
                if( err ) reject(err);
                resolve(res._id);
            })
        });
    })
    
}



module.exports = {
    default: urlShortener,
    isUrlValid: isUrlValid,
    generateUrlCode: generateUrlCode,
}