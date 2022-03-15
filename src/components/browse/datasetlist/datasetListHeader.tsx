import React from 'react';
import { Badge, Row, Col } from 'react-bootstrap';
import { Arrow90degLeft } from 'react-bootstrap-icons'

interface dataSetListHeaderProps {
  dsCount: number;
  searchParams: any;
};

const DatasetListHeader = (props: dataSetListHeaderProps) => {
  const getFilterParamsList = () => {
    let filterParamsList = []
    if(props.searchParams.get("f") !== undefined && props.searchParams.get("f") !== null){
      let searchParamsList = props.searchParams.get("f").split(';')
      for (var item of searchParamsList){
        filterParamsList.push(item.replace(':', ' | '))
      }
    }
    return filterParamsList
  }
  
  
  return (
    <Row className='mt-3 pe-4'>
      <Col lg md sm xl xs xxl="3">
        <Badge className='p-2 bg-secondary'>Datasets Found: {props.dsCount}</Badge>
      </Col>
      <Col lg md sm xl xs xxl="6">
        {getFilterParamsList().map((item) => 
          <Badge key={item} className='p-2 bg-secondary'>{item}</Badge>
        )}
      </Col>
      <Col className='text-end'>
        <a href="/browse" className='text-reset fs-7 mt-2'>Back to all datasets&nbsp;<Arrow90degLeft/></a>
      </Col>
    </Row>
  )
}

export default DatasetListHeader;
