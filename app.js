const dotenv = require('dotenv');
const express = require('express');
let bodyParser = require("body-parser");
let session = require('express-session');

dotenv.config();
const router = require('./app/router');

const app = express();

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  // Si je n'ai pas le nombre dans ma session
  if (!req.session.firstname) {
    // Je l'initialise à 0
    req.session.firstname = "";
  }
  // Dans tous les cas, je passe la main au middleware suivant
  next();
});

app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.use(express.static('public'));

app.use("/favicon.ico",express.static('./public/images/logo.svg'));

app.use(router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
