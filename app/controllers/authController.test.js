const authController = require("./authController");
const dataMapper = require("../dataMapper");
const bcrypt = require("bcrypt");

// Mock dependencies
jest.mock("../dataMapper");
jest.mock("bcrypt");

describe("authController", () => {
  let req, res;

  // Initialize the mock request and response objects before each test
  beforeEach(() => {
    req = {
      body: {}, // Mocked request body
      session: {}, // Mocked session
    };
    res = {
      render: jest.fn(), // Mocked render method
      redirect: jest.fn(), // Mocked redirect method
      status: jest.fn().mockReturnThis(), // Mocked status method
      send: jest.fn(), // Mocked send method
    };
  });

  describe("loginPage", () => {
    it("should render the login page with username from session", () => {
      req.session.firstname = "John"; // Simulate a session with a username
      authController.loginPage(req, res);
      expect(res.render).toHaveBeenCalledWith("login", { username: "John" }); // Verify the correct data is passed to render
    });
  });

  describe("signUpPage", () => {
    it("should render the signup page", () => {
      authController.signUpPage(req, res); // Call the method
      expect(res.render).toHaveBeenCalledWith("signup"); // Ensure the signup page is rendered
    });
  });

  describe("signUpPageAction", () => {
    // Use unique emails for each test to avoid conflicts
    beforeEach(() => {
      req.body = {
        firstname: "John",
        lastname: "Doe",
        email: `test${Date.now()}@example.com`, // Dynamically generate unique email
        password: "Password123!",
      };
    });

    it("should redirect to /signup if email already exists", async () => {
      dataMapper.checkEmailExists.mockResolvedValue(true); // Simulate existing email

      await authController.signUpPageAction(req, res);

      expect(dataMapper.checkEmailExists).toHaveBeenCalledWith(req.body.email); // Check that the correct email is validated
      expect(req.session.message).toBe(
        "Problème avec l'inscription : Un compte existe déjà avec cet email. Veuillez vous connecter."
      ); // Confirm the session message
      expect(res.redirect).toHaveBeenCalledWith("/signup"); // Confirm redirection to the signup page
    });

    it("should redirect to /login after successful signup", async () => {
      dataMapper.checkEmailExists.mockResolvedValue(false); // Simulate non-existing email
      bcrypt.hash.mockResolvedValue("hashedPassword"); // Simulate password hashing

      await authController.signUpPageAction(req, res);

      expect(dataMapper.signUp).toHaveBeenCalledWith(
        "John",
        "Doe",
        req.body.email,
        "hashedPassword"
      ); // Ensure the signUp method is called with the correct parameters
      expect(req.session.message).toBe(
        "Inscription réussie ! Veuillez vous connecter."
      ); // Confirm success message
      expect(res.redirect).toHaveBeenCalledWith("/login"); // Ensure redirection to login
    });

    it("should handle validation errors", async () => {
      req.body.firstname = ""; // Simulate invalid firstname

      await authController.signUpPageAction(req, res);

      expect(req.session.message).toMatch(
        /Le prénom doit contenir entre 1 et 50 caractères/
      ); // Confirm validation error message
      expect(res.redirect).toHaveBeenCalledWith("/signup"); // Ensure redirection to signup
    });

    it("should handle database errors", async () => {
      dataMapper.checkEmailExists.mockRejectedValue(
        new Error("Database error")
      ); // Simulate database error

      await authController.signUpPageAction(req, res);

      expect(req.session.message).toMatch(/Problème avec l'inscription/); // Confirm error message
      expect(res.redirect).toHaveBeenCalledWith("/signup"); // Ensure redirection to signup
    });
  });

  describe("loginPageAction", () => {
    // Use unique emails for each test to avoid conflicts
    beforeEach(() => {
      req.body = {
        email: `test${Date.now()}@example.com`,
        password: "Password123!",
      };
    });

    it("should lock user after too many failed attempts", async () => {
      dataMapper.getUserByEmail.mockResolvedValue({
        email: "test@example.com",
        password: "hashedPassword",
      }); // Simulate user data
      bcrypt.compare.mockResolvedValue(false); // Simulate incorrect password

      for (let i = 0; i < 6; i++) {
        await authController.loginPageAction(req, res); // Simulate multiple failed attempts
      }

      expect(req.session.message).toMatch(/Trop de tentatives échouées/); // Confirm lockout message
      expect(res.redirect).toHaveBeenCalledWith("/login"); // Ensure redirection to login
    });

    it("should redirect to / if login is successful", async () => {
      dataMapper.getUserByEmail.mockResolvedValue({
        email: req.body.email,
        password: "hashedPassword",
        firstname: "John",
        lastname: "Doe",
      }); // Simulate user data
      bcrypt.compare.mockResolvedValue(true); // Simulate correct password

      await authController.loginPageAction(req, res);

      expect(req.session.user).toEqual({
        firstname: "John",
        lastname: "Doe",
        email: req.body.email,
      }); // Confirm session user data
      expect(res.redirect).toHaveBeenCalledWith("/"); // Ensure redirection to home
    });

    it("should redirect to /login if email is not found", async () => {
      dataMapper.getUserByEmail.mockResolvedValue(null); // Simulate non-existing user

      await authController.loginPageAction(req, res);

      expect(req.session.message).toBe(
        "Problème avec la connexion : Email non trouvé"
      ); // Confirm error message
      expect(res.redirect).toHaveBeenCalledWith("/login"); // Ensure redirection to login
    });

    it("should handle errors during login", async () => {
      dataMapper.getUserByEmail.mockRejectedValue(new Error("Database error")); // Simulate database error

      await authController.loginPageAction(req, res);

      expect(req.session.message).toMatch(/Problème avec la connexion/); // Confirm error message
      expect(res.redirect).toHaveBeenCalledWith("/login"); // Ensure redirection to login
    });

    it("should display lockout message instead of error during lockout", async () => {
      dataMapper.getUserByEmail.mockResolvedValue({
        email: req.body.email,
        password: "hashedPassword",
      }); // Simulate user data
      bcrypt.compare.mockResolvedValue(false); // Simulate incorrect password

      for (let i = 0; i < 5; i++) {
        await authController.loginPageAction(req, res); // Simulate multiple failed attempts
      }

      await authController.loginPageAction(req, res); // Try again during lockout

      expect(req.session.message).toMatch(/Trop de tentatives échouées/); // Confirm lockout message
      expect(res.redirect).toHaveBeenCalledWith("/login"); // Ensure redirection to login
    });
  });

  describe("logoutAction", () => {
    it("should destroy session and redirect to /", () => {
      req.session.destroy = jest.fn((cb) => cb(null)); // Simulate successful session destruction

      authController.logoutAction(req, res);

      expect(req.session.destroy).toHaveBeenCalled(); // Confirm session destruction
      expect(res.redirect).toHaveBeenCalledWith("/"); // Ensure redirection to home
    });

    it("should handle errors during logout", () => {
      req.session.destroy = jest.fn((cb) => cb(new Error("Error"))); // Simulate session destruction error

      authController.logoutAction(req, res);

      expect(res.status).toHaveBeenCalledWith(500); // Confirm 500 status code
      expect(res.send).toHaveBeenCalledWith("Erreur lors de la déconnexion"); // Confirm error message
    });
  });
});
