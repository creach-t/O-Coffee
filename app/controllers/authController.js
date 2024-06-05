
const dataMapper = require('../dataMapper.js');

const authController = {

    loginPage: (req, res) => {
        res.render('login',{
            username: req.session.firstname,
        });
    },

    signUpPage: (req, res) => {
        res.render('signup');
    },

    signUpPageAction: async (req, res) => {
        try {
            const firstname = req.body.firstname;
            const lastname = req.body.lastname;
            const email = req.body.email;
            const password = req.body.password;
            await dataMapper.signUp(firstname, lastname, email, password);
            res.redirect('/login');
        } catch (error) {
            console.error(error);
            req.session.message = `Problème avec l'inscription : ${error.message}`;
            res.redirect('/signup');
        }
    },

    loginPageAction: async (req, res) => {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const result = await dataMapper.login(email, password);

            if (result.success) {
                req.session.user = {
                    firstname: result.user.firstname,
                    lastname: result.user.lastname,
                    email: result.user.email
                };
                req.session.message = "connecté";
                res.redirect('/');
            } else {
                if (result.error === 'email') {
                    req.session.message = "Email non trouvé";
                } else if (result.error === 'password') {
                    req.session.message = "Mot de passe incorrect";
                }
                res.redirect('/login');
            }
        } catch (error) {
            console.error(error);
            req.session.message = `Problème avec la connexion : ${error.message}`;
            res.redirect('/login');
        }
    },

    logoutAction: (req, res) => {
            req.session.destroy((err) => {
                if (err) {
                    console.error('Erreur lors de la déconnexion :', err);
                    res.status(500).send('Erreur lors de la déconnexion');
                } else {
                    res.redirect('/');
                }
    })
}

};

module.exports = authController;