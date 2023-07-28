const { createPool } = require('mysql2/promise');
const { createSSHTunnel } = require ('./sshTunnel');
require('dotenv').config();

const { srcAddr, srcPort } = createSSHTunnel();

const db = createPool({
    host: process.env.DB_Host,
    port: process.env.DB_Port,
    user: process.env.DB_User,
    password: process.env.DB_Pass,
    database: process.env.DB_Data,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

module.exports = db;