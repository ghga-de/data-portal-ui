import { Button, Carousel, Col, Row } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import standards from "./standards.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

/**
 * Section on the home page where Standards are displayed in carousel.
 * @remarks
 * Its content comes from the "standards.json" file instead of server.
 */
const HomeBottomSection = () => {
  return (
    <Row className="mx-2 mb-3">
      <Col style={{ height: "425px" }}>
        <h4 className="fw-bold fs-3 p-3 pb-1">Our Standards</h4>
        <hr className="mx-3 border-tertiary mb-5 opacity-100" />
        <Carousel
          indicators={false}
          variant="dark"
          interval={null}
          className="h-100"
        >
          {standards
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
            .map((x, idx) => (
              <Carousel.Item key={"homepage_projects_" + idx}>
                <div className="px-3 px-sm-3 px-lg-5 mx-0 mx-sm-3 mx-lg-5 h-100">
                  <h4 className="fw-bold">{x.name}</h4>
                  <Row>
                    {x.img_location === "" ? (
                      <Col
                        className="overflow-auto"
                        style={{ maxHeight: "240px" }}
                      >
                        <PerfectScrollbar>
                          {x.description.split("\n").map((z, idz) => (
                            <p
                              className="mb-0"
                              style={{ textAlign: "justify" }}
                              key={
                                "homepage_span_" +
                                x.name +
                                "_description_" +
                                idz
                              }
                            >
                              {z}
                            </p>
                          ))}
                        </PerfectScrollbar>
                      </Col>
                    ) : (
                      <>
                        <Col
                          className="col-7 overflow-auto"
                          style={{ maxHeight: "240px" }}
                        >
                          <PerfectScrollbar>
                            <p style={{ textAlign: "justify" }}>
                              {x.description.split("\n").map((z, idz) => (
                                <span
                                  key={
                                    "homepage_span_" +
                                    x.name +
                                    "_description_" +
                                    idz
                                  }
                                >
                                  {z}
                                  <br />
                                </span>
                              ))}
                            </p>
                          </PerfectScrollbar>
                        </Col>
                        <Col>
                          <img src={x.img_location} alt={x.img_alt} />
                        </Col>
                      </>
                    )}
                  </Row>
                  <div className="text-center">
                    {x.learn_more_href !== "" ? (
                      <Button
                        as="a"
                        target="_blank"
                        variant="quinary"
                        className="shadow-md-dark my-3"
                        href={x.learn_more_href}
                      >
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                        &nbsp;Learn more...
                      </Button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </Carousel.Item>
            ))}
        </Carousel>
      </Col>
    </Row>
  );
};

export default HomeBottomSection;
