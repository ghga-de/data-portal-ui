import React, { Dispatch, SetStateAction } from "react";
import DatasetListHeader from "./datasetListHeader";
import DatasetPagination from "./datasetPagination";
import Dataset from "./dataset";
import { hitModel, searchResponseModel } from "../../../models/dataset";
import { facetFilterModel } from "../../../models/facets";

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
  const [currentPage, setCurrentPage] = React.useState(0)

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
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {props.dsList === null ? null : (
        <div className="w-100 mt-4">
          <Dataset dsList={props.dsList} />
        </div>
      )}
      <DatasetPagination
        setSearchResp={props.setSearchResp}
        searchKeyword={props.searchKeyword}
        limit={props.limit}
        setLimit={props.setLimit}
        dsCount={dsCount}
        filterDict={props.filterDict}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default DatasetList;
