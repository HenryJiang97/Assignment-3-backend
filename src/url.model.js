const mongoose = require('mongoose');

const UrlSchema = require('./url.schema').UrlSchema;

const UrlModel = mongoose.model("Url", UrlSchema);

function insertUrl(Url) {
    return UrlModel.create(Url);
}

function getAllUrls() {
    return UrlModel.find().exec();
}

module.exports = {
    insertUrl, 
    getAllUrls,
}
