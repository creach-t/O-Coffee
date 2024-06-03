const dotenv = require('dotenv');
const express = require('express');

dotenv.config();
const router = require('./app/router');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.use(express.static('public'));

app.use(
  session({
    // Secret permet de chiffre l'id du cookie de session
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  if (!req.session.deck) {
    req.session.deck = [];
  }
  next(); 
});

app.use(router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
