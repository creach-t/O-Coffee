
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

    signUpPageAction: async(req,res) => {
        try {
            const firstname = req.body.firstname;
            const lastname = req.body.lastname;
            const email = req.body.email;
            const password = req.body.password;
            await dataMapper.signUp(firstname, lastname, email, password); 
        } catch (error) {
            console.error(error);
            res.status(500).send(`Problème avec l'inscription :\n${error.message}`);
        }
        console.log(req.session);
        res.redirect('/login');
    },

    loginPageAction: async (req, res) => {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const logged = await dataMapper.login(email, password);

            if (logged) {
                res.redirect('/');
            } else {
                res.redirect('/login');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send(`Problème avec la connexion :\n${error.message}`);
        }
    },

};

module.exports = authController;