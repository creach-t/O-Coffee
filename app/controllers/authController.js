const dataMapper = require("../dataMapper.js");
const bcrypt = require("bcrypt");

const loginAttempts = {}; // Temporary storage for login attempts
const MAX_ATTEMPTS = 5; // Maximum login attempts
const LOCK_TIME = 5 * 60 * 1000; // Lockout time in milliseconds (5 minutes)

const authController = {
  accountPage: (req, res) => {
    res.render("account");
  },

  loginPage: (req, res) => {
    res.render("login", {
      username: req.session?.firstname || null,
    });
  },

  signUpPage: (req, res) => {
    res.render("signup");
  },

  signUpPageAction: async (req, res) => {
    try {
      const { firstname, lastname, email, password } = req.body;

      // Validate input directly in controller for better feedback
      if (!firstname || firstname.length > 50) {
        throw new Error("Le prénom doit contenir entre 1 et 50 caractères");
      }

      if (!lastname || lastname.length > 50) {
        throw new Error("Le nom doit contenir entre 1 et 50 caractères");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        throw new Error("Email invalide");
      }

      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
      if (!password || !passwordRegex.test(password)) {
        throw new Error(
          "Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, un chiffre et un caractère spécial"
        );
      }

      // Check if email already exists
      const emailExists = await dataMapper.checkEmailExists(email);
      if (emailExists) {
        throw new Error(
          "Un compte existe déjà avec cet email. Veuillez vous connecter."
        );
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      await dataMapper.signUp(firstname, lastname, email, hashedPassword);
      req.session.message = "Inscription réussie ! Veuillez vous connecter.";
      res.redirect("/login");
    } catch (error) {
      console.error("Sign-up error:", error.message);

      // Save form data for user convenience
      req.session.formData = req.body;
      req.session.message = `Problème avec l'inscription : ${error.message}`;
      res.redirect("/signup");
    }
  },

  loginPageAction: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Initialize or retrieve login attempt state
      const userAttempts = loginAttempts[email] || {
        attempts: 0,
        lockUntil: 0,
      };

      // Check lockout status
      if (Date.now() < userAttempts.lockUntil) {
        const remainingTime = Math.ceil(
          (userAttempts.lockUntil - Date.now()) / 1000
        );
        req.session.message = `Trop de tentatives échouées. Réessayez dans ${remainingTime} secondes.`;
        return res.redirect("/login");
      }

      // Retrieve user from database
      const user = await dataMapper.getUserByEmail(email);
      if (!user) {
        throw new Error("Email non trouvé");
      }

      // Validate password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        // Increment login attempts
        userAttempts.attempts += 1;
        if (userAttempts.attempts >= MAX_ATTEMPTS) {
          userAttempts.lockUntil = Date.now() + LOCK_TIME; // Lock account
        }
        loginAttempts[email] = userAttempts;

        throw new Error("Mot de passe incorrect");
      }

      // Reset attempts after successful login
      delete loginAttempts[email];

      // Store user session
      req.session.user = {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      };
      req.session.message = "Connecté !";
      res.redirect("/");
    } catch (error) {
      console.error("Login error:", error.message);

      // Save partial form data for convenience
      req.session.formData = { email: req.body.email };
      req.session.message = `Problème avec la connexion : ${error.message}`;
      res.redirect("/login");
    }
  },

  logoutAction: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Erreur lors de la déconnexion :", err);
        return res.status(500).send("Erreur lors de la déconnexion");
      }
      res.redirect("/");
    });
  },
};

module.exports = authController;
