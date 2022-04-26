import React, { Dispatch, SetStateAction } from "react";
import { Form, Col, Container, Row, Badge } from "react-bootstrap";
import { facetModel, facetFilterModel } from "../../../models/facets";

interface filterProps {
  facet: facetModel;
  check: Map<string, boolean>;
  setCheck: Dispatch<SetStateAction<Map<string, boolean>>>;
  searchKeyword: string;
  appliedFilterDict: facetFilterModel[];
  setAppliedFilterDict: Dispatch<SetStateAction<facetFilterModel[]>>;
}

const Filter = (props: filterProps) => {
  const handleCheck = (
    key: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const facetFilter: facetFilterModel = {
      key: key.split(":")[0],
      value: key.split(":")[1],
    };
    if (event.target.checked) {
      props.setAppliedFilterDict(props.appliedFilterDict.concat(facetFilter));
    } else {
      props.setAppliedFilterDict(
        props.appliedFilterDict.filter(
          (item) => item.value !== key.split(":")[1]
        )
      );
    }
    props.setCheck(props.check.set(key, event.target.checked));
  };

  return (
    <Container className="col-11 mb-3 fs-7 mx-0 w-100">
      <Form>
        <Form.Label className="mt-0 mb-4 text-capitalize fs-5"><strong>{props.facet.name}</strong></Form.Label>
        <div className="border rounded border-light px-2 pt-3 pb-4">
        {props.facet.options
          .sort((a, b) => (b.option < a.option ? 1 : -1))
          .map((option) => {
            let key: string = props.facet.key + ":" + option.option;
              return (
                <div className="p-1 d-flex align-top mb-1" key={key}>
                  <Form.Check
                    id={key}
                    className="d-inline-block"
                    checked={props.check.get(key)}
                    value={key}
                    onChange={(event) => handleCheck(key, event)}
                    style={{ zIndex: 100 }}
                    name={props.facet.key}
                  />
                  <Form.Label className="p-0 m-0 w-100" htmlFor={key}  style={{cursor: "pointer"}}>
                    <Row>
                      <Col lg={9} md={9} sm={9} xl={9} xs={9} xxl={9}>
                        <p className="ps-2 my-0 text-capitalize">{option.option}</p>
                      </Col>
                      <Col lg={3} md={3} sm={3} xl={3} xs={3} xxl={3} className="h-100">
                        <Form.Label className="p-0 m-0 w-100" htmlFor={key}>
                          <Badge className="w-100 user-select-none"  style={{cursor: "pointer"}}>{option.count}</Badge>
                        </Form.Label>
                      </Col>
                    </Row>
                  </Form.Label>
                </div>
              );
          })}
          </div>
      </Form>
    </Container>
  );
};

export default Filter;
