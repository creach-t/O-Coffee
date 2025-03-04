const express = require('express');
const router = express.Router();

const cartCalculations = require("./middlewares/cartCalculation");
const mainController = require('./controllers/mainController');
const authController = require('./controllers/authController');
const cartController = require('./controllers/cartController');

// Authentification

router.get('/', mainController.homePage);
router.get('/login', authController.loginPage);
router.post('/login', authController.loginPageAction);
router.get('/logout', authController.logoutAction)
router.get('/signup', authController.signUpPage);
router.post('/signup', authController.signUpPageAction);
router.get('/account', authController.accountPage);

// Middleware for cart calculations (custom logic for cart handling)
router.use(cartCalculations);

//Cart
router.get('/cart', cartController.cartPage);
router.get('/cart/update/:reference/:quantity', cartController.update);
router.get('/cart/add/:reference', cartController.addToCart );
router.get('/cart/delete/:reference', cartController.deleteFromCart );
router.get('/checkout', cartController.checkout );

//Catalog
router.get('/detail/:reference', mainController.detailPage);
router.get('/catalogue', mainController.cataloguePage);
router.get('/catalogue/all', mainController.catalogueAllPage);
router.get('/about', mainController.aboutPage);

router.get('/catalogue/category', mainController.catalogueCategoryPage);

//404
router.use(function(req, res, next) {
    res.status(404).render('404');
  });

module.exports = router;