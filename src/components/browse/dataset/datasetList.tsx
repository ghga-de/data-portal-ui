import React from 'react';
import DatasetListHeader from './datasetListHeader';
import DatasetPagination from './datasetPagination';
import Dataset from './dataset';
import { hitModel } from '../../../models/dataset';


interface dataSetProps {
  dsList: hitModel[] | null;
};

const DatasetList = (props: dataSetProps) => {

  const [active, setActive] = React.useState<number>(1);
  var dsCount: number = props.dsList === null ? 0 : props.dsList.length

  return (
    <div className='bg-white border p-2 px-3 rounded'>
      <DatasetListHeader dsCount={dsCount} />
      <DatasetPagination dsCount={props.dsList === null ? 0 : props.dsList.length} active={active} setActive={setActive} />
      {
        props.dsList === null ? null : (<Dataset dsList={props.dsList.slice((active - 1) * 10, active < dsCount ? active * 10 : dsCount)} />)
      }
      <DatasetPagination dsCount={props.dsList === null ? 0 : props.dsList.length} active={active} setActive={setActive} />
    </div>
  )
}

export default DatasetList;
