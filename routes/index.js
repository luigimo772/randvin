var express = require('express');
var router = express.Router();

var UPSTREAM_VIN_URL = process.env.VIN_UPSTREAM_URL || 'http://randomvin.com/getvin.php?type=real';
var FETCH_TIMEOUT_MS = 10000;
var VIN_PATTERN = /^[A-HJ-NPR-Z0-9]{17}$/i;

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'randvin' });
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
        var vin = (await response.text()).trim();
        if (!VIN_PATTERN.test(vin)) {
            return res.status(502).json({ error: 'Upstream service returned an invalid VIN' });
        }
        res.json({ vin: vin });
    } catch (err) {
        if (err && (err.name === 'AbortError' || err.name === 'TimeoutError')) {
            return res.status(504).json({ error: 'Upstream request timed out' });
        }
        return res.status(502).json({ error: 'Failed to fetch VIN from upstream' });
    }
});

module.exports = router;
