const { response } = require('express');
const express = require('express');
const { 
    insertUrl,
    getAllUrls,
    findUrlByShortUrl,
    findByShortUrlAndUpdate,
    deleteByShortUrl
} = require('../db/url.model');
const router = express.Router();
var urlencode = require('urlencode');

const prefix = "https://cs-5620-assignment3-frontend.herokuapp.com/";


// Get all urls in the database
router.get('/', function(req, res) {
    return getAllUrls()
    .then(
        (response) => res.status(200).send(response),
        (error) => res.status(404).send("Error getting urls")
    );
});

// Get long url by short url
router.get('/:short_url/search', function(req, res) {
    return findUrlByShortUrl(req.params.short_url)
    .then(
        (response) => res.status(200).send(response),
        (error) => res.status(404).send("Error getting urls")
    );
});

// Route to edit page
router.get('/:short_url/edit', function(req, res) {
    return res.redirect(301, `${prefix}edit/?short_url=${req.params.short_url}`)
    .then(
        (response) => res.status(200).send(response),
        (error) => res.status(404).send("Error getting urls")
    );
});

// Redirect url by short_url to long_url
router.get('/:short_url', function(req, res) {
    console.log("SHORTURL: ", req.params.short_url);
    return findUrlByShortUrl(req.params.short_url)
    .then(function(response) {
        if (response !== null) {
            const url = urlencode.decode(response.long_url, 'gbk');
            // console.log("RESPONSE: ", url);
            res.redirect(301, url);
        } else {
            res.redirect(301, `${prefix}main`);
        }
        res.status(200).send(response);
    }, function(error) {
        res.status(404).send(error);
    })
});

// Insert new url pair to the db
router.post('/', function (req, res) {
    const urlPair = {
        long_url: req.body.long_url,
        short_url: req.body.short_url,
    };

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
})

// Update long url using short url in the db
router.put('/:short_url', function (req, res) {
    const urlPair = {
        long_url: urlencode(req.query.long_url, 'gbk'),
        short_url: req.params.short_url,
    };

    console.log("PAIR: ", urlPair);

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
})

// Delete url pair by short url
router.delete('/:short_url', function(req, res) {
    return deleteByShortUrl(req.params.short_url)
        .then(
            (response) => res.status(200).send(response),
            (error) => res.status(404).send("No certain long url in the db")
        );
});


module.exports = router;