const { createPool } = require('mysql2/promise');
const tunnel = require("tunnel-ssh");
require('dotenv').config();

const db = createPool({
    host: process.env.DB_Host,
    port: process.env.DB_Port,
    user: process.env.DB_User,
    password: process.env.DB_Pass,
    database: process.env.DB_Data,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const tunnel = tunnel ({
    remoteHost: process.env.DB_Host, // mysql server host
    remotePort: process.env.DB_Port, // mysql server port
    verbose: true, // dump information to stdout
    disabled: false, //set this to true to disable tunnel (useful to keep architecture for local connections)
    sshConfig: { //ssh2 configuration (https://github.com/mscdex/ssh2)
        host: process.env.SSH_Host,
        port: process.env.SSH_Port,
        username: process.env.SSH_User,
        // password: 'pwd'
        privateKey: require('fs').readFileSync(process.env.SSH_Key),
        //passphrase: 'verySecretString' // option see ssh2 config
    }
});

module.exports = { db, tunnel };