import React from 'react';
import { useState } from 'react';
import '../App.css';

export const CalCalculator = () => {
  const [calories, setCalories] = useState(0);
  const [breakfastCalories, setBreakfastCalories] = useState(0); 
  const [LunchDinnerCalories, setLunchDinnerCalories] = useState(0); 
  function getCalories() {
    let age = document.getElementById("age").value;
    let gender = document.getElementById("gender").value;
    if (age == "None") {alert("Please select age."); return;}
    if (gender == "None") {alert("Please select gender."); return;}
    let url = `http://localhost:3002/cal/${gender}/${age}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCalories(data[0].calories);
        setBreakfastCalories(data[0].calories*0.2);
        setLunchDinnerCalories(data[0].calories*0.4);
      });
  }

  return(
    <div>
      <div className="App">
        <h1>Calories Calculator</h1>

        <select className="option" id="age">
          <option value="None">Select Age</option>
          <option value="2">1-3</option>
          <option value="4">4-8</option>
          <option value="9">9-13</option>
          <option value="14">14-18</option>
          <option value="19">19-30</option>
          <option value="31">31-50</option>
          <option value="51">51+</option>
        </select>
        &emsp;&emsp;
        <select className="option" id="gender">
          <option value="None">Select Age</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <br></br><br></br><br></br>

        <button onClick={getCalories}>Calculate</button>

        <br></br><br></br>

        <h2>Suggestion daily Calories: {calories}</h2>
        <h2>Suggestion breakfast Calories: {breakfastCalories}</h2>
        <h2>Suggestion lunch/dinner Calories: {LunchDinnerCalories}</h2>
      </div>
    </div>
  );
}
