import React from "react";
import Marquee from "react-fast-marquee";
import useMeals from "../hooks/useMeals";
import MealCard from "./MealCard";
import bgImage from "../assets/up.jpg"
const UpcomingMeals = () => {
  const [meals, loading] = useMeals();
  if (loading) {
    return (
      <span className="loading loading-bars loading-md flex mx-auto items-center md:mt-60"></span>
    );
  }
  const Upcoming = meals.filter((item) => item.category === "Upcoming");
  return (
    <div style={{ backgroundImage: `url(${bgImage})` }} className="py-24 mt-20">
      <h3 className="text-white text-center mb-12 text-4xl font-bold">Upcoming Meal</h3>
      <Marquee
        gradient={false}
        speed={50}
        pauseOnHover={true}
        className="text-gray-700 text-lg"
      >
        <div className="flex gap-12 w-full">
          {Upcoming.map((meal) => (
            <MealCard key={meal._id} item={meal}></MealCard>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default UpcomingMeals;
