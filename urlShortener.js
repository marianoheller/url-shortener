const dns = require('dns');


//Shorten url
function urlShortener (url) {
    return isUrlInvalid(url);
}


function isUrlInvalid(url) {
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



module.exports = {
    default: urlShortener,
    isUrlInvalid: isUrlInvalid,
}