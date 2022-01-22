const mysql = require('mysql2/promise');

async function getConnection(){
  const connection = await mysql.createConnection({
    host: '127.0.0.1',
    port: '3309',
    user: 'root',
    password: 'puntuacion',
    database: 'my_store'
  });
  return connection;
}


module.exports = getConnection;
