import HomeBottomSection from "./homeBottomSection/homeBottomSection";
import HomeMidSection from "./homeMidSection/homeMidSection";
import HomeTopSection from "./homeTopSection/homeTopSection";
import { Col, Row } from "react-bootstrap";

/** Home page */
const Home = () => {
  return (
    <div className="mt-4 mx-auto px-2 px-lg-5">
      <h2 className="fw-bold p-lg-3 pb-0">
        The German Human Genome-Phenome Archive
      </h2>
      <Row className="w-100">
        <Col className="text-center">
          <h3 className="fw-bold pb-2 text-quaternary">Data Portal</h3>
        </Col>
      </Row>
      <hr className="mx-lg-3 border-tertiary mb-3 opacity-100" />
      <HomeTopSection />
      <HomeMidSection />
      <HomeBottomSection />
    </div>
  );
};

export default Home;
