'use strict';
const mysql = require('mysql2/promise');

//local mysql db connection
const pool = mysql.createPool({
    host: 'database-1.c80blji5uvtc.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: '',
    database: 'node_mysql_crud_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;