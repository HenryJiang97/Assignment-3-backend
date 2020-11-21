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
    return getAllUrls()
    .then(
        (response) => res.status(200).send(response),
        (error) => res.status(404).send("Error getting urls")
    );
    // return res.status(200).send(defaultUrlList);
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
router.post('/', function (req, res) {
    const urlPair = {
        long_url: req.body.long_url,
        short_url: req.body.shor_url,
    };
    console.log(urlPair);

    let urlres = null;
    insertUrl(urlPair)
        .then(function (response) {
            urlres = response;
            return res.status(200).send(response);
        }, function (error) {
            return res.status(500).send("Issue adding url pair");
        })
        .then(function () {
            console.log("insert data successfully!")
        })
        .then(function () {
            console.log(urlres)
        })
        .catch(function() {
            console.error("couldn't insert url pair")
        })


    console.log(urlres)

})

// Put new url pair to the db


module.exports = router;