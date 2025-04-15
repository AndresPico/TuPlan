const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'AnDrE$24122005',
  database: 'tuplan_db'
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Error conectando a la base de datos:', err);
    return;
  }
  console.log('✅ Conexión exitosa a la base de datos');
});

module.exports = connection;