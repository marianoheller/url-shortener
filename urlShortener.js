const dns = require('dns');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const urlRecordModel = require('./urlModel');

/**
 * //Shorten url
 * @param {string} url 
 */
function urlShortener (url) {
    return isUrlValid(url)
    .then( () => {
        //Valid URL
        return generateUrlCode(url)
        .then( (code) => {
            return {
                original_url: url,
                short_url: code,
            }
        });
    }, (ret) => ret);
}

/**
 * Checks if an url is valid or not
 * @param {string} url 
 */
function isUrlValid(url) {
    return new Promise( (resolve, reject) => {
        const errorObject =  {"error":"invalid URL"};
        dns.resolve(url, (err, addr) => {
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

/**
 * Gets url from database given short_url
 * @param {string} code Short url
 */
function urlGetter (code) {
    return new Promise( (resolve, reject) => {
        urlRecordModel.findOne({ _id: code}, (err, res) => {
            if( err ) reject(err);
            resolve(res.original_url);
        })
    })
}



module.exports = {
    urlShortener: urlShortener,
    urlGetter: urlGetter,
    isUrlValid: isUrlValid,
    generateUrlCode: generateUrlCode,
}