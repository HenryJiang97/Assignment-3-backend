const { response } = require('express');
const express = require('express');
const { insertUrl, getAllUrls, findUrlByLongUrl, findUrlByShortUrl } = require('../db/url.model');
const router = express.Router();

const defaultUrlList = [
    {long_url: "https://test/long", 
    short_url: "https://test/short"}
];

// Get all urls in the database
router.get('/', function(req, res) {
    // return getAllUrls()
    // .then(
    //     (response) => res.status(200).send(response),
    //     (error) => res.status(404).send("Error getting urls")
    // );
    return res.status(200).send(defaultUrlList);
});

// Get url by long_url
router.get('/:long_url', function(req, res) {
    return findUrlByLongUrl(req.params.long_url)
        .then(
            (response) => res.status(200).send(response),
            (error) => res.status(404).send("No certain long url in the db")
        );
});

// Get url by short_url
router.get('/:short_url', function(req, res) {
    return findUrlByShortUrl(req.params.short_url)
    .then(
        (response) => res.status(200).send(response),
        (error) => res.status(404).send("No certain short url in the db")
    );
});

// Insert new url pair to the db
router.post('/:url', function(req, res) {
    return insertUrl(req.params.url)
        .then(
            (response) => res.status(200).send(response),
            (error) => res.status(404).send("Error inserting the url")
        );
});

// Update url in the db
router.put('/:url')


module.exports = router;