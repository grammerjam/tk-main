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
  const provider = req.body.provider

  const currentDate = new Date();
  const formattedDate = (currentDate.getMonth() + 1) + "/" + (currentDate.getFullYear() % 100);

  try {
    const checkDuplicate = await db.query('SELECT * FROM cardstorage WHERE cardHolderNumber = ?', [number]);

    if (typeof checkDuplicate[0][0] !== 'undefined') {
      return res.json({ errorMessage: 'Card already exists!' });
    }
    else {
      const uploadCardStatus = await db.query('INSERT INTO cardstorage (cardHolderName, cardHolderNumber, cardHolderExpMonth, cardHolderExpYear, cardHolderCVC, cardHolderProvider, cardSavedDate) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, number, expMonth, expYear, cvc, provider, formattedDate]);
      
      if (uploadCardStatus[0].affectedRows > 0) {
        return res.json({statusMessage: "Successful"});
      }
    }
    return res.json({statusMessage: "Failed"});
  }
  catch (err) {
    return res.json({ errorMessage: 'A Server Error Occured!' });
  }
});

router.post('/retrieveCardInfo', async (req, res) => {
  const cardID = req.body.CardID.CardID;

  try {
    const uploadCardStatus = await db.query('SELECT * FROM cardstorage WHERE cardID = ?', [cardID]);

    if (typeof uploadCardStatus[0][0] !== 'undefined') {
      return res.send(uploadCardStatus[0][0]);
    }
    return res.json({errorMessage: "Card Not Found"});
  }
  catch (err) {
    return res.json({ errorMessage: 'A Server Error Occured!' });
  }
});

router.post('/updateCardDetail', async (req, res) => {
  const cardID = req.body.cardID.CardID;
  const name = req.body.name;
  const number = req.body.number;
  const expMonth = req.body.expMonth;
  const expYear = req.body.expYear;
  const cvc = req.body.cvc;
  const provider = req.body.provider

  const currentDate = new Date();
  const formattedDate = (currentDate.getMonth() + 1) + "/" + (currentDate.getFullYear() % 100);

  try {
    const checkDuplicate = await db.query('SELECT * FROM cardstorage WHERE cardHolderNumber = ?', [number]);

    if (typeof checkDuplicate[0][0] === 'undefined' || parseInt(checkDuplicate[0][0].cardID) === parseInt(cardID)) {
      const uploadCardStatus = await db.query('UPDATE cardstorage SET cardHolderName = ?, cardHolderNumber = ?, cardHolderExpMonth = ?, cardHolderExpYear = ?, cardHolderCVC = ?, cardHolderProvider = ?, cardSavedDate = ? WHERE cardID = ?', [name, number, expMonth, expYear, cvc, provider, formattedDate, cardID]);
      if (uploadCardStatus[0].affectedRows > 0) {
        return res.json({statusMessage: "Successful"});
      }
    }
    else if (typeof checkDuplicate[0][0] !== 'undefined'){
      return res.json({ errorMessage: 'Card already exists!' });
    }
    return res.json({statusMessage: "Failed"});
  }
  catch (err) {
    return res.json({ errorMessage: 'A Server Error Occured!' });
  }
});

router.post('/deleteCardDetail', async (req, res) => {
  const cardID = req.body.cardID;

  try {
    const deleteCardStatus = await db.query('DELETE FROM cardstorage WHERE cardID = ?', [cardID]);

    if (deleteCardStatus[0].affectedRows > 0) {
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
});

router.post('/retrieveAllCardsSorted', async (req, res) => {
  let allCards = null;
  const sortOption = req.body.sortOption
  
  try {
    switch (sortOption) {

    case 'cardID':
      allCards = await db.query('SELECT * FROM cardstorage ORDER BY cardID');
      break;
    case 'cardHolderName':
      allCards = await db.query('SELECT * FROM cardstorage ORDER BY cardHolderName');
      break;
    case 'cardHolderNumber':
      allCards = await db.query('SELECT * FROM cardstorage ORDER BY cardHolderNumber');
      break;
    case 'cardHolderExpMonth':
      allCards = await db.query('SELECT * FROM cardstorage ORDER BY cardHolderExpMonth');
      break;
    case 'cardHolderCVC':
      allCards = await db.query('SELECT * FROM cardstorage ORDER BY cardHolderCVC');
      break;
    case 'cardHolderProvider':
      allCards = await db.query('SELECT * FROM cardstorage ORDER BY cardHolderProvider');
      break
    case 'cardSavedDate':
      allCards = await db.query('SELECT * FROM cardstorage ORDER BY cardSavedDate');
      break
    }

    if (typeof allCards !== 'undefined') {
      return res.send(allCards);
    }
  } catch (error) {
    return res.json({ errorMessage: 'A Server Error Occured!' });
  }
});
module.exports = router;