import React from 'react';
import { useState, useEffect } from 'react';
import '../App.css';

export const AddDelete = () => {
  const [restaurant, setRestaurant] = useState([]);
  const [mealName, setMealName] = useState([]);

  // fetch initial restaurant
  useEffect(() => {
    // fetch initial restaurant
    fetch(`http://localhost:3002/addDelete/restaurant`)
    .then((res) => res.json())
    .then((data) => {
      let temp = []
      data.forEach((item) => {
        temp.push(item.restaurant);
        setRestaurant(temp);
      })
    });
  }, []);

  // fetch initial mealName
  useEffect(() => {
    fetchMealName(restaurant[0])
  }, [restaurant]);

  // AddMeal function
  function AddMeal() {
    let restaurant = document.getElementById("addRestaurant").value;
    let mealName = document.getElementById("addMealName").value;
    let calories = document.getElementById("addCalories").value;
    let price = document.getElementById("addPrice").value;
    if (restaurant === "") {alert("Please enter restaurant name."); return;}
    if (mealName === "") {alert("Please enter meal name."); return;}
    if (calories === "") {alert("Please enter calories."); return;}
    if (price === "") {alert("Please enter price."); return;}
    fetch(`http://localhost:3002/addDelete/${restaurant}/${mealName}/${calories}/${price}`)
      .then((res) => res.json())
      .then((data) => {
        alert("Data successfully added!");
      })
      .catch((err) => {
        alert("Data failed to add.");
      });
  }

  // DeleteMeal function
  function fetchMealName(restaurant) {
    let temp = [];
    fetch(`http://localhost:3002/addDelete/mealName/${restaurant}`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        temp.push(item.mealName);
        setMealName(temp);
      })
    });
  }

  // Change restaurant function
  function changeRestaurant() {
    let restaurant = document.getElementById("deleteRestaurant").value;
    fetchMealName(restaurant);
  }

  // render the page
  return(
    <div className="App">
      <div id="title">Add & Delete Menu</div>

      <div className="addDelete">Add Meal
        <p>
          Restaurant: <input type="text" id="addRestaurant" placeholder="ex: KFC" />
          Meal Name: <input type="text" id="addMealName" placeholder="ex: Meal 1" />
          <br></br>
          Calories: <input type="text" id="addCalories" placeholder="ex: 800" />
          Price: <input type="text" id="addPrice" placeholder="ex: 12.99" />
        </p>
        <button onClick={AddMeal}>Add</button>
      </div>

      <div className="addDelete">Delete Meal
        <p>
          <select className="deleteMeal" id="deleteRestaurant" onChange={changeRestaurant}>
            {restaurant.map((restaurant) => <option key={restaurant}>{restaurant}</option>)}
          </select>
          <select className="deleteMeal" id="deleteMealName">
            {mealName.map((mealName) => <option key={mealName}>{mealName}</option>)}
          </select>
        </p>
      </div>
    </div>
  );
}
