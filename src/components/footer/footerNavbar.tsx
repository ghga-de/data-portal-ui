import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row, Button } from "react-bootstrap";
import {
  faArrowUpRightFromSquare,
  faDatabase,
  faEarthEurope,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import logo from "../../assets/GHGA_logo.png";
import { Link, NavLink } from "react-router-dom";

const FooterNavbar = () => {
  const LEFT_LINK_CLASSES =
    "text-white text-decoration-none col border-end border-bottom border-bottom-sm-0 p-0 m-0 flex-shrink-0 col-6 col-sm-3";
  const RIGHT_LINK_CLASSES = LEFT_LINK_CLASSES + " border-end-0 border-end-sm";

  return (
    <div className="mt-5 mt-sm-4 pb-2 mw-100 mx-0 bg-primary">
      <div className="mw-100 mx-auto container pt-0 pt-sm-1 pt-lg-3 pb-lg-2 text-center">
        <Row style={{ marginBottom: "-50px" }}>
          <Col className="order-lg-1 mb-4 mb-lg-0">
            <Row className="border-start-sm">
              <NavLink
                to="https://www.ghga.de"
                end={true}
                className={LEFT_LINK_CLASSES}
              >
                <Button className="w-100 h-100 rounded-0 py-0 px-3 m-0 border-0">
                  <FontAwesomeIcon
                    icon={faEarthEurope}
                    size="4x"
                    className="text-white mt-3 mb-3"
                  />
                  <p className="text-white text-decoration-none">
                    GHGA Website
                    <br />
                    &nbsp;
                  </p>
                </Button>
              </NavLink>
              <NavLink to="/browse" end={true} className={RIGHT_LINK_CLASSES}>
                <Button className="w-100 h-100 rounded-0 py-0 px-3 m-0 border-0">
                  <FontAwesomeIcon
                    icon={faDatabase}
                    size="4x"
                    className="text-white mt-3 mb-3"
                  />
                  <p className="text-white text-decoration-none">
                    Browse Data
                    <br />
                    &nbsp;
                  </p>
                </Button>
              </NavLink>
              <NavLink
                to="https://docs.ghga.de/faq"
                target="_blank"
                end={true}
                className={LEFT_LINK_CLASSES}
              >
                <Button className="w-100 h-100 rounded-0 py-0 px-3 m-0 border-0">
                  <FontAwesomeIcon
                    icon={faQuestionCircle}
                    size="4x"
                    className="text-white mt-3 mb-3"
                  />
                  <p className="text-white text-decoration-none">
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> FAQ
                    <br />
                    &nbsp;
                  </p>
                </Button>
              </NavLink>
              <NavLink
                to="https://docs.ghga.de/"
                target="_blank"
                end={true}
                className={RIGHT_LINK_CLASSES}
              >
                <Button className="w-100 h-100 rounded-0 py-0 px-3 m-0 border-0">
                  <FontAwesomeIcon
                    icon={faFileLines}
                    size="4x"
                    className="text-white mt-3 mb-3"
                  />
                  <p className="text-white text-decoration-none">
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> GHGA
                    User
                    <br />
                    Documentation
                  </p>
                </Button>
              </NavLink>
            </Row>
          </Col>
          <Col xs={12} lg={3} className="px-0 me-lg-2 order-lg-0 pt-md-2">
            <div className="px-xl-3 mx-0">
              <Link to="/" className="text-tertiary text-decoration-none h-100">
                <div>
                  <img src={logo} alt="GHGA logo" height="51px" />
                  <Row className="justify-content-center w-100">
                    <Col xs={8} sm={6} md={5} lg={12}>
                      <hr className="border-tertiary w-100" />
                    </Col>
                  </Row>
                  <div style={{ fontFamily: "Lexend" }}>
                    <span
                      className="position-relative"
                      style={{ fontSize: "42px", top: "-20px", left: "-8px" }}
                    >
                      DATA PORTAL
                    </span>
                    <br />
                    <span
                      className="position-relative"
                      style={{ fontSize: "36px", top: "-57px" }}
                    >
                      &nbsp;
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FooterNavbar;
