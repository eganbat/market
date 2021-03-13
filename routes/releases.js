const express = require('express');
const router = express.Router();


router.get('/', releasesCtrl.index);

module.exports = router;