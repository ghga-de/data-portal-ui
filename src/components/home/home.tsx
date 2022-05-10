import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  Button,
  Card,
  Carousel,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";

const Home = () => {
  return (
    <div>
      <Row className="w-100 bg-primary rounded mx-0 mb-3 pt-5 pb-4 pe-4 text-white">
        <Col className="col-3">
          <Row className="ps-4 mb-4">
            <h3>GHGA Data Portal</h3>
          </Row>
          <Row>
            <div
              className="border border-black p-0 rounded py-3 px-4"
              style={{ background: "RGBA(0,0,0,0.5)" }}
            >
              <p>
                A FAIR Portal for Human Genomics data with GDPR-compliant access
                control.
              </p>
              <Button variant="white">Get started</Button>
            </div>
          </Row>
        </Col>
        <Col>
          <Row className="justify-content-center">
              <Form className="w-75">
                <Row>
                  <Col>
                    <Form.Control
                      id="searchInput"
                      type="text"
                      placeholder="Search datasets"
                    />
                  </Col>
                  <Col className="col-2 ms-0">
                    <Button variant="secondary" className="text-white"><FontAwesomeIcon icon={faSearch}/>&nbsp;Search</Button>
                  </Col>
                </Row>
              </Form>
          </Row>
          <Row className="mb-4 mt-2 justify-content-center">
            <Container className="w-75">
              <Form.Select className="d-inline-block w-25">
                <option>Study Type</option>
              </Form.Select>
              <Form.Select className="d-inline-block w-25">
                <option>Type</option>
              </Form.Select>
              <Form.Select className="d-inline-block w-25">
                <option>Size</option>
              </Form.Select>
            </Container>
          </Row>
          <Row className="mb-4 justify-content-center">
            <Container className="col-2">
              <Button variant="white">ZZ Total Datasets</Button>
            </Container>
          </Row>
          <Row className="text-black justify-content-center">
              <Card style={{ width: "18rem" }} className="d-inline-block mx-2">
                <Card.Body>
                  <Card.Title>Technology</Card.Title>
                  <Card.Text>
                    Contents
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card style={{ width: "18rem" }} className="d-inline-block mx-2">
                <Card.Body>
                  <Card.Title>Sex</Card.Title>
                  <Card.Text>
                    Contents
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card style={{ width: "18rem" }} className="d-inline-block mx-2">
                <Card.Body>
                  <Card.Title>Volume</Card.Title>
                  <Card.Text>
                    Contents
                  </Card.Text>
                </Card.Body>
              </Card>
          </Row>
        </Col>
      </Row>
      <Row className="w-100 m-0 mb-3">
        <Col className="col-8 bg-primary rounded p-3 text-white">
          <h4 className="mb-4">Our Projects</h4>
          <Carousel indicators={false}>
            <Carousel.Item>
              <div className="px-5">
                <h5>NAKO</h5>
                <Row>
                  <Col className="col-7">
                    <p>
                      The German National Cohort (“NAKO Gesundheitsstudie”) is
                      an interdisciplinary, population-based cohort study that
                      will follow the long-term medical histories of 200,000
                      participants over 25-30 years. As Germany’s largest health
                      study, the overarching aim of the National Cohort is to
                      inform more effective disease prevention strategies, with
                      a focus on seven major disease groups: cancer, diabetes,
                      and cardiovascular, neurologic and psychiatric,
                      infectious, respiratory and musculoskeletal diseases. It
                      will provide a major, central resource for
                      population-based epidemiology in Germany, and will help to
                      identify new and tailored strategies for early detection,
                      prediction, and primary prevention of major diseases.
                    </p>
                  </Col>
                  <Col>Chart</Col>
                </Row>
                <Button variant="white">Learn more...</Button>
              </div>
            </Carousel.Item>
          </Carousel>
        </Col>
        <Col className="rounded">Twitter</Col>
      </Row>
      <Row className="w-100 m-0 mb-3">
        <Col>Gallery Carousel</Col>
      </Row>
    </div>
  );
};

export default Home;
