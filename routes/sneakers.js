const express = require('express');
const router = express.Router();
const sneakersCtrl = require('../controllers/sneakers');
const sneaker = require('../models/sneaker');

router.get('/', sneakersCtrl.index);
router.get('/new', sneakersCtrl.new);
router.get('/:id', sneakersCtrl.show);
router.post('/', sneakersCtrl.create);
router.delete('/:id', sneakersCtrl.delete);

module.exports = router;