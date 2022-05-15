// Import and require mysql2
const mysql = require('mysql2');
// Import and require dotenv
require('dotenv').config();

const DB = require("./lib/DB");
const db = new DB;


db.initDb();
