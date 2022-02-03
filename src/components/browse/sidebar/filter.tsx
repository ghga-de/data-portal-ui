import React from 'react';
import { Form, Col, Container, Row } from 'react-bootstrap';
import { facetModel } from '../../../models/facets'

interface filterProps {
  facet: facetModel
};

const Filter = (props: filterProps) => {

  const facetDisplayText = (key: string) => {
    // const displayText = {
    //   "type": "Type",
    //   "has_study.type": "Has study of type"
    // }
    return key
  }

  return (
    <Container className="bg-white border col-11 mb-3 pb-3 rounded fs-7">
      <Form>
        <Form.Label className='mt-2'>{facetDisplayText(props.facet.key)}</Form.Label>
        <hr className="m-0" />

        {props.facet.options.map((option) => (
          <div className="p-1 d-flex align-top">
            <Form.Check id={props.facet.key + ":" + option.option} className="d-inline-block" />
            <Form.Label className="p-0 m-0 w-100" htmlFor={props.facet.key + ":" + option.option}>
              <Row>
              <Col xs md lg={10}>
                <p className='px-2 my-0'>{option.option}</p>
              </Col>
              <Col xs md lg={2} className="h-100">
                <Form.Label className="p-0 m-0" htmlFor={props.facet.key + ":" + option.option}>
                  {option.count}
                </Form.Label>
              </Col>
              </Row>
            </Form.Label>
          </div>
        ))}
      </Form>
    </Container>
  )
}

export default Filter;
