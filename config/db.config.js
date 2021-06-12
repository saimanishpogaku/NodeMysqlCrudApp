'use strict';
const mysql = require('mysql2');

//local mysql db connection
const db = mysql.createConnection({
    host: 'database-1.c80blji5uvtc.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: '',
    database: 'node_mysql_crud_db'
});

db.connect((err) => {
    if (err) {
        console.log("Database connection failed due to :" + err);
    }
    console.log("Database connected");
})
module.exports = db;