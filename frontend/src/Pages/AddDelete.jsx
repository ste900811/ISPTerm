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

  // onChangeAddRestaurant function
  const onChangeAddRestaurant = (e) => {
    setValue(e.target.value);
  };

  // onSearch function
  const setItem = (item) => {
    console.log(item);
    setValue(item);
  };

  // addMeal function
  function addMeal() {
    let restaurant = document.getElementById("addRestaurant").value;
    let mealName = document.getElementById("addMealName").value;
    let calories = document.getElementById("addCalories").value;
    let price = document.getElementById("addPrice").value;
    if (restaurant === "") {alert("Please enter restaurant name."); return;}
    if (mealName === "") {alert("Please enter meal name."); return;}
    if (calories === "") {alert("Please enter calories."); return;}
    if (price === "") {alert("Please enter price."); return;}
    fetch(`http://localhost:3002/addDelete/add/${restaurant}/${mealName}/${calories}/${price}`)
      .then((res) => res.json())
      .then((data) => {
        alert("Data successfully added!");
        if (restaurant.includes(data.restaurant)) {return;}
        setRestaurant([...restaurant, data.restaurant]);
      })
      .catch((err) => {
        alert("Data failed to add.");
      });
  }

  // fetch restaurant function
  function fetchRestaurant() {
    fetch(`http://localhost:3002/addDelete/restaurant`)
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
    let newRestaurant = document.getElementById("deleteRestaurant").value;
    fetchMealName(newRestaurant);
  }

  // deleteMeal function
  function deleteMeal() {
    let restaurant = document.getElementById("deleteRestaurant").value;
    let mealName = document.getElementById("deleteMealName").value;
    fetch(`http://localhost:3002/addDelete/delete/${restaurant}/${mealName}`)
      .then((res) => res.json())
      .then((data) => {
        alert("Data successfully deleted!");
        fetchMealName(restaurant[0]);
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
        <div id="addRestaurantDiv">
          Restaurant: <input type="text" id="addRestaurant" placeholder="ex: KFC" value={value} onChange={onChangeAddRestaurant} />
          <div>
            {restaurant
              .filter(item => {
                const searchTerm = value.toLowerCase();
                const itemName = item.toLowerCase();
                return searchTerm && itemName.includes(searchTerm) && itemName !== searchTerm;})
              .map((item) => <div className="dropDown" onClick={()=>setItem(item)} key={item}>{item}</div>)
            }
          </div>
        </div>
        <div id="addMealNameDiv">
          Meal Name: <input type="text" id="addMealName" placeholder="ex: Meal 1" />
        </div>
        <div id="addCaloriesDiv">
          Calories: <input type="text" id="addCalories" placeholder="ex: 800" />
        </div>
        <div id="addPriceDiv">
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
