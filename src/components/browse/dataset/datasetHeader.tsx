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

import React, { Dispatch, SetStateAction } from "react";
import { Badge, Row, Col, CloseButton } from "react-bootstrap";
import { FacetFilterModel, FacetModel } from "../../../models/facets";
import { SearchResponseModel } from "../../../models/dataset";
import { useNavigate } from "react-router-dom";
import { querySearchService } from "../../../api/browse";
import { handleFilterAndSearch } from "../shared";
import { renderFacetOption } from "../sidebar/filter";

interface DatasetHeaderProps {
  dsCount: number;
  searchParams: URLSearchParams;
  facets: FacetModel[] | null;
  setSearchResults: Dispatch<SetStateAction<SearchResponseModel | null>>;
  filterDict: FacetFilterModel[];
  setSearchKeyword: Dispatch<SetStateAction<string>>;
  limit: number;
  skip: number;
  setFilterDict: Dispatch<SetStateAction<FacetFilterModel[]>>;
  searchKeyword: string;
  setAppliedFilterDict: Dispatch<SetStateAction<FacetFilterModel[]>>;
  appliedFilterDict: FacetFilterModel[];
  check: Map<string, boolean>;
  setPage: Dispatch<SetStateAction<number>>;
}

function renderItem(item: string): string {
  let facetAndValue = item.split("|", 2)[1];
  let [facet, value] = facetAndValue.split(": ", 2);
  return facet + ": " + renderFacetOption(value, facet);
}

/** Section at the top of Browse page. It contains search keywords, applied filters and datasets count found. */
const DatasetHeader = (props: DatasetHeaderProps) => {
  const navigate = useNavigate();

  const [searchResults, setSearchResults] =
    React.useState<SearchResponseModel | null>(null);
  React.useEffect(() => {
    const getData = () => {
      querySearchService(setSearchResults, [], "", 0, 1, "EmbeddedDataset");
    };
    getData();
  }, []);

  const listOfAllFacets: FacetModel[] =
    searchResults &&
    ((searchResults.hits && searchResults.hits.length > 0) ||
      searchResults.count === -1)
      ? searchResults.facets
      : [];

  const getFilterParamsList = () => {
    let filterParamsList = [];
    let searchParams = props.searchParams.get("f");
    if (searchParams) {
      let searchParamsList = searchParams.split(";");
      for (var item of searchParamsList) {
        const itemKey = item.split(":")[0];
        var itemPretty = itemKey + "|" + item.replace(":", ": ");
        if (listOfAllFacets) {
          const findResult: FacetModel | undefined = listOfAllFacets.find(
            (x) => x.key === itemKey
          );
          if (findResult) {
            var facetName = findResult.name;
            if (facetName) {
              itemPretty =
                findResult.key + "|" + facetName + ": " + item.split(":")[1];
            }
          }
        }
        filterParamsList.push(itemPretty);
      }
    }
    return filterParamsList;
  };

  const clearFilter = (idx: number, key: string) => {
    props.filterDict.splice(idx, 1);
    const itemKey = key.split("|")[0] + ":" + key.split(": ")[1];
    const splicedAppliedFilterDict = props.appliedFilterDict.filter(
      (x) => x.value !== itemKey.split(":")[1]
    );
    props.setAppliedFilterDict(splicedAppliedFilterDict);
    navigate(
      handleFilterAndSearch(
        props.setSearchResults,
        props.filterDict,
        props.searchKeyword,
        props.limit,
        0,
        0,
        props.setPage,
        props.setFilterDict,
        null
      )
    );
    props.check.set(itemKey, false);
  };

  return (
    <Row className="mt-1 mx-0">
      <Col
        xs={12}
        lg={6}
        xl={7}
        className="ps-3 offset-0 offset-lg-4 offset-xl-3"
      >
        <div className="ps-3 pe-0">
          {props.searchParams.get("q") !== undefined &&
          props.searchParams.get("q") !== null ? (
            <Badge
              key={props.searchParams.get("q")}
              className="py-1 m-0 me-2 fs-7 bg-white text-black border border-secondary fw-normal"
              style={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              <div className="lh-1">
                <Row className="flex-nowrap">
                  <Col xs={"auto"} className="pe-0 align-items-center d-flex">
                    <CloseButton
                      onClick={() => {
                        props.setSearchKeyword("");
                        navigate(
                          handleFilterAndSearch(
                            props.setSearchResults,
                            props.filterDict,
                            "",
                            props.limit,
                            0,
                            0,
                            props.setPage,
                            props.setFilterDict,
                            null
                          )
                        );
                      }}
                      className="fs-8"
                    />
                  </Col>
                  <Col className="ps-0 align-items-center d-flex">
                    <span className="px-1 mb-0">
                      Keyword: {props.searchParams.get("q")}
                    </span>
                  </Col>
                </Row>
              </div>
            </Badge>
          ) : (
            <></>
          )}
          {getFilterParamsList().map((item, idx) => (
            <Badge
              key={item.split("|", 2)[1]}
              className="py-1 m-0 me-2 text-black fs-7 border text-capitalize bg-white border-secondary fw-normal"
              style={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
              title={renderItem(item)}
            >
              <div className="lh-1">
                <Row className="flex-nowrap">
                  <Col xs={"auto"} className="pe-0 align-items-center d-flex">
                    <CloseButton
                      onClick={() => clearFilter(idx, item)}
                      className="fs-8"
                    />
                  </Col>
                  <Col className="ps-0 align-items-center d-flex">
                    <span className="px-1 mb-0">{renderItem(item)}</span>
                  </Col>
                </Row>
              </div>
            </Badge>
          ))}
        </div>
      </Col>
      <Col xs={12} lg={2} className="text-end pe-0 pe-lg-4">
        <Badge className="py-2 px-2 bg-primary me-1">
          {props.searchParams.get("f") !== undefined &&
          props.searchParams.get("f") !== null
            ? "Datasets Found:"
            : "Total Datasets:"}
          &nbsp;{props.dsCount !== -1 ? props.dsCount : 0}
        </Badge>
      </Col>
    </Row>
  );
};

export default DatasetHeader;
