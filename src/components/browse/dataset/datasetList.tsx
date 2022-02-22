import React, { Dispatch, SetStateAction } from "react";
import DatasetListHeader from "./datasetListHeader";
import DatasetPagination from "./datasetPagination";
import Dataset from "./dataset";
import { hitModel, searchResponseModel } from "../../../models/dataset";
import { facetFilterModel } from "../../../models/facets";
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';

interface dataSetProps {
  dsCount: number;
  dsList: hitModel[] | null;
  setSearchResp: Dispatch<SetStateAction<searchResponseModel | null>>;
  searchKeyword: string;
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
  filterDict: facetFilterModel[];
}

const DatasetList = (props: dataSetProps) => {
  var dsCount: number = props.dsCount;

  return (
    <div className="bg-white border p-2 ps-3 rounded h-100">
      <DatasetListHeader dsCount={dsCount} />
      <DatasetPagination
        setSearchResp={props.setSearchResp}
        searchKeyword={props.searchKeyword}
        limit={props.limit}
        setLimit={props.setLimit}
        dsCount={dsCount}
        filterDict={props.filterDict}
      />
      {props.dsList === null ? null : (
        <div style={{ height: "60vh" }} className="mb-2 position-relative w-100">
          <PerfectScrollbar>
            <Dataset dsList={props.dsList} />
          </PerfectScrollbar>
        </div>
      )}
    </div>
  );
};

export default DatasetList;
