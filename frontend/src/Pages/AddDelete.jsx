import React from 'react';
import '../App.css';

export const AddDelete = () => {
  function AddMeal() {
    let restaurant = document.getElementById("addRestaurant").value;
    let mealName = document.getElementById("addMealName").value;
    let calories = document.getElementById("addCalories").value;
    let price = document.getElementById("addPrice").value;
    if (restaurant === "") {alert("Please enter restaurant name."); return;}
    if (mealName === "") {alert("Please enter meal name."); return;}
    if (calories === "") {alert("Please enter calories."); return;}
    if (price === "") {alert("Please enter price."); return;}
    let url = `http://localhost:3002/add/${restaurant}/${mealName}/${calories}/${price}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        alert("Data successfully added!");
      });
  }

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
      </div>
    </div>
  );
}
