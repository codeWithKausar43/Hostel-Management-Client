import AllMeals from "../components/AllMeals";
import Banner from "../components/Banner";
import FAQSection from "../components/FAQSection";
import UpcomingMeals from "../components/UpcomingMeals";
import SectionTitle from "../hooks/Sectiontitle";
import Membership from "./Membership";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <div className="mx-auto md:w-[90%] lg:w-[70%]">
        <SectionTitle
          heading={"Meals by Category"}
          description={
            "Explore our wide variety of meals categorized to suit every taste and occasion. Whether you're looking for something classic, trendy, or seasonal, we've got you covered!"
          }
        ></SectionTitle>
        <AllMeals></AllMeals>
        
       <FAQSection></FAQSection>
      </div>
      <UpcomingMeals></UpcomingMeals>
      <Membership></Membership>
    </div>
  );
};

export default Home;
