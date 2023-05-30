// Copyright 2021 - 2023 Universität Tübingen, DKFZ, EMBL, and Universität zu Köln
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
//
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

interface AccessRequestsFilterProps {
  handleFilter: any;
  MIN_ISO: string;
  MAX_ISO: string;
  filterObj: {
    datasetFilter: string;
    userFilter: string;
    fromFilter: string;
    untilFilter: string;
    statusFilter: string;
  };
  parseDate: (value: string, force?: boolean) => string;
}

const AccessRequestsFilter = (props: AccessRequestsFilterProps) => {
  const FORM_GROUP_ROW_CLASS_NAMES = "row mb-3";
  const LABEL_COL_CLASS_NAMES = "col-4 col-form-label";

  return (
    <Container className="mb-4 border rounded shadow p-2 mx-0 w-50">
      <Row>
        <Col className="fs-1" xs={"auto"}>
          <FontAwesomeIcon icon={faFilter} />
        </Col>
        <Col>
          <Form
            onSubmit={(e) => {
              props.handleFilter();
              e.preventDefault();
            }}
          >
            <Form.Group className={FORM_GROUP_ROW_CLASS_NAMES}>
              <Form.Label className={LABEL_COL_CLASS_NAMES}>Dataset</Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  onChange={(event) => {
                    props.handleFilter(event.target.value);
                  }}
                ></Form.Control>
              </Col>
            </Form.Group>
            <Form.Group className={FORM_GROUP_ROW_CLASS_NAMES}>
              <Form.Label className={LABEL_COL_CLASS_NAMES}>User</Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  onChange={(event) => {
                    props.handleFilter(undefined, event.target.value);
                  }}
                ></Form.Control>
              </Col>
            </Form.Group>
            <Form.Group className={FORM_GROUP_ROW_CLASS_NAMES}>
              <Form.Label className={LABEL_COL_CLASS_NAMES}>
                Requested date from
              </Form.Label>
              <Col>
                <Form.Control
                  type="date"
                  min={props.MIN_ISO.split("T")[0]}
                  max={new Date().toISOString().split("T")[0]}
                  value={props.filterObj["fromFilter"].split("T")[0]}
                  onBlur={(event) => {
                    event.target.value = props.parseDate(
                      event.target.value,
                      true
                    );
                    props.handleFilter(
                      undefined,
                      undefined,
                      event.target.value
                    );
                  }}
                  onChange={(event) => {
                    event.target.value = props.parseDate(event.target.value);
                    props.handleFilter(
                      undefined,
                      undefined,
                      event.target.value
                    );
                  }}
                ></Form.Control>
              </Col>
            </Form.Group>
            <Form.Group className={FORM_GROUP_ROW_CLASS_NAMES}>
              <Form.Label className={LABEL_COL_CLASS_NAMES}>
                Requested date until
              </Form.Label>
              <Col>
                <Form.Control
                  type="date"
                  min={props.MIN_ISO.split("T")[0]}
                  max={props.MAX_ISO.split("T")[0]}
                  value={props.filterObj["untilFilter"].split("T")[0]}
                  onBlur={(event) => {
                    event.target.value = props.parseDate(
                      event.target.value,
                      true
                    );
                    props.handleFilter(
                      undefined,
                      undefined,
                      undefined,
                      event.target.value
                    );
                  }}
                  onChange={(event) => {
                    event.target.value = props.parseDate(event.target.value);
                    props.handleFilter(
                      undefined,
                      undefined,
                      undefined,
                      event.target.value
                    );
                  }}
                ></Form.Control>
              </Col>
            </Form.Group>
            <Form.Group className={FORM_GROUP_ROW_CLASS_NAMES}>
              <Form.Label className={LABEL_COL_CLASS_NAMES}>Status</Form.Label>
              <Col>
                <Form.Select
                  onChange={(event) => {
                    props.handleFilter(
                      undefined,
                      undefined,
                      undefined,
                      undefined,
                      event.target.value
                    );
                  }}
                  defaultValue={"pending"}
                >
                  <option value="">No filter</option>
                  <option value="pending">Pending</option>
                  <option value="allowed">Allowed</option>
                  <option value="denied">Denied</option>
                </Form.Select>
              </Col>
            </Form.Group>
            <Button type="submit" className="d-none">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AccessRequestsFilter;
