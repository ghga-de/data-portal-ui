import React from "react";
import DatasetList from "./dataset/datasetList";
import { Col, Row, Container } from "react-bootstrap";
import Sidebar from "./sidebar/sidebar";
import { searchResponseModel, hitModel } from "../../models/dataset";
import { facetFilterModel, facetModel } from "../../models/facets";
import { getDatasetsSearchResp } from "../../api/browse";

const Browse = () => {
  const [filterDict, setFilterDict] = React.useState<facetFilterModel[]>([]);
  const [limit, setLimit] = React.useState(10);
  const [searchKeyword, setSearchKeyword] = React.useState("");

  const [searchResults, setSearchResp] =
    React.useState<searchResponseModel | null>(null);

  React.useEffect(
    () => getDatasetsSearchResp(setSearchResp, filterDict, "*", 0, 10),
    [filterDict]
  );

  var dsList: hitModel[] | null;
  var facetList: facetModel[] | null;
  var dsCount: number = 0;

  dsList = null;
  facetList = null;

  if (searchResults !== null) {
    if (searchResults.hits.length > 0) {
      dsList = searchResults.hits;
      facetList = searchResults.facets;
      dsCount = searchResults.count;
    } else {
      dsList = [];
      facetList = [];
      dsCount = 0;
    }
  }

  return (
    <Container>
      <Row>
        <Col xs md lg={3}>
          <Sidebar setSearchKeyword={setSearchKeyword}
            facetList={facetList}
            searchKeyword={searchKeyword}
            setSearchResp={setSearchResp}
            setFilterDict={setFilterDict} />
        </Col>
        <Col xs md lg={9}>
          <DatasetList searchKeyword={searchKeyword}
            setSearchResp={setSearchResp}
            dsCount={dsCount}
            dsList={dsList}
            limit={limit}
            setLimit={setLimit} />
        </Col>
      </Row>
    </Container>
  );
};

export default Browse;
