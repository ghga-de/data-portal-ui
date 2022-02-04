import React, { Dispatch, SetStateAction } from "react";
import DatasetListHeader from './datasetListHeader';
import DatasetPagination from './datasetPagination';
import Dataset from './dataset';
import { hitModel } from '../../../models/dataset';
import { searchResponseModel } from "../../../models/dataset";


interface dataSetProps {
  dsCount: number
  dsList: hitModel[] | null;
  setSearchResp: Dispatch<SetStateAction<searchResponseModel | null>>;
  searchKeyword: string;
  limit: number;
  setLimit: any;
};

const DatasetList = (props: dataSetProps) => {
  var dsCount: number = props.dsCount

  return (
    <div className='bg-white border p-2 px-3 rounded'>
      <DatasetListHeader dsCount={dsCount} />
      <DatasetPagination
        setSearchResp={props.setSearchResp}
        searchKeyword={props.searchKeyword}
        limit={props.limit}
        setLimit={props.setLimit}
        dsCount={dsCount} />
      {
        props.dsList === null ?
          null :
          (
            <Dataset dsList={props.dsList} />
          )
      }
    </div>
  )
}

export default DatasetList;
