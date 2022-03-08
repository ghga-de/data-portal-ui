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
  const [page, setPage] = React.useState(1)
  const [skip, setSkip] = React.useState(0);
  const [filterDict, setFilterDict] = React.useState<facetFilterModel[]>([]);
  const [limit, setLimit] = React.useState(10);
  const [searchKeyword, setSearchKeyword] = React.useState('');
  const [searchResults, setSearchResp] = React.useState<searchResponseModel | null>(null);

  if (searchParams !== undefined) {
    if (searchParams.get("p") !== undefined) {
      setPage(parseInt(searchParams.get("p") || "1"))
      setSkip((page - 1) * limit)
    }
    if (searchParams.get("q") !== undefined) {
      console.log(searchParams.get("q"))
      setSearchKeyword(searchParams.get("q") || '')
      console.log("search " + searchKeyword)
    }
  }
  React.useEffect(() => {
    const getData = () => {
      console.log(searchKeyword)
      getDatasetsSearchResp(setSearchResp, filterDict, searchKeyword, skip, limit);
    };
    getData();
  }// eslint-disable-next-line react-hooks/exhaustive-deps
    , [])

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
            limit={limit}
            searchParams={searchParams}
            setSearchParams={setSearchParams} />
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
