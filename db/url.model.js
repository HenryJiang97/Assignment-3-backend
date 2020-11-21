const mongoose = require('mongoose');

const UrlSchema = require('./url.schema').UrlSchema;
const UrlModel = mongoose.model("Url", UrlSchema);

// Insert a new url to the database
function insertUrl(url) {
    return UrlModel.create(url);
}

// Get all urls in the database
function getAllUrls() {
    return UrlModel.find().exec();
}

// Find url by long_url value
function findUrlByLongUrl(long_url) {
    return UrlModel.find({long_url: long_url}).exec();
}

// Find url by short_url value
function findUrlByShortUrl(short_url) {
    return UrlModel.find({short_url: short_url}).exec();
}

module.exports = {
    insertUrl, 
    getAllUrls,
    findUrlByLongUrl,
    findUrlByShortUrl
}
