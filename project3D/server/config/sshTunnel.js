const { createTunnel } = require ('tunnel-ssh');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function createSSHTunnel(srcAddr = process.env.SSH_HOST, srcPort = process.env.SSH_PORT) {
    const tunnelOptions = {
        autoClose: true,
    };

    const serverOptions = {
        port: srcPort,
    };

    const sshOptions = {
        host: process.env.SSH_HOST,
        port: parseInt(process.env.SSH_PORT),
        username: process.env.SSH_User,
        privateKey: fs.readFileSync(path.join(__dirname, 'JD KeyPair.pem')),
    };

    const forwardOptions = {
        srcAddr: srcAddr,
        srcPort: srcPort,
        dstAddr: process.env.DB_Host,
        dstPort: parseInt(process.env.DB_Port),
    };

    try {
        await createTunnel(
            tunnelOptions,
            serverOptions,
            sshOptions,
            forwardOptions
        );
    } catch (error) {
        if (error.code === "EADDRINUSE") {
            // Assume port is uniquely used by SSH tunnel, so existing connection can be reused
            console.log(`Returning existing SSH tunnel on ${srcAddr}:${srcPort}.`);
            return { srcAddr, srcPort };
        } else {
            throw error;
        }
    }
    
    console.log(`SSH tunnel successfully created on ${srcAddr}:${srcPort}.`);
    
    return { srcAddr, srcPort };
}

module.exports = { createSSHTunnel };