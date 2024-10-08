// Copyright 2021 - 2024 Universität Tübingen, DKFZ and EMBL
// for the German Human Genome-Phenome Archive (GHGA)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React, { useState } from "react";
import { Col, Navbar, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { querySearchService } from "../../api/browse";
import { HitModel, SearchResponseModel } from "../../models/dataset";
import { FacetFilterModel, FacetModel } from "../../models/facets";
import DatasetHeader from "./dataset/datasetHeader";
import DatasetList from "./dataset/datasetList";
import Sidebar from "./sidebar/sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { getFilterParams } from "./shared";

/** Browse page */
const Browse = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = React.useState(
    parseInt(searchParams.get("p") || "0")
  );

  const [limit, setLimit] = React.useState(10);
  let skip = page === 0 ? 0 : (page - 1) * limit;

  let filterParams = getFilterParams(searchParams.get("f")) || [];

  const [filterDict, setFilterDict] =
    React.useState<FacetFilterModel[]>(filterParams);

  const [searchKeyword, setSearchKeyword] = React.useState(
    searchParams.get("q") || ""
  );
  const [searchResults, setSearchResults] =
    React.useState<SearchResponseModel | null>(null);

  const [appliedFilterDict, setAppliedFilterDict] = React.useState<
    FacetFilterModel[]
  >([]);

  const [check, setCheck] = React.useState<Map<string, boolean>>(
    new Map<string, boolean>()
  );

  React.useEffect(
    () => {
      const getData = () => {
        querySearchService(
          setSearchResults,
          filterDict,
          searchKeyword,
          skip,
          limit,
          "EmbeddedDataset"
        );
      };
      getData();
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [limit]
  );

  var dsList: HitModel[] | null = null;
  var facetList: FacetModel[] | null = null;
  var dsCount: number = 0;

  if (searchResults !== null) {
    if (
      (searchResults.hits && searchResults.hits.length > 0) ||
      searchResults.count === -1
    ) {
      dsList = searchResults.hits;
      facetList = searchResults.facets;
      dsCount = searchResults.count;
    } else {
      dsList = [];
      facetList = [];
      dsCount = 0;
    }
  }

  const [openFilter, setOpenFilter] = useState(false);

  return (
    <div className="mt-4 mx-auto px-2 px-md-5">
      <Row>
        <DatasetHeader
          dsCount={dsCount}
          searchParams={searchParams}
          facets={facetList}
          setSearchResults={setSearchResults}
          limit={limit}
          skip={skip}
          setSearchKeyword={setSearchKeyword}
          filterDict={filterDict}
          setFilterDict={setFilterDict}
          searchKeyword={searchKeyword}
          setAppliedFilterDict={setAppliedFilterDict}
          appliedFilterDict={appliedFilterDict}
          check={check}
          setPage={setPage}
        />
      </Row>
      <Row>
        <Col xs={12} lg={4} xl={3}>
          <Navbar expand="lg" expanded={openFilter}>
            <Navbar.Toggle
              className="col-12 mt-3 p-2"
              aria-controls="filter-datasets-nav"
              onClick={() => setOpenFilter(!openFilter)}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <FontAwesomeIcon icon={faFilter} /> Search&nbsp;and filter results
            </Navbar.Toggle>
            <Navbar.Collapse id="filter-datasets-nav">
              <Sidebar
                searchKeyword={searchKeyword}
                setSearchKeyword={setSearchKeyword}
                facetList={facetList}
                setSearchResults={setSearchResults}
                setFilterDict={setFilterDict}
                filterDict={filterDict}
                limit={limit}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                page={page}
                setPage={setPage}
                setAppliedFilterDict={setAppliedFilterDict}
                appliedFilterDict={appliedFilterDict}
                setCheck={setCheck}
                check={check}
                setOpenFilter={setOpenFilter}
              />
            </Navbar.Collapse>
          </Navbar>
        </Col>
        <Col className="px-4 px-lg-2">
          <DatasetList
            searchKeyword={searchKeyword}
            setSearchResults={setSearchResults}
            dsCount={dsCount}
            dsList={dsList}
            filterDict={filterDict}
            limit={limit}
            setLimit={setLimit}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            page={page}
            setPage={setPage}
            facets={facetList}
            skip={skip}
            setFilterDict={setFilterDict}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Browse;
