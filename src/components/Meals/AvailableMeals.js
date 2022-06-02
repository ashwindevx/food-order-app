import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getMeals = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(
        "https://react-http-post-5fa60-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadedMeals);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getMeals();
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  let content = <p></p>;

  if (error) {
    content = <p>{error}</p>;
  }

  if (loading) {
    content = <p>Loading...</p>;
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
        {content}
      </Card>
    </section>
  );
};

export default AvailableMeals;
