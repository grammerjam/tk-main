require('dotenv').config();
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const SqlDbStore = require('express-mysql-session')(session);
const cookieParser = require('cookie-parser');
//----------------------------------------- BEGINNING OF PASSPORT MIDDLEWARE AND SETUP ---------------------------------------------------
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: new SqlDbStore({
  host: process.env.DB_Host,
  port: process.env.DB_Port,
  user: process.env.DB_User,
  password: process.env.DB_Pass,
  database: process.env.DB_Data,
  }),
  resave: false,
  saveUninitialized: false,
  cookie:{
      maxAge:1000*60*60*24,
      secure: false
  }
}));
//----------------------------------------- END OF PASSPORT MIDDLEWARE SETUP ---------------------------------------------------
//----------------------------------------- REGISTER AND VERIFICATION SETUP ---------------------------------------------------
router.post('/addCardDetail', async (req, res) => {
  const name = req.body.name;
  const number = req.body.number;
  const expMonth = req.body.expMonth;
  const expYear = req.body.expYear;
  const cvc = req.body.cvc;

  try {
    const uploadCardStatus = await db.query('INSERT INTO cardstorage (cardHolderName, cardHolderNumber, cardHolderExpMonth, cardHolderExpYear, cardHolderCVC) VALUES (?, ?, ?, ?, ?)', [name, number, expMonth, expYear, cvc]);

    if (uploadCardStatus[0].affectedRows > 0) {
      return res.json({statusMessage: "Successful"});
    }
    return res.json({statusMessage: "Failed"});
  }
  catch (err) {
    return res.json({ errorMessage: 'A Server Error Occured!' });
  }
});

router.post('/retrieveAllCards', async (req, res) => {
  try {
    const allCards = await db.query('SELECT * FROM cardstorage');

    if (typeof allCards !== 'undefined') {
      return res.send(allCards);
    }
  } catch (error) {
    return res.json({ errorMessage: 'A Server Error Occured!' });
  }
})
module.exports = router;