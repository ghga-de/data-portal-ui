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
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import { getDatasetsSearchResp } from "../../api/browse";
import { searchResponseModel } from "../../models/dataset";
import { facetFilterModel, facetModel } from "../../models/facets";

const Home = () => {
  let navigate = useNavigate();

  const [searchResults, setSearchResults] =
    React.useState<searchResponseModel | null>(null);

  const [filterDict, setFilterDict] = React.useState<facetFilterModel[]>([]);

  React.useEffect(
    () => {
      const getData = () => {
        getDatasetsSearchResp(setSearchResults, [], "", 0, 1);
      };
      getData();
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  var facetList: facetModel[] | null = null;
  var dsCount: number = 0;

  if (searchResults !== null) {
    if (searchResults.hits.length > 0 || searchResults.count === -1) {
      facetList = searchResults.facets;
      dsCount = searchResults.count;
    } else {
      facetList = [];
      dsCount = 0;
    }
  }

  const searchDatasets = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let queryString = "";
    if (searchKeyword !== "") {
      queryString = "&q=" + searchKeyword;
    }
    if (filterDict.length > 0) {
      let filterURI = filterDict.map((x) => x.key + ":" + x.value).join(";");
      navigate("/browse?p=1" + queryString + "&f=" + filterURI);
    } else {
      navigate("/browse?p=1" + queryString);
    }
  };

  const fillFilterSelect = (key: string) => {
    return facetList
      ?.filter((x) => x.key === key)
      .map((x) =>
        x.options
          .sort((a, b) => (b.option < a.option ? 1 : -1))
          .map((y) => (
            <option value={y.option} key={y.option}>
              {y.option}
            </option>
          ))
      );
  };

  const generateSelect = (key: string, display: string) => {
    return (
      <Form.Select
        className="d-inline-block w-25 fs-8 text-capitalize"
        size="sm"
        onChange={(event) => filterChange(key, event.target.value)}
      >
        <option value="">{display}</option>
        {fillFilterSelect(key)}
      </Form.Select>
    );
  };

  const filterChange = (key: string, optionValue: string) => {
    let currentFilterDict = filterDict.filter((x) => x.key !== key);
    if (optionValue !== "") {
      currentFilterDict.push({ key: key, value: optionValue });
    }
    setFilterDict(currentFilterDict);
  };

  const [searchKeyword, setSearchKeyword] = React.useState<string>("");
  return (
    <div>
      <Row className="w-100 bg-primary rounded mx-0 mb-3 pt-5 pb-4 pe-4 text-white">
        <Col className="col-3">
          <Row className="ps-4 mb-4">
            <h3>GHGA Data Portal</h3>
          </Row>
          <Row>
            <div
              className="border border-black p-0 rounded p-3 px-4"
              style={{ background: "RGBA(0,0,0,0.5)" }}
            >
              <span>
                A FAIR Portal for Human Genomics data with GDPR-compliant access
                control.
              </span>
            </div>
          </Row>
        </Col>
        <Col>
          <Row className="justify-content-center">
            <Form className="w-75" onSubmit={(event) => searchDatasets(event)}>
              <Row>
                <Col>
                  <Form.Control
                    id="searchInput"
                    type="text"
                    placeholder="Search datasets"
                    onChange={(event) => setSearchKeyword(event.target.value)}
                  />
                </Col>
                <Col className="col-2 ms-0">
                  <Button
                    variant="secondary"
                    className="text-white shadow-sm"
                    type="submit"
                  >
                    <FontAwesomeIcon icon={faSearch} />
                    &nbsp;Search
                  </Button>
                </Col>
              </Row>
            </Form>
          </Row>
          <Row className="mb-4 mt-2 justify-content-center">
            <Container className="w-75">
              <div className="w-75">
                {generateSelect("has_study.type", "Study type")}
                {generateSelect("type", "Type")}
                <Form.Select
                  className="d-inline-block w-25 fs-8"
                  size="sm"
                  disabled
                >
                  <option>Size</option>
                </Form.Select>
              </div>
            </Container>
          </Row>
          <Row className="mb-4 justify-content-center">
            <Container className="col-2">
              <Button variant="white" className="shadow-sm">
                {dsCount} Total Datasets
              </Button>
            </Container>
          </Row>
          <Row className="text-black justify-content-center">
            <Card style={{ width: "18rem" }} className="d-inline-block mx-2">
              <Card.Body>
                <Card.Title>Technology</Card.Title>
                <Card.Text>Contents</Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: "18rem" }} className="d-inline-block mx-2">
              <Card.Body>
                <Card.Title>Sex</Card.Title>
                <Card.Text>Contents</Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: "18rem" }} className="d-inline-block mx-2">
              <Card.Body>
                <Card.Title>Volume</Card.Title>
                <Card.Text>Contents</Card.Text>
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
                <Button variant="white" className="shadow-sm">
                  Learn more...
                </Button>
              </div>
            </Carousel.Item>
          </Carousel>
        </Col>
        <Col className="rounded">
          <TwitterTimelineEmbed
            sourceType="profile"
            screenName="GHGA_DE"
            options={{ height: 425 }}
            placeholder={
              <p>
                <Spinner animation="border" size="sm" variant="info" />&nbsp;Loading <a href="https://twitter.com/GHGA_DE">GHGA Twitter timeline</a> ...<br />
                You may need to disable blocking of third-party cookies for this element to display correctly.
              </p>
            }
          />
        </Col>
      </Row>
      <Row className="w-100 m-0 mb-3">
        <Col>Gallery Carousel</Col>
      </Row>
    </div>
  );
};

export default Home;
