import { Col, Row } from "react-bootstrap";
import "react-perfect-scrollbar/dist/css/styles.css";

/**
 * Section on the home page where an "About us" section is displayed.
 */
const HomeBottomSection = () => {
  return (
    <Row className="w-100 py-lg-3 mx-0">
      <Col>
        <h4 className="fw-bold fs-3 p-3 pb-1">About Us</h4>
        <hr className="mx-3 border-tertiary mb-4 opacity-100" />
        <div className="p-3">...</div>
      </Col>
    </Row>
  );
};

export default HomeBottomSection;
