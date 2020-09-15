var express = require('express');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

// GET random vin
router.get('/vin', function(req, res) {
    request('http://randomvin.com/getvin.php?type=real', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.json({vin: body});
        }
    });
});

module.exports = router;
