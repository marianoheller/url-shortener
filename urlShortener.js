const dns = require('dns');


//Shorten url
module.exports = (url) => {
    return isUrlInvalid(url);;
}


function isUrlInvalid(url) {
    return new Promise( (resolve, reject) => {
        const errorObject =  {"error":"invalid URL"};
        dns.lookup(url, (err, addr) => {
            //this is wrong bc de lookup could 
            //fail in other ways such as no available file descriptors
            if (err) reject(errorObject);
            console.log("VALID URL!", addr, err);
            resolve(addr);
        })
    })
}