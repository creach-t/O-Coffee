const express = require('express');
const router = express.Router();

const mainController = require('./controllers/mainController');

router.get('/', mainController.homePage);
router.get('/detail/:reference', mainController.detailPage);
router.get('/catalogue', mainController.cataloguePage);
router.get('/catalogue/all', mainController.catalogueAllPage);
router.get('/boutique', mainController.boutiquePage);
router.get('/catalogue/category', mainController.catalogueCategoryPage);

module.exports = router;