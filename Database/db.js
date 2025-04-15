const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root", 
  password: "AnDrE$24122005", 
  database: "tuplan_db"
});

module.exports = pool.promise();