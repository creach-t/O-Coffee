const dataMapper = require('../dataMapper.js');
const cartController = {

    cartPage: (req, res) => {
        res.render('cart', {
            cart: req.session.cart,
        });
    },

     addToCart: async (req, res, next) => {
        const reference = req.params.reference; // Laisser la référence en tant que chaîne de caractères
        try {
            const coffeeFound = await dataMapper.getCoffeeByReference(reference);
    
            if (!coffeeFound) {
                // Si pas trouvé, je passe la main au middleware suivant
                next();
                return;
            }
    
            // Vérifier si le café est disponible
            if (!coffeeFound.disponible) {
                // Si le café n'est pas disponible, stocker un message dans la session et rediriger
                req.session.message = "Malheureusement, ce café n'est plus en stock.";
                res.redirect('/catalogue/all'); // Rediriger vers une page appropriée, par exemple la page des produits
                return;
            }
    
            // Find if the coffee is already in the cart
            const existingCoffeeIndex = req.session.cart.findIndex(coffee => coffee.reference === reference);
    
            if (existingCoffeeIndex !== -1) {
                // If coffee is already in the cart, increase the quantity
                res.redirect('/cart');
            } else {
                // If coffee is not in the cart, add it with quantity 2.5
                req.session.cart.push({ ...coffeeFound, quantity: 2.5 });
                res.redirect('/cart');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send("Erreur lors de la récupération du café");
        }
    },

    async update(req, res) {
        const quantity = parseInt(req.params.quantity);

        const reference = parseInt(req.params.reference);

        const coffeeToUpdate = await dataMapper.getCoffeeByReference(reference);

        const existingCoffeeIndex = req.session.cart.findIndex(coffee => coffee.reference === coffeeToUpdate.reference);
        console.log(req.session.cart[existingCoffeeIndex]);
        if (existingCoffeeIndex !== -1) {
            req.session.cart[existingCoffeeIndex].quantity = quantity;
        }
        res.redirect('/cart');
    },

    deleteFromCart(req, res) {
        const reference = req.params.reference; // Garder la référence en tant que chaîne de caractères

        // Filtrer le panier pour exclure l'article avec la référence spécifiée
        req.session.cart = req.session.cart.filter(coffee => coffee.reference !== reference);

        res.redirect('/cart');
    }

}

module.exports = cartController;