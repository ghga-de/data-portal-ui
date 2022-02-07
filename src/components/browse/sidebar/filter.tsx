import React, { Dispatch, SetStateAction } from "react";
import { Form, Col, Container } from "react-bootstrap";
import { facetModel, facetFilterModel } from "../../../models/facets";

interface filterProps {
  facet: facetModel;
  check: Map<string, boolean>;
  setCheck: Dispatch<SetStateAction<Map<string, boolean>>>;
  setFilterDict: Dispatch<SetStateAction<facetFilterModel[]>>;
  searchKeyword: string;
  filterDict: facetFilterModel[];
}

const Filter = (props: filterProps) => {


  const handleCheck = (key: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const facetFilter: facetFilterModel = { 'key': key.split(':')[0], 'value': key.split(':')[1] }
    if (event.target.checked) {
      console.log(event.target.checked)
      props.setFilterDict(props.filterDict.concat(facetFilter))
      console.log(props.filterDict)
    } else {
      console.log(event.target.checked)
      props.setFilterDict(props.filterDict.filter(item => item.key !== key.split(':')[0]))
      console.log(props.filterDict)
    }
    props.setCheck(props.check.set(key, event.target.checked))
  }

  return (
    <Container className="bg-white border col-11 mb-3 pb-3 rounded">
      <Form>
        <Form.Label className="mt-2">{props.facet.key}</Form.Label>
        <hr className="m-0" />
        {props.facet.options.map((option) => {
          let key: string = props.facet.key + ":" + option.option;
          return (
            < div key={key} className="p-1" >
              <Form.Check
                className="d-inline-block"
                checked={props.check.get(key)}
                value={key}
                onChange={(event) => handleCheck(key, event)}
              />
              <Form.Label
                className="p-0 m-0 w-100 d-inline"
                htmlFor={key}
              >
                <Col xs md lg={10} className="d-inline-block">
                  <span className="px-1 d-block">{option.option}</span>
                </Col>
                <Col xs md lg={1} className="d-inline-block">
                  <Form.Label
                    className="p-0 m-0"
                    htmlFor={key}
                  >
                    {option.count}
                  </Form.Label>
                </Col>
              </Form.Label>
            </div>
          )
        })}
      </Form>
    </Container >
  );
};

export default Filter;
