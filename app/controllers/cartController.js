const dataMapper = require('../dataMapper.js');
const cartController = {

    cartPage: (req, res) => {
        res.render('cart',{
            cart: req.session.cart,
          });
    },

    async addToCart(req, res, next) {
        const reference = req.params.reference; // Laisser la référence en tant que chaîne de caractères
        try {
            const coffeeFound = await dataMapper.getCoffeeByReference(reference);
    
            if (!coffeeFound) {
                // Si pas trouvé, je passe la main au middleware suivant
                next();
                return;
            }
    
            // Find if the coffee is already in the cart
            const existingCoffeeIndex = req.session.cart.findIndex(coffee => coffee.reference === reference);
    
            if (existingCoffeeIndex !== -1) {
                // If coffee is already in the cart, increase the quantity
                req.session.cart[existingCoffeeIndex].quantity += 1;
            } else {
                // If coffee is not in the cart, add it with quantity 1
                req.session.cart.push({ ...coffeeFound, quantity: 1 });
            }
    
            res.redirect('/cart');
        } catch (error) {
            console.error(error);
            res.status(500).send("Erreur lors de la récupération du café");
        }
    },
    
    

    deleteFromCart(req, res) {
        const reference = req.params.reference; // Garder la référence en tant que chaîne de caractères
    
        // Filtrer le panier pour exclure l'article avec la référence spécifiée
        req.session.cart = req.session.cart.filter(coffee => coffee.reference !== reference);
    
        res.redirect('/cart');
    }

}

module.exports = cartController;