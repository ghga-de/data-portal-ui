import React from 'react';
import { Pagination } from 'react-bootstrap';

interface dataSetPaginationProps {
  dsCount : number
  active : number
  setActive: React.Dispatch<React.SetStateAction<number>>
};

const DatasetPagination = (props: dataSetPaginationProps) => {

  const PaginationGenerator = (active : number = 1) => {
    var items = []
    for (let i = 1; i <= props.dsCount/10; i++) {
      items.push(<Pagination.Item key={i} active={i === active} onClick={()=> props.setActive(i)}>{i}</Pagination.Item>)
    }

  return items
}

  return (
    <div>
        <Pagination>
            {PaginationGenerator(props.active)}
        </Pagination>
    </div>
  )
}

export default DatasetPagination;
