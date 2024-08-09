import { Button, Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

/** Section on top of the home page where general information is given about platform. */
const HomeTopSection = () => {
  const PARAGRAPH_CLASS = "fs-5 text-md-justify";
  const LINK_CLASS = "text-secondary";
  return (
    <Col className="px-lg-2">
      <Row className="w-100 mx-0 mb-2 pb-4 pe-lg-4">
        <Col className="p-2 p-lg-4">
          <p className={PARAGRAPH_CLASS}>
            The GHGA Data Portal is a secure national infrastructure for human
            omics data available under controlled access. Access to the archived
            data can be requested from the data controllers who are responsible
            for evaluating your data access request.
          </p>
          <p className={PARAGRAPH_CLASS}>
            The datasets within are annotated following the{" "}
            <a
              className={LINK_CLASS}
              href="https://docs.ghga.de/metadata/overview/"
            >
              GHGA Metadata Model
            </a>
            , which is compatible with the metadata model of the EGA.
          </p>
          <p className={PARAGRAPH_CLASS}>
            For further documentation, please visit the{" "}
            <a className={LINK_CLASS} href="https://docs.ghga.de/">
              GHGA User Documentation
            </a>
            .
          </p>
          <div className="text-center">
            <NavLink to="/browse">
              <Button
                variant="quinary"
                className="py-1 fs-5 mt-4 text-white shadow-md-dark"
              >
                <span>Browse data</span>
              </Button>
            </NavLink>
          </div>
        </Col>
      </Row>
    </Col>
  );
};

export default HomeTopSection;
