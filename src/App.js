import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [firstRun, updateFirstRun] = useState(true);
  const [food, updateFood] = useState([]);

  function toggleLikeFood(index) {
    const item = food[index];
    const newFoodList = food.map((f) => {
      if (f === item) {
        f.liked = !item.liked;
      }
      return f;
    });
    const newItem = Object.assign({}, food[index]);
    console.log(newItem);
    fetch("/food/updateDish", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });
    updateFood(newFoodList);
  }

  useEffect(() => {
    if (firstRun) {
      getFood();
    }

    async function getFood() {
      try {
        const fetchedFood = await fetch("/food/allDishes");
        const food = await fetchedFood.json();
        updateFood(food);
      } catch (err) {
        console.warn(err);
      }
      updateFirstRun(false);
    }
  }, []);

  return (
    <div className="App">
      <div className="food-list">
        {food &&
          food.map(
            ({ name, url, description, liked, currency, price }, idx) => (
              <div key={`food-${idx}`} className="food-card">
                <span
                  onClick={() => {
                    toggleLikeFood(idx);
                  }}
                  className="food-favorite-container"
                >
                  <span className={`food-favorite${liked ? " liked" : ""}`}>
                    ♥
                  </span>
                </span>
                <span className="food-image">
                  <img src={url} alt="food_image" />
                </span>
                <span className="food-info">
                  <h3 className="food-name"> {name} </h3>
                  <p className="food-description">{description}</p>
                  <p className="food-price">${price}</p>
                </span>
              </div>
            )
          )}
      </div>
    </div>
  );
}

export default App;
