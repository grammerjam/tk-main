require('dotenv').config();
const host = process.env.HOST;
const port = process.env.PORT;
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("The server is running successfully. <br/>The server is running on port " + port + "... <br/>The server url is " + host + ":" + port + "...")
});

const cardRoute = require('./routes/CardData');
app.use('/CardData', cardRoute);

app.listen(port, (req, res) => (
    console.log("Server running on port " + port + "...")
));