import React, { Dispatch, SetStateAction } from "react";
import DatasetListHeader from "./datasetListHeader";
import DatasetPagination from "./datasetPagination";
import DatasetHeader from "./datasetheader/datasetHeader";
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
  searchParams: any
  setSearchParams: any
  page: number
  setPage: Dispatch<SetStateAction<number>>;
}

const DatasetList = (props: dataSetProps) => {
  var dsCount: number = props.dsCount;

  const PaginatedDataset = () => {
    return (
      <DatasetPagination
        setSearchResp={props.setSearchResp}
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
    )
  }

  return (
    <div className="bg-white border p-2 ps-3 rounded h-100">
      <DatasetListHeader dsCount={dsCount} searchParams={props.searchParams} />
      <PaginatedDataset />
      {props.dsList === null ? null : (
        <div className="w-100 mt-4">
          <DatasetHeader dsList={props.dsList} />
        </div>
      )}
      <PaginatedDataset />
    </div>
  );
};

export default DatasetList;
