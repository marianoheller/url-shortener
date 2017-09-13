const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const dbUrl = 'mongodb://localhost/url_records';
mongoose.Promise = global.Promise;
const connection = mongoose.connect(dbUrl, {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    useMongoClient: true
});
autoIncrement.initialize(connection);

const Schema = mongoose.Schema;

const urlRecordSchema = new Schema({
    original_url: String,
});

urlRecordSchema.plugin(autoIncrement.plugin, 'urlRecord');

module.exports = connection.model('urlRecord', urlRecordSchema);