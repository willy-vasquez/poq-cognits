const express = require('express');
const router = express.Router();
const getFilterProducts = require('../controller/products');

router.get('/',getFilterProducts);
router.get('/filter', getFilterProducts);

module.exports = router;