import useMeals from "../hooks/useMeals";

 
 
 const Meals = () => {
 const [meals,loading] = useMeals()
 if(loading){
  return "Loading..."
 }
 const Upcoming = meals.filter((item) => item.category === 'Upcoming')
console.log(Upcoming)
const Dinner = meals.filter((item) => item.category === 'Dinner')
const Lunch = meals.filter((item) => item.category === 'Lunch')
const Breakfast  = meals.filter((item) => item.category === 'Breakfast')
  return (
    <div>
      
    </div>
  );
 };
 
 export default Meals;