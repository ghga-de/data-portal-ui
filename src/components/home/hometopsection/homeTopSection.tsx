import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { getDatasetsSearchResp } from "../../../api/browse";
import { searchResponseModel } from "../../../models/dataset";
import { facetFilterModel, facetModel } from "../../../models/facets";
import HomeFilterSelects from "./homeFilterSelects";
import HomeSearchbar from "./homeSearchbar";
import TopSectionBadges from "./topSectionBadges";

const HomeTopSection = () => {
  const [searchResults, setSearchResults] =
    React.useState<searchResponseModel | null>(null);

  const [filterDict, setFilterDict] = React.useState<facetFilterModel[]>([]);

  React.useEffect(() => {
    const getData = () => {
      getDatasetsSearchResp(setSearchResults, [], "", 0, 1);
    };
    getData();
  }, []);

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

  return (
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
          <HomeSearchbar filterDict={filterDict} />
        </Row>
        <Row className="mb-4 mt-2 justify-content-center">
          <HomeFilterSelects
            filterDict={filterDict}
            facetList={facetList}
            setFilterDict={setFilterDict}
          />
        </Row>
        <Row className="mb-4 justify-content-center">
          <Container className="col-2">
            <Button variant="white" className="shadow-sm" href="/browse">
              {dsCount} Total Datasets
            </Button>
          </Container>
        </Row>
        <Row className="text-black justify-content-center">
          <TopSectionBadges />
        </Row>
      </Col>
    </Row>
  );
};

export default HomeTopSection;
