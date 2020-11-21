const mongoose = require('mongoose');

exports.UrlSchema = new mongoose.Schema({
    long_url: String,
    short_url: String
}, {
    collection: 'url'
});