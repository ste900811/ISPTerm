var express = require('express');
var mysql = require('mysql');

// setting up express
var app = express()

// Set up MySQL connection
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Ilovebala@4',
  database: 'ispterm'
});

con.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL!');
});



app.get("/test", (req, res) => {
  con.query("SELECT * FROM calories", (err, result) => {
    if (err) throw err;
    res.send(result);
  })
});


// test to see if the connection is working
app.listen(3002, (err) => {
  if (err) throw err;
  console.log('App is running')
})