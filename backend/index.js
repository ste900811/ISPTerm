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

// endpoint for mutiple page
app.get("/restaurantList", async (req, res) => {
  let query = "SELECT DISTINCT restaurant FROM favoritemeal";
  console.log("fetching restaurant")
  con.query(query, (err, result) => {
    if (err) throw err;
    res.status(200).send(result);
  })
});

// endpoint for home page
app.get("/Meals/:tempRestaurant/:tempCalories", async (req, res) => {
  let tempCalories = req.params.tempCalories;
  let query = `SELECT * FROM favoritemeal Where calories <= ${tempCalories} + 100`;
  let tempRestaurant = req.params.tempRestaurant;
  if (tempRestaurant != "<None>") {query += ` AND restaurant = "${tempRestaurant}"`}
  console.log("fetching meals")
  con.query(query, (err, result) => {
    if (err) throw err;
    res.status(200).send(result);
  })
});

// endpoint for Cal Calculator page
app.get("/cal/:gender/:age", async (req, res) => {
  const gender = req.params.gender;
  const age = req.params.age;
  let query = "SELECT calories FROM calories WHERE gender = \"" + gender + "\" AND age = " + age;
  con.query(query, (err, result) => {
    if (err) throw err;
    res.status(200).send(result);
  })
});

// endpoint for Add/Delete page

app.get("/addDelete/mealName/:restaurant", async (req, res) => {
  const restaurant = req.params.restaurant;
  let query = "SELECT mealName FROM favoritemeal WHERE restaurant = \"" + restaurant + "\"";
  console.log("fetching mealName")
  con.query(query, (err, result) => {
    if (err) throw err;
    res.status(200).send(result);
  })
});

app.get("/addDelete/add/:restaurant/:mealName/:calories/:price", async (req, res) => {
  const restaurant = req.params.restaurant;
  const mealName = req.params.mealName;
  const calories = req.params.calories;
  const price = req.params.price;
  console.log(restaurant, mealName, calories, price);
  let query = "INSERT INTO favoritemeal (restaurant, mealName, calories, price) VALUES (\"" + restaurant + "\", \"" + mealName + "\", " + calories + ", " + price + ")";
  console.log(query);
  con.query(query, (err, result) => {
    try{
      if (err) throw err;
      result = { "restaurant": restaurant, "mealName": mealName }
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      if (err.code == "ER_DUP_ENTRY") {
        res.status(400).send("Meal already exists");
      }
    }
  })
});

app.get("/addDelete/delete/:restaurant/:mealName", async (req, res) => {
  const restaurant = req.params.restaurant;
  const mealName = req.params.mealName;
  let query = "DELETE FROM favoritemeal WHERE restaurant = \"" + restaurant + "\" AND mealName = \"" + mealName + "\"";
  console.log(query);
  con.query(query, (err, result) => {
    if (err) throw err;
    res.status(200).send(result);
  })
});

// test to see if the connection is working
app.listen(3002, (err) => {
  if (err) throw err;
  console.log('App is running')
})