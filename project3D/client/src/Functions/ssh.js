import React from 'react'
require('dotenv').config();


function ssh() {
    const SSH = require('simple-ssh');
    const shell = new SSH({
        host: process.env.SSH_Host,
        user: process.env.SSH_User,
        key: process.env.SSH_Key
    })

    shell.exec('echo $PATH', {
        out: function(stdout) {
            console.log(stdout);
        }
    }).start();

    // shell.exec('echo', {
    //     args: ['$PATH'],
    //     out: function(stdout) {
    //         console.log(stdout)
    //     }
    // }).start();
}

export default ssh
