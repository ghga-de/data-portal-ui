import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row, Container } from "react-bootstrap";
import {
  faCloudDownload,
  faCloudUpload,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import logo from "../../assets/data-portal.png";

const FooterNavbar = () => {
  return (
    <div className="mt-4 pb-2 mw-100 mx-0 bg-primary">
      <Container className="pt-3 pb-2 text-center">
        <Row>
          <Col className="border-1 border-end px-3 mx-0 fs-8 text-white">
            <a href="/">
              <img src={logo} alt="GHGA logo" height="70px" />
            </a>
            <p className="text-start mt-2 mb-1">
              GHGA Data Portal running in Beta mode
            </p>
            <p className="text-start">
              <a href="/browse" className="fw-bold text-white">
                Browse Datasets
              </a>
            </p>
          </Col>
          <a
            href="https://www.ghga.de/data/data-download"
            className="text-white text-decoration-none col border-1 border-end px-3 mx-0 flex-shrink-0"
          >
            <FontAwesomeIcon
              icon={faCloudDownload}
              size="4x"
              className="text-white mt-3 mb-3"
            />
            <p>How to download data</p>
          </a>
          <a
            href="https://www.ghga.de/data/data-upload"
            className="text-white text-decoration-none col border-1 border-end px-3 mx-0 flex-shrink-0"
          >
            <FontAwesomeIcon
              icon={faCloudUpload}
              size="4x"
              className="text-white mt-3 mb-3"
            />
            <p>Submit data to GHGA</p>
          </a>
          <a
            href="https://www.ghga.de/data/metadata-model"
            className="text-white text-decoration-none col border-1 border-end px-3 mx-0 flex-shrink-0"
          >
            <FontAwesomeIcon
              icon={faFileLines}
              size="4x"
              className="text-white mt-3 mb-3"
            />
            <p>About GHGA Metadata Model</p>
          </a>
          <a
            href="https://www.ghga.de/data/about-ghga-beta"
            className="text-white text-decoration-none col border-1 px-3 mx-0 flex-shrink-0"
          >
            <FontAwesomeIcon
              icon={faQuestionCircle}
              size="4x"
              className="text-white mt-3 mb-3"
            />
            <p>About / FAQ</p>
          </a>
        </Row>
      </Container>
    </div>
  );
};

export default FooterNavbar;
