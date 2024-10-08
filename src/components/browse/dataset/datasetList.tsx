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
import DatasetPagination from "./datasetPagination/datasetPagination";
import DatasetAccordion from "./datasetAccordion/datasetAccordion";
import { HitModel, SearchResponseModel } from "../../../models/dataset";
import { FacetFilterModel, FacetModel } from "../../../models/facets";
import { Col, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { scrollUp } from "../../../utils/utils";

interface DataSetProps {
  dsCount: number;
  dsList: HitModel[] | null;
  setSearchResults: Dispatch<SetStateAction<SearchResponseModel | null>>;
  searchKeyword: string;
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
  filterDict: FacetFilterModel[];
  searchParams: any;
  setSearchParams: any;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  facets: FacetModel[] | null;
  skip: number;
  setFilterDict: Dispatch<SetStateAction<FacetFilterModel[]>>;
}

/** Section of the Browse page where datasets are listed. It contains accordion list of datasets and pagination. */
const DatasetList = (props: DataSetProps) => {
  var dsCount: number = props.dsCount;

  const PaginatedDataset = () => {
    return (
      <DatasetPagination
        setSearchResults={props.setSearchResults}
        searchKeyword={props.searchKeyword}
        limit={props.limit}
        setLimit={props.setLimit}
        dsCount={dsCount}
        filterDict={props.filterDict}
        page={props.page}
        setPage={props.setPage}
        searchParams={props.searchParams}
        setSearchParams={props.setSearchParams}
        setFilterDict={props.setFilterDict}
      />
    );
  };

  const Columns = () => {
    return (
      <Row className="mt-3 mb-3 ms-lg-0 me-lg-0 py-1 ps-lg-2 bg-primary text-white">
        <Col xs={5} md={4} xl={3}>
          Dataset ID
        </Col>
        <Col className="pe-lg-2 ps-0">Title</Col>
      </Row>
    );
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.setLimit(parseInt(event.target.value));
    scrollUp();
  };

  return (
    <div className="p-lg-2 ps-lg-3 h-100 pt-0">
      {props.dsList === null ? (
        <div className="p-2 fs-4 my-3 fw-bold">
          <FontAwesomeIcon icon={faCircleInfo} className="text-info" />
          &nbsp; Loading datasets...
        </div>
      ) : props.dsCount === -1 ? (
        <div className="p-2 fs-3 my-3 fw-bold">
          <FontAwesomeIcon icon={faCircleExclamation} className="text-danger" />
          &nbsp; Error loading datasets!
        </div>
      ) : props.dsCount === 0 ? (
        <div className="p-2 fs-3 my-3 fw-bold">
          <FontAwesomeIcon icon={faCircleExclamation} className="text-danger" />
          &nbsp; No datasets found!
        </div>
      ) : (
        <>
          <div className="w-100">
            <Columns />
            <DatasetAccordion dsList={props.dsList} />
          </div>
          <Row className="mb-2 mt-5 w-100 px-0 mx-0">
            <Col xs={12} md={10} className="mb-3 mb-md-0 px-0">
              <PaginatedDataset />
            </Col>
            <Col xs={4} md={2} className="ps-0 ps-lg-4 pe-0">
              {(props.page - 1) * 50 <= props.dsCount ? (
                <Form.Select
                  value={props.limit}
                  onChange={(event) => handleSelect(event)}
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </Form.Select>
              ) : (props.page - 1) * 25 <= props.dsCount ? (
                <Form.Select
                  value={props.limit}
                  onChange={(event) => handleSelect(event)}
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                </Form.Select>
              ) : (
                <Form.Select
                  value={props.limit}
                  onChange={(event) => handleSelect(event)}
                >
                  <option value="10">10</option>
                </Form.Select>
              )}
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default DatasetList;
