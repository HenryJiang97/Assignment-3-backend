const Schema = require('mongoose');

exports.UrlSchema = new Schema.Mongoose.Schema({
    long_url: String,
    short_url: String
}, {
    collection: 'url'
});