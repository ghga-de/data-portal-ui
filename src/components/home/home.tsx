import HomeMidSection from "./homemidsection/homeMidSection";
import HomeTopSection from "./hometopsection/homeTopSection";
import InstitutionsCarousel from "./institutionscarousel/institutionsCarousel";

const Home = () => {
  return (
    <div>
      <HomeTopSection/>
      <HomeMidSection/>
      <InstitutionsCarousel/>
    </div>
  );
};

export default Home;
