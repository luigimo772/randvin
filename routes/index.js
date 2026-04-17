var express = require('express');
var router = express.Router();

var UPSTREAM_VIN_URL = 'http://randomvin.com/getvin.php?type=real';
var FETCH_TIMEOUT_MS = 10000;

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

// GET random vin
router.get('/vin', async function(req, res) {
    try {
        var response = await fetch(UPSTREAM_VIN_URL, {
            signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
        });
        if (!response.ok) {
            return res.status(502).json({ error: 'Upstream service returned an error' });
        }
        var body = await response.text();
        res.json({ vin: body.trim() });
    } catch (err) {
        if (err && err.name === 'AbortError') {
            return res.status(504).json({ error: 'Upstream request timed out' });
        }
        return res.status(502).json({ error: 'Failed to fetch VIN from upstream' });
    }
});

module.exports = router;
