const cartCalculations = (req, res, next) => {
    //
    req.app.locals.cartCount = 0;
    //calcul des totaux
    if (req.session.cart.length > 0) {
        // Des bons cas d'utilisation de reduce
        const total = req.session.cart.reduce(
            (acc, prod) => (acc += (prod.prix_kilo / 10) * prod.quantity),
            0
        );

        req.app.locals.cartCount = req.session.cart.reduce(
            (acc, prod) => (acc += prod.quantity),
            0
        );

        req.app.locals['total'] = total;

    }

    next();
};

module.exports = cartCalculations;