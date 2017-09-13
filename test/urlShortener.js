const { urlShortener, urlGetter,isUrlValid, generateUrlCode } = require('../urlShortener');
const assert = require('chai').assert;


describe('isUrlValid() testing',function () {

    it('should return error object on invalid url', function() {
        this.timeout(5000);
        const errorObject =  {"error":"invalid URL"};
        const invalidUrl = "invalidUrl";
        return isUrlValid(invalidUrl)
        .then( (ret) => {
            assert.fail(ret, undefined, "Promised should have rejected. Resolved instead.")
        }) 
        .catch( (err) => {
            assert.deepEqual(err, errorObject, 'Not returning error object correctly or Error other than ENOTFOUND');
        })
    });


    it('should return valid response (not error) on valid url with protocol', function() {
        this.timeout(5000);
        const validUrl = "https://www.google.com";
        return isUrlValid(validUrl)
        .then( (ret) => {
            assert.ok(ret, "Valid response or at least didnt throw err");
            return;
        })
        .catch( (err) => {
            assert.fail(err, null, "Promise rejected.")
        })
    })

    it('should return valid response (not error) on valid url', function() {
        this.timeout(5000);
        const validUrl = "www.google.com";
        return isUrlValid(validUrl)
        .then( (ret) => {
            assert.ok(ret, "Valid response or at least didnt throw err");
            return;
        })
        .catch( (err) => {
            assert.fail(err, null, "Promise rejected.")
        })
    })
});



describe('urlShortener tests', function() {
    it('correct "valid" url return', function() {
        const validUrl = "www.google.com";
        return urlShortener(validUrl)
        .then( (ret) => {
            assert.notEqual( ret, undefined, 'should not return undefined');
            assert.notEqual( ret.short_url, undefined, 'short_url not defined');
            assert.notEqual( ret.original_url, undefined, 'original_url not defined');
            assert.equal( ret.original_url, validUrl, 'original_url not matching url');
        } );
    })

    it('correct "invalid" url return', function() {
        const invalidUrl = "invalidUrl";
        return urlShortener(invalidUrl)
        .catch( (ret) => {
            assert.deepEqual( ret,  { error: 'invalid URL' }, 'Incorrect error object' );
        } );
    })
});



describe('generateUrlCode tests', function() {
    this.timeout(5000);
    it('should return a Number code', function() {
        const url = "www.google.com.ar";
        return generateUrlCode(url)
        .then( (ret) => {
            assert.equal( typeof(ret), "number", 'returned type is not a Number');
        } )
        .catch( (err) => {
            assert.fail(err, undefined, "generateUrlCode rejected and shouldn't have.");
        } );
    })
});


describe('urlGetter tests', function() {
    this.timeout(5000);
    it('should return a valid url after generating a short_url', function() {
        const validUrl = "www.google.com";
        return urlShortener(validUrl)
        .then( (ret) => urlGetter(ret.short_url))
        .then( (validUrl) => isUrlValid(validUrl))
        .then( (ret) => {
            assert.ok(ret, "Valid response or at least didnt throw err");
            return;
        })
        .catch( (err) => {
            assert.fail(err, null, "Promise rejected.")
        })

    })
})