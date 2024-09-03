// Copyright 2021 - 2024 Universität Tübingen, DKFZ and EMBL
// for the German Human Genome-Phenome Archive (GHGA)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React, { Dispatch, SetStateAction } from "react";
import { Form, Col, Container, Row, Badge } from "react-bootstrap";
import { FacetModel, FacetFilterModel } from "../../../models/facets";

const ALWAYS_TITLE_CASE_OPTIONS = /Experiment|Study Type/i;

const SOMETIMES_TITLE_CASE_OPTIONS = /Platform|Analysis Level/i;

const TITLE_CASE_WORDS = /Illumina|Total/gi;

const UPPER_CASE_REPLACE = ["HiSeq"];

export function renderFacetOption(value: string, facet: string): string {
  if (!value) return "unspecified";
  value = value.replace(/_/g, " ");
  if (facet && ALWAYS_TITLE_CASE_OPTIONS.test(facet)) {
    value = value.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  } else if (facet && SOMETIMES_TITLE_CASE_OPTIONS.test(facet)) {
    value = value.replace(
      TITLE_CASE_WORDS,
      (word) => word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase()
    );
    for (let word of UPPER_CASE_REPLACE) {
      value = value.replace(word.toUpperCase(), word);
    }
  }
  return value;
}

interface FilterProps {
  facet: FacetModel;
  check: Map<string, boolean>;
  setCheck: Dispatch<SetStateAction<Map<string, boolean>>>;
  searchKeyword: string;
  appliedFilterDict: FacetFilterModel[];
  setAppliedFilterDict: Dispatch<SetStateAction<FacetFilterModel[]>>;
}

/** Form component for filters in Browse sidebar */
const Filter = (props: FilterProps) => {
  const handleCheck = (
    key: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const facetFilter: FacetFilterModel = {
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
    <Container className="col-11 mb-lg-3 mx-0 w-100 p-0">
      <Form>
        <Form.Label className="mt-0 mb-lg-3 text-capitalize fs-5">
          <strong>{props.facet.name}</strong>
        </Form.Label>
        <div className="border rounded border-light px-2 py-1 pt-lg-3 pb-lg-4 mb-3">
          {props.facet.options
            .sort((a, b) => (b.value < a.value ? 1 : -1))
            .map((option) => {
              let key: string = props.facet.key + ":" + option.value;
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
                  <Form.Label
                    className="p-0 m-0 w-100"
                    htmlFor={key}
                    style={{ cursor: "pointer" }}
                  >
                    <Row>
                      <Col lg={10} md={10} sm={10} xl={10} xs={10} xxl={10}>
                        <p className="ps-2 my-0 text-capitalize text-break">
                          {renderFacetOption(option.value, props.facet.name)}
                        </p>
                      </Col>
                      <Col
                        lg={2}
                        md={2}
                        sm={2}
                        xl={2}
                        xs={2}
                        xxl={2}
                        className="h-100 ps-0 pe-3"
                      >
                        <Form.Label className="p-0 m-0 w-100" htmlFor={key}>
                          <Badge
                            className="w-100 fs-7 user-select-none px-0"
                            style={{ cursor: "pointer" }}
                          >
                            {option.count}
                          </Badge>
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
