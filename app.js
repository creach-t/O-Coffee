const dotenv = require('dotenv');
const express = require('express');

dotenv.config();
const router = require('./app/router');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.use(express.static('public'));

app.use(router);

app.use(function(req, res, next) {
  res.status(404).render('404');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
