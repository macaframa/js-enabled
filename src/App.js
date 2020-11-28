import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [firstRun, updateFirstRun] = useState(true);
  const [food, updateFood] = useState([]);

  // const getFood = async () => {}

  useEffect(() => {
    if (firstRun) {
      getFood();
      updateFirstRun(false);
    }

    async function getFood() {
      try {
        const fetchedFood = await fetch('./food.json');
        console.log('stil promise', fetchedFood);
        const food = await fetchedFood.json();
        console.log('fetched food', food);
        updateFood(food.food);
      } catch (err) {
        console.warn(err);
      }
    }
  }, []);

  return (
    <div className='App'>
      <div className='food-list'>
        {food &&
          food.map(({ name, url, description, currency, price }, idx) => (
            <div key={`food-${idx}`} className='food-card'>
              {idx + 1}
              <p>{name}</p>
              <span>♥</span>
              <span className='food-image'>
                <img src={url} alt='food_image' />
              </span>
              <span className='food-info'>
                <p>{description}</p>
                <p>{price}</p>
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
