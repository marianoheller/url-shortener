const urlShortener = require('../urlShortener');
const assert = require('chai').assert;

describe('urlShortener test', () => {
    it('should return error object on invalid url', () => {
        const errorObject =  {"error":"invalid URL"};
        const invalidUrl = "invalidUrl";
        return urlShortener(invalidUrl)
        .then( (ret) => {
            console.log("THEN", ret);
            assert.deepEqual(ret, errorObject, 'Not returning error object correctly');
            return true;
        })
        .catch( (err) => {
            console.log("CATCH");
            return false;
        })
    })
})