import useMeals from "../hooks/useMeals";
import MealCard from "./MealCard";


 const Meals = () => {
 const [meals,loading] = useMeals()
 if(loading){
  return "Loading..."
 }
//  const Upcoming = meals.filter((item) => item.category === 'Upcoming')
// console.log(Upcoming)
// const Dinner = meals.filter((item) => item.category === 'Dinner')
// const Lunch = meals.filter((item) => item.category === 'Lunch')
// const Breakfast  = meals.filter((item) => item.category === 'Breakfast')
  return (
    <div className="mt-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto md:w-[90%] lg:w-[70%] gap-12">
      {
        meals.map(meal => <MealCard key={meal._id} item={meal}></MealCard>)
      }
    </div>
    </div>
  );
 }
 
 export default Meals;
 
