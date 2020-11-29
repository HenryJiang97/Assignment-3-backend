const mongoose = require('mongoose');

const UrlSchema = require('./url.schema').UrlSchema;
const UrlModel = mongoose.model("Url", UrlSchema);
mongoose.set('useFindAndModify', false);

// Insert a new url to the database
function insertUrl(url) {
    return UrlModel.create(url);
}

// Get all urls in the database
function getAllUrls() {
    return UrlModel.find().exec();
}

// Find url by short_url value
function findUrlByShortUrl(short_url) {
    return UrlModel.findOne({short_url: short_url}).exec();
}

//update long url by short_url value
function findByShortUrlAndUpdate(urlPair) {
    const short_u = urlPair.short_url;
    const long_u = urlPair.long_url;
    console.log("from model");
    console.log(long_u);
    console.log(short_u);
    const query = {short_url: short_u};
    return UrlModel.findOneAndUpdate(query, urlPair, {upsert: true}).exec();
}

//delete url Pair by long_url value
function deleteByShortUrl(short_url) {
    return UrlModel.findOneAndDelete({short_url: short_url}).exec();
}

module.exports = {
    insertUrl, 
    getAllUrls,
    findUrlByShortUrl,
    findByShortUrlAndUpdate,
    deleteByShortUrl,
}
