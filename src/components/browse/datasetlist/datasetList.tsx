import React, { Dispatch, SetStateAction } from "react";
import DatasetListHeader from "./datasetListHeader";
import DatasetPagination from "./datasetPagination";
import DatasetHeader from "./datasetheader/datasetHeader";
import { hitModel, searchResponseModel } from "../../../models/dataset";
import { facetFilterModel } from "../../../models/facets";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

interface dataSetProps {
  dsCount: number;
  dsList: hitModel[] | null;
  setSearchResults: Dispatch<SetStateAction<searchResponseModel | null>>;
  searchKeyword: string;
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
  filterDict: facetFilterModel[];
  searchParams: any;
  setSearchParams: any;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const DatasetList = (props: dataSetProps) => {
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
      />
    );
  };

  const HeaderHeader = () => {
    return (
      <Row className="fs-7 mt-4 mb-3 ms-0 me-3 py-1 ps-2 bg-secondary text-light">
        <Col lg={3} md={3} sm={3} xl={3} xs={3} xxl={3}>
          <strong>Dataset ID:</strong>
        </Col>
        <Col className="pe-2 ps-0">
          <strong>Title:</strong>
        </Col>
      </Row>
    );
  };

  return (
    <div className="bg-white p-2 ps-3 h-100">
      <DatasetListHeader dsCount={dsCount} searchParams={props.searchParams} />
      {props.dsList === null || props.dsList.length === 0 ? (
        <div className="p-2 fs-3 my-3 fw-bold">
          <FontAwesomeIcon icon={faCircleExclamation} className="text-danger" />
          &nbsp; No datasets found!
        </div>
      ) : (
        <div>
          <div className="w-100">
            <HeaderHeader />
            <DatasetHeader dsList={props.dsList} />
          </div>
          <PaginatedDataset />
        </div>
      )}
    </div>
  );
};

export default DatasetList;
