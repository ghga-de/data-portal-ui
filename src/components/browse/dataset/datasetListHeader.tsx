import React from 'react';
import { Breadcrumb, Badge } from 'react-bootstrap';

interface dataSetListHeaderProps {
  dsCount : number;
};

const DatasetListHeader = (props: dataSetListHeaderProps) => {
  return (
      <div>
          <Badge className='float-end p-3 m-3 bg-secondary'>Total Datasets: {props.dsCount}</Badge>
          <Breadcrumb>
            <Breadcrumb.Item href="#">All Datasets</Breadcrumb.Item>
            <Breadcrumb.Item>type</Breadcrumb.Item>
          </Breadcrumb>
      </div>
  )
}

export default DatasetListHeader;
