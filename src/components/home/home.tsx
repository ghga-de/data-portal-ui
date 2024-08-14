import HomeBottomSection from "./homeBottomSection/homeBottomSection";
import HomeMidSection from "./homeMidSection/homeMidSection";
import HomeTopSection from "./homeTopSection/homeTopSection";
import { Col, Row } from "react-bootstrap";

/** Home page */
const Home = () => {
  return (
    <Row className="px-2 pt-4 pt-lg-0 mx-0 w-100">
      <Col className="mx-0 p-0 w-100">
        <h2 className="fw-bold p-lg-3 pb-0 text-center">
          The German Human Genome-Phenome Archive
        </h2>
        <h3 className="fw-bold pb-2 px-4 text-quaternary text-center">
          Data Portal
        </h3>
        <Row className="m-0 w-100">
          <div>
            <hr className="mx-lg-3 border-tertiary opacity-100" />
          </div>
        </Row>
        <Row className="mx-0 w-100">
          <HomeTopSection />
        </Row>
        <Row className="mx-0 w-100">
          <HomeMidSection />
        </Row>
        <Row className="mx-0 w-100">
          <HomeBottomSection />
        </Row>
      </Col>
    </Row>
  );
};

export default Home;
