import React from 'react';
import { useState, useEffect } from 'react';
import '../App.css';

export const Home = () => {
  const [restaurant, setRestaurant] = useState([]);
  const [generatedMeal, setGeneratedMeal] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);

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
      // filter the meals base on the Calories
      let filterData = data;
      let temp = [];
      while (tempCalories + 100 > 0) {
        if (filterData.length === 0) { break; }
        let index = Math.floor(Math.random() * filterData.length);
        let flag = true;
        temp.forEach((item) => {
          if (item.get("mealName") === filterData[index].mealName) {
            item.set("count", item.get("count") + 1);
            flag = false;
          }
        })
        if (flag) {
          let newItem = new Map();
          newItem.set("mealName", filterData[index].mealName);
          newItem.set("calories", filterData[index].calories);
          newItem.set("price", filterData[index].price);
          newItem.set("count", 1);
          temp.push(newItem);
        };
        tempCalories -= filterData[index].calories;
        filterData = filterData.filter((item) => {return item.calories <= tempCalories});
      }
      setGeneratedMeal(temp);

      // calculate the total price and total calories
      let tempP = 0;
      let tempC = 0;
      temp.forEach((item) => {
        tempP += item.get("price") * item.get("count");
        tempC += item.get("calories") * item.get("count");
      })
      setTotalPrice(Math.round(tempP*100)/100);
      setTotalCalories(tempC);
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
            {generatedMeal.map((item) => <tr key={item.get("mealName")}><th>{item.get("mealName")}</th><th>{item.get("calories")}</th>
                                            <th>{item.get("price")}</th><th>{item.get("count")}</th></tr>)}
            </tbody>
          </table>
        </div>
        <div className="total">Total Calories {totalCalories}   Total Price: {totalPrice}</div>
      </div>
    </div>
  );
}
