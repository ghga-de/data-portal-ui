import HomeBottomSection from "./homeBottomSection/homeBottomSection";
import HomeMidSection from "./homeMidSection/homeMidSection";
import HomeTopSection from "./homeTopSection/homeTopSection";
import { Col, Row } from "react-bootstrap";

/** Home page */
const Home = () => {
  return (
    <Row className="px-2 pt-4 pt-lg-0 mx-0 w-100">
      <Col className="mx-0 p-0 w-100">
        <h2 className="fw-bold p-lg-3 pb-2 pb-lg-2 mb-0 text-center">
          <span className="fs-3 mb-1 d-block">
            The German Human Genome-Phenome Archive
          </span>
          <span className="text-quaternary">Data Portal</span>
        </h2>
        <Row className="m-0 w-100">
          <div>
            <hr className="mx-lg-3 border-tertiary opacity-100" />
          </div>
        </Row>
        <Row className="mx-0 w-100" as="section">
          <HomeTopSection />
        </Row>
        <Row className="mx-0 w-100" as="section">
          <HomeMidSection />
        </Row>
        <Row className="mx-0 w-100" as="aside">
          <HomeBottomSection />
        </Row>
      </Col>
    </Row>
  );
};

export default Home;
