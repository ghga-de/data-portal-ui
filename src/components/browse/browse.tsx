import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import DatasetList from "./dataset/datasetList";
import Sidebar from "./sidebar/sidebar";
import { searchResponseModel, hitModel } from "../../models/dataset";
import { facetFilterModel, facetModel } from "../../models/facets";
import { getDatasetsSearchResp } from "../../api/browse";
import { useSearchParams } from "react-router-dom";

const Browse = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  let page = 1
  let skip = 0;
  const [filterDict, setFilterDict] = React.useState<facetFilterModel[]>([]);
  const [limit, setLimit] = React.useState(10);
  const [searchKeyword, setSearchKeyword] = React.useState('');
  const [searchResults, setSearchResp] = React.useState<searchResponseModel | null>(null);

  if (searchParams !== undefined && searchParams.get("p") !== undefined) {
    page = parseInt(searchParams.get("p") || "1")
    skip = (page - 1) * limit;
  }

  React.useEffect(
    () => getDatasetsSearchResp(setSearchResp, filterDict, searchKeyword, skip, limit),
    []
  );

  var dsList: hitModel[] | null = null;
  var facetList: facetModel[] | null = null;
  var dsCount: number = 0;

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
            setFilterDict={setFilterDict}
            filterDict={filterDict}
            limit={limit} />
        </Col>
        <Col xs md lg={9}>
          <DatasetList searchKeyword={searchKeyword}
            setSearchResp={setSearchResp}
            dsCount={dsCount}
            dsList={dsList}
            limit={limit}
            filterDict={filterDict}
            setLimit={setLimit}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            page={page}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Browse;
