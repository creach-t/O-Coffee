const dotenv = require('dotenv');
const express = require('express');
let bodyParser = require("body-parser");
let session = require('express-session');

dotenv.config();
const router = require('./app/router');
const cartCalculations = require('./app/middlewares/cartCalculation');

const app = express();

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(bodyParser.urlencoded({ extended: true }));


app.use((req, res, next) => {
  res.locals.session = req.session;
  if (!req.session.cart) {
    req.session.cart = [];
  }
  next();
});

app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.use(express.static('public'));

app.use("/favicon.ico",express.static('./public/images/logo.svg'));

app.use(cartCalculations);

app.use(router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
