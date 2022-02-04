import React from "react";
import { Form, Col, Container } from "react-bootstrap";
import { facetModel } from "../../../models/facets";

interface filterProps {
  facet: facetModel;
  check: boolean;
  setCheck: any;
}

const Filter = (props: filterProps) => {
  const handleCheck = () => {
    props.setCheck(!props.check)
  }

  return (
    <Container className="bg-white border col-11 mb-3 pb-3 rounded">
      <Form>
        <Form.Label className="mt-2">{props.facet.key}</Form.Label>
        <hr className="m-0" />
        {props.facet.options.map((option) => (
          <div key={props.facet.key + ":" + option.option} className="p-1">
            <Form.Check
              id={props.facet.key + ":" + option.option}
              className="d-inline-block"
              checked={props.check}
              onChange={handleCheck}
            />
            <Form.Label
              className="p-0 m-0 w-100 d-inline"
              htmlFor={props.facet.key + ":" + option.option}
            >
              <Col xs md lg={10} className="d-inline-block">
                <span className="px-1 d-block">{option.option}</span>
              </Col>
              <Col xs md lg={1} className="d-inline-block">
                <Form.Label
                  className="p-0 m-0"
                  htmlFor={props.facet.key + ":" + option.option}
                >
                  {option.count}
                </Form.Label>
              </Col>
            </Form.Label>
          </div>
        ))}
      </Form>
    </Container>
  );
};

export default Filter;
