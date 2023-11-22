import React from 'react';
import { useState, useEffect } from 'react';
import '../App.css';

export const AddDelete = () => {
  const [restaurant, setRestaurant] = useState([]);
  const [mealName, setMealName] = useState([]);
  const [value, setValue] = useState("");

  // fetch initial restaurant
  useEffect(() => {
    // fetch initial restaurant
    fetchRestaurant();
  }, []);

  // fetch initial mealName
  useEffect(() => {
    fetchMealName(restaurant[0])
  }, [restaurant]);

  // addMeal function
  function addMeal() {
    let tempRestaurant = document.getElementById("addRestaurant").value;
    let tempMealName = document.getElementById("addMealName").value;
    let tempCalories = document.getElementById("addCalories").value;
    let tempPrice = document.getElementById("addPrice").value;
    if (tempRestaurant === "") {alert("Please enter restaurant name."); return;}
    if (tempMealName === "") {alert("Please enter meal name."); return;}
    if (tempCalories === "") {alert("Please enter calories."); return;}
    if (tempPrice === "") {alert("Please enter price."); return;}
    fetch(`http://localhost:3002/addDelete/add/${tempRestaurant}/${tempMealName}/${tempCalories}/${tempPrice}`)
      .then(() => {
        alert("Data successfully added!");
        window.location.reload();
      })
      .catch((err) => {
        alert("Data failed to add.");
      });
  }

  // fetch restaurant function
  function fetchRestaurant() {
    fetch(`http://localhost:3002/restaurantList`)
    .then((res) => res.json())
    .then((data) => {
      let temp = []
      data.forEach((item) => {
        temp.push(item.restaurant);
        setRestaurant(temp);
      })
    });
  }

  // fetch mealName function
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

  // change restaurant function
  function changeRestaurant() {
    let tempRestaurant = document.getElementById("deleteRestaurant").value;
    fetchMealName(tempRestaurant);
  }

  // deleteMeal function
  function deleteMeal() {
    let tempRestaurant = document.getElementById("deleteRestaurant").value;
    let tempMealName = document.getElementById("deleteMealName").value;
    fetch(`http://localhost:3002/addDelete/delete/${tempRestaurant}/${tempMealName}`)
      .then(() => {
        alert("Data successfully deleted!");
        window.location.reload();
      })
      .catch((err) => {
        alert("Data failed to delete.");
      });
  }

  // render the page
  return(
    <div className="App">
      <div id="title">Add & Delete Menu</div>

      <div className="addDelete">
        <div className="addDeleteTitle">Add Meal</div>
        <div className="addMealDiv" id="addRestaurantDiv">
          Restaurant: <input type="text" id="addRestaurant" placeholder="ex: KFC" value={value} onChange={(e)=>{setValue(e.target.value);}} />
          <div>
            {restaurant
              .filter(item => {
                const searchTerm = value.toLowerCase();
                const itemName = item.toLowerCase();
                return searchTerm && itemName.includes(searchTerm) && itemName !== searchTerm;})
              .map((item) => <div className="dropDown" onClick={()=>{setValue(item);}} key={item}>{item}</div>)
            }
          </div>
        </div>
        <div className="addMealDiv" id="addMealNameDiv">
          Meal Name: <input type="text" id="addMealName" placeholder="ex: Meal 1" />
        </div>
        <div className="addMealDiv" id="addCaloriesDiv">
          Calories: <input type="text" id="addCalories" placeholder="ex: 800" />
        </div>
        <div className="addMealDiv" id="addPriceDiv">
          Price: <input type="text" id="addPrice" placeholder="ex: 12.99" />
        </div>
        <button onClick={addMeal}>Add</button>
      </div>

      <div className="addDelete">
        <div className="addDeleteTitle">Delete Meal</div>
        <p>
          <select className="deleteMeal" id="deleteRestaurant" onChange={changeRestaurant}>
            {restaurant.map((restaurant) => <option key={restaurant}>{restaurant}</option>)}
          </select>
          <select className="deleteMeal" id="deleteMealName">
            {mealName.map((mealName) => <option key={mealName}>{mealName}</option>)}
          </select>
        </p>
        <button onClick={deleteMeal}>Delete</button>
      </div>
    </div>
  );
}
