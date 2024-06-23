
const dataMapper = require('../dataMapper.js');
const bcrypt = require('bcrypt');

const authController = {

    accountPage: (req, res) => {
        res.render('account');
      },

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
            const password =  await bcrypt.hashSync(req.body.password, 10);
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
            const user = await dataMapper.getUserByEmail(email);

            if (!user) {
                req.session.message = "Email non trouvé";
                return res.redirect('/login');
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                req.session.message = "Mot de passe incorrect";
                return res.redirect('/login');
            }

            req.session.user = {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email
            };
            req.session.message = "connecté";
            res.redirect('/');
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