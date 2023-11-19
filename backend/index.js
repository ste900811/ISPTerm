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

// endpoint for Cal Calculator page
app.get("/cal/:gender/:age", async (req, res) => {
  const gender = req.params.gender;
  const age = req.params.age;
  let query = "SELECT calories FROM calories WHERE gender = \"" + gender + "\" AND age = " + age;
  con.query(query, (err, result) => {
    if (err) throw err;
    res.send(result);
  })
});

// endpoint for Add/Delete page
app.get("/addDelete/restaurant", async (req, res) => {
  console.log("fetch");
  let query = "SELECT DISTINCT restaurant FROM favoritemeal";
  con.query(query, (err, result) => {
    if (err) throw err;
    res.send(result);
  })
});

app.get("/addDelete/:restaurant/:mealName/:calories/:price", async (req, res) => {
  const restaurant = req.params.restaurant;
  const mealName = req.params.mealName;
  const calories = req.params.calories;
  const price = req.params.price;
  console.log(restaurant, mealName, calories, price);
  let query = "INSERT INTO favoritemeal (restaurant, mealName, calories, price) VALUES (\"" + restaurant + "\", \"" + mealName + "\", " + calories + ", " + price + ")";
  console.log(query);
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