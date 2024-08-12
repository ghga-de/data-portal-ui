import HomeBottomSection from "./homeBottomSection/homeBottomSection";
import HomeMidSection from "./homeMidSection/homeMidSection";
import HomeTopSection from "./homeTopSection/homeTopSection";
import { Col } from "react-bootstrap";

/** Home page */
const Home = () => {
  return (
    <div className="mt-4 mx-auto px-2 px-lg-5">
      <h2 className="fw-bold p-lg-3 pb-0 text-center">
        The German Human Genome-Phenome Archive
      </h2>
      <Col className="px-lg-2">
        <h3 className="fw-bold pb-2 px-4 mx-2 text-quaternary">Data Portal</h3>
      </Col>
      <hr className="mx-lg-3 border-tertiary opacity-100" />
      <HomeTopSection />
      <HomeMidSection />
      <HomeBottomSection />
    </div>
  );
};

export default Home;
