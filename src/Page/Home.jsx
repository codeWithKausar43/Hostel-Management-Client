import Banner from "../components/Banner";
import SectionTitle from "../hooks/Sectiontitle";

const Home = () => {
  return (
    <div>
      <div>
        <Banner></Banner>
        <SectionTitle
          heading={"Meals by Category"}
          description={
            "Explore our wide variety of meals categorized to suit every taste and occasion. Whether you're looking for something classic, trendy, or seasonal, we've got you covered!"
          }
        ></SectionTitle>
      </div>
    </div>
  );
};

export default Home;
