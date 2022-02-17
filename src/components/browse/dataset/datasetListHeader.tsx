import React from 'react';
import { Badge } from 'react-bootstrap';

interface dataSetListHeaderProps {
  dsCount: number;
};

const DatasetListHeader = (props: dataSetListHeaderProps) => {
  return (
    <div>
      <Badge className='float-end p-3 m-3 bg-secondary'>Total Datasets: {props.dsCount}</Badge>
    </div>
  )
}

export default DatasetListHeader;
