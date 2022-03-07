import React from 'react';
import { Badge, Row, Col } from 'react-bootstrap';
import { Arrow90degLeft } from 'react-bootstrap-icons'

interface dataSetListHeaderProps {
  dsCount: number;
};

const DatasetListHeader = (props: dataSetListHeaderProps) => {
  return (
    <Row className='mt-3 pe-4'>
      <Col lg md sm xl xs xxl="9">
        <Badge className='p-2 bg-secondary'>Datasets Found: {props.dsCount}</Badge>
      </Col>
      <Col className='text-end'>
        <a href="/browse" className='text-reset fs-7 mt-2'>Back to all datasets&nbsp;<Arrow90degLeft/></a>
      </Col>
    </Row>
  )
}

export default DatasetListHeader;
