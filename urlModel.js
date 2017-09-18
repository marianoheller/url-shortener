const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

require('dotenv').config();

//const dbUrl = 'mongodb://localhost/url_records';
const dbUrl = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ds141524.mlab.com:41524/url_shortener_db`
//const dbUrl = `mongodb://@ds141524.mlab.com:41524/url_shortener_db`;
mongoose.Promise = global.Promise;
const connection = mongoose.connect(dbUrl, {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    useMongoClient: true,
    user: process.env.DB_USERNAME,
    pass: process.env.DB_PASSWORD,
});
autoIncrement.initialize(connection);

const Schema = mongoose.Schema;

const urlRecordSchema = new Schema({
    original_url: String,
});

urlRecordSchema.plugin(autoIncrement.plugin, 'urlRecord');

module.exports = connection.model('urlRecord', urlRecordSchema);