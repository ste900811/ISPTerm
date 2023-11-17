var express = require('express');
var cors = require('cors')
var mysql = require('mysql');

// setting up express
var app = express()
app.use(cors())

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

app.get("/cal/:gender/:age", async (req, res) => {
  const gender = req.params.gender;
  const age = req.params.age;
  let query = "SELECT calories FROM calories WHERE gender = \"" + gender + "\" AND age = " + age;
  con.query(query, (err, result) => {
    if (err) throw err;
    res.send(result);
  })
});

// test to see if the connection is working
app.listen(3002, (err) => {
  if (err) throw err;
  console.log('App is running')
})