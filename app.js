const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

dotenv.config();
const router = require("./app/router");
const cartCalculations = require("./app/middlewares/cartCalculation");

const app = express();

// Configure session management
app.use(
  session({
    secret: process.env.SECRET, 
    resave: false, 
    saveUninitialized: true, 
    cookie: { secure: false },
  })
);

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for session setup and form management
app.use((req, res, next) => {
  res.locals.session = req.session;
  if (!req.session.cart) {
    req.session.cart = [];
  }
  if (req.path !== "/signup" && req.path !== "/login") {
    req.session.formData = null;
  }
  next();
});

app.use(router);

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", "app/views"); // Define the views directory

// Serve static files (CSS, JS, images) from the "public" folder
app.use(express.static("public"));

// Serve favicon from the public folder
app.use("/favicon.ico", express.static("./public/images/logo.svg"));

// Middleware for cart calculations (custom logic for cart handling)
app.use(cartCalculations);

// Attach the main router
app.use(router);

// Middleware for handling 404 errors
app.use((req, res) => {
  res.status(404).render("404", { message: "Page not found" }); // Render a 404 view
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("Error stack:", err.stack); // Log the error stack trace
  res.status(err.status || 500).render("error", { error: err.message }); // Render error page
});

// Start the server and listen on the configured port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
