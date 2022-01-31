import React from 'react';
import Search from './searchbar'
import Filter from './filter';
import { Row, Col, Button } from 'react-bootstrap'
import { facetModel } from '../../../models/facets'

interface sidebarProps {
  facetList: facetModel[] | null;
};

const Sidebar = (props: sidebarProps) => {
  return (
    <div>
      <Row>
        <Search />
      </Row>
      {props.facetList === null || props.facetList.length < 1 ? null : (
        <div className='bg-light border p-2 rounded-3'>
          <Row>
            {
              props.facetList.map((facet, index) => (
                <Filter facet={facet} />
              ))
            }
          </Row>
          <Row className="mb-2">
            <Col className="offset-2" xs md lg={4}>
              <Button className='btn-warning w-100'>Clear</Button>
            </Col>
            <Col xs md lg={6} className="">
              <Button className='btn-success w-100'>Filter</Button>
            </Col>
          </Row>
        </div>
      )}
    </div>
  )
}

export default Sidebar;
