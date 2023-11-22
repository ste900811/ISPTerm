import React from 'react';
import { useState, useEffect } from 'react';
import '../App.css';

export const Home = () => {
  const [restaurant, setRestaurant] = useState([]);
  const [generatedMeal, setGeneratedMeal] = useState([]);

  function fetchRestaurant() {
    fetch(`http://localhost:3002/restaurantList`)
    .then((res) => res.json())
    .then((data) => {
      let temp = ["<None>"]
      data.forEach((item) => {
        temp.push(item.restaurant);
        setRestaurant(temp);
      })
    });
  }

  function generateMeal() {
    let tempCalories = document.getElementById("calories").value;
    if (tempCalories === "") {alert("Please enter calories."); return;}
    let tempRestaurant = document.getElementById("selectRestaurant").value;
    fetch(`http://localhost:3002/Meals/${tempRestaurant}/${tempCalories}`)
    .then((res) => res.json())
    .then((data) => {
      let temp = generatedMeal;
      data.forEach((item) => {
        temp.push(item);
      })
      setGeneratedMeal(temp);
      console.log(generatedMeal)
    });
  }

  useEffect(() => {
    fetchRestaurant();
  }, []);

  return(



    <div className="App">
      <div id="title">Home</div>
      <div className="homeBodyTitle">Random Meal Generator</div>
      <div className="homeBody">
        <div className="input">Restaurant Perfer:
          <select id="selectRestaurant">
            {restaurant.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
        <div className="input">
          Calories: <input type="text" id="calories"/>
        </div>
        <div className="buttonDiv" onClick={generateMeal}><button>Generate</button></div>
        <div className="displayArea">
          {generatedMeal.map((item) => {<div>{item.mealName}{item.calories}{item.price}</div>})}
{/* 
          <table>
            <tbody>
            <tr><th>Meal</th><th>Calories</th><th>Price</th></tr>
            {generatedMeal.map((item) => {<tr>
                                                <th>{item.mealName}</th>
                                                <th>{item.calories}</th>
                                                <th>{item.price}</th>
                                              </tr>})}
            </tbody>
          </table> */}
        </div>
      </div>
    </div>
  );
}
