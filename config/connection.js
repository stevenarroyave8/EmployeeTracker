const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: 'localhost',
  port: 8889,
  user: 'root',
  password: 'root',
  database: 'employee_db',
})

connection.connect(function(err){
  if(err){
    throw err
  }
  console.log('connected')
})
module.exports = connection