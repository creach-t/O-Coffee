const express = require('express');
const router = express.Router();

const mainController = require('./controllers/mainController');

router.get('/', mainController.homePage);
router.get('/detail/:reference', mainController.detailPage);
router.get('/catalogue', mainController.cataloguePage);
router.get('/catalogue/all', mainController.catalogueAllPage);

module.exports = router;