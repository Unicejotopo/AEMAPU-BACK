const mysql = require('mysql');

const pool = mysql.createPool({
    host: process.env.HOSTNAME,
    user: process.env.USERDB,
    password: process.env.PASSWORDDB,
    port: process.env.PORTDB,
    database: process.env.DATABASE
});

global.db = pool;