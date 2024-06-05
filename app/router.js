const express = require('express');
const router = express.Router();

const mainController = require('./controllers/mainController');
const authController = require('./controllers/authController');

router.get('/', mainController.homePage);
router.get('/login', authController.loginPage);
router.post('/login', authController.loginPageAction);

router.get('/signup', authController.signUpPage);
router.post('/signup', authController.signUpPageAction);

router.get('/detail/:reference', mainController.detailPage);
router.get('/catalogue', mainController.cataloguePage);
router.get('/catalogue/all', mainController.catalogueAllPage);
router.get('/boutique', mainController.boutiquePage);
router.get('/catalogue/category', mainController.catalogueCategoryPage);

router.use(function(req, res, next) {
    res.status(404).render('404');
  });

module.exports = router;