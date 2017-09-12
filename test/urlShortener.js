const urlShortener = require('../urlShortener').default;
const { isUrlInvalid } = require('../urlShortener');
const assert = require('chai').assert;


describe('isUrlValid() testing', () => {

    it('should return error object on invalid url', function() {
        this.timeout(5000);
        const errorObject =  {"error":"invalid URL"};
        const invalidUrl = "invalidUrl";
        return isUrlInvalid(invalidUrl)
        .then( (ret) => {
            assert.fail(ret, undefined, "Promised should have rejected. Resolved instead.")
        }) 
        .catch( (err) => {
            assert.deepEqual(err, errorObject, 'Not returning error object correctly or Error other than ENOTFOUND');
        })
    });


    it('should return valid response (not error) on valid url', function() {
        this.timeout(5000);
        const validUrl = "www.google.com";
        return isUrlInvalid(validUrl)
        .then( (ret) => {
            assert.ok(ret, "Valid response or at least didnt throw err");
            return;
        })
        .catch( (err) => {
            assert.fail(err, null, "Promise rejected.")
        })
    })
})