const { response } = require('express');
const express = require('express');
const { insertUrl, getAllUrls, findUrlByLongUrl, findUrlByShortUrl, findByShortUrlAndUpdate, deleteByLongUrl, deleteByShortUrl } = require('../db/url.model');
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
router.get('/long/:long_url', function(req, res) {
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
    console.log("this is req body");
    console.log(req.body);
    console.log(req.body.short_url);
    const urlPair = {
        long_url: req.body.long_url,
        short_url: req.body.short_url,
    };
    console.log("this is url Pair");
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

// Update long url using short url in the db
router.put('/:short_url', function (req, res) {
    // const long_url = req.query.long_url;
    // const short_url = req.params.short_url;

    const urlPair = {
        long_url: req.query.long_url,
        short_url: req.params.short_url,
    };

    let urlres = null;
    findByShortUrlAndUpdate(urlPair)
        .then(function (response) {
            urlres = response;
            return res.status(200).send(response);
        }, function (error) {
            return res.status(500).send("Issue updating long url by short url");
        })
        .then(function () {
            console.log("update long url successfully!")
        })
        .then(function () {
            console.log(urlres)
        })
        .catch(function() {
            console.error("couldn't update long url")
        })


    console.log(urlres)

})

// Delete url pair by long url
router.delete('/long/:long_url', function(req, res) {
    return deleteByLongUrl(req.params.long_url)
        .then(
            (response) => res.status(200).send(response),
            (error) => res.status(404).send("No certain long url in the db")
        );
});

// Delete url pair by short url
router.delete('/:short_url', function(req, res) {
    return deleteByShortUrl(req.params.short_url)
        .then(
            (response) => res.status(200).send(response),
            (error) => res.status(404).send("No certain long url in the db")
        );
});




module.exports = router;