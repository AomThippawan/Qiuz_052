const mysql = require ('mysql2');
const dotenv = require ('dotenv');
dotenv.config();
const connection = mysql.createPool({
    host : dotenv.DBHOST,
    user : dotenv.DBUSER,
    password : dotenv.DBPASS,
    database : dotenv.DBNAME,
    port : dotenv.PORT,
});
module.exports = connection.promise();