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
      let temp = [];
      while (tempCalories > 0) {
        console.log(data)
        let index = Math.floor(Math.random() * data.length);
        console.log("pick", data[index].mealName)
        let flag = true;
        temp.forEach((item) => {
          console.log(item.get("mealName"), data[index].mealName)
          if (item.get("mealName") === data[index].mealName) {
            item.set(item.get("count") + 1);
            flag = false;
          }
        })
        if (flag) {
          let newItem = new Map();
          newItem.set("mealName", data[index].mealName);
          newItem.set("calories", data[index].calories);
          newItem.set("price", data[index].price);
          newItem.set("count", 1);
          temp.push(newItem);
        };
        console.log("before", tempCalories)
        tempCalories -= data[index].calories;
        console.log("after", tempCalories)
        data.filter((item) => {return item.calories <= tempCalories});
        console.log(data);
      }
      setGeneratedMeal(temp);
      console.log("check generate", generatedMeal)
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
          <table>
            <tbody>
            <tr><th>Meal</th><th>Calories</th><th>Price</th><th>Count</th></tr>
            {generatedMeal.map((item) => <tr id={item.get("mealName")}><th>{item.get("mealName")}</th><th>{item.get("calories")}</th>
                                            <th>{item.get("price")}</th><th>{item.get("count")}</th></tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
