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

import {
  Alert,
  Col,
  Container,
  Row,
  Form,
  Spinner,
  Button,
} from "react-bootstrap";
import { AccessRequest } from "../../models/submissionsAndRequests";
import { useMessages } from "../messages/usage";
import { useAuth } from "../../services/auth";
import { useEffect, useState } from "react";
import { fetchJson } from "../../utils/utils";
import AccessRequestsList from "./accessRequestsList/accessRequestsList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const API_URL = process.env.REACT_APP_SVC_API_URL;

const AccessRequests = () => {
  const MIN_YEAR = 2000;
  const MAX_YEAR = 2199;
  const [requests, setRequests] = useState<AccessRequest[] | null | undefined>(
    undefined
  );
  const { showMessage } = useMessages();
  const { user } = useAuth();

  const [filteredRequests, setFilteredRequests] = useState<
    AccessRequest[] | null
  >(null);

  const [datasetFilter, setDatasetFilter] = useState<string>("");
  const [userFilter, setUserFilter] = useState<string>("");
  const [fromFilter, setFromFilter] = useState<string>("");
  const [untilFilter, setUntilFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("pending");

  function handleFilter(
    dataset?: string,
    user?: string,
    from?: string,
    until?: string,
    status?: string
  ) {
    console.log(dataset, user, from, until, status);

    if (requests) {
      let datasetString: string =
        dataset !== undefined ? dataset : datasetFilter;
      let userString: string = user !== undefined ? user : userFilter;
      let fromString: string = from !== undefined ? from : fromFilter;
      let untilString: string = until !== undefined ? until : untilFilter;
      let statusString: string = status !== undefined ? status : statusFilter;

      let fromDate = Date.parse(fromString);
      if (
        fromDate < Date.parse(MIN_YEAR + "-01-01T00:00:00.000Z") ||
        !fromString
      )
        fromDate = Date.parse(MIN_YEAR + "-01-01T00:00:00.000Z");

      let untilDate = Date.parse(untilString);
      if (
        untilDate > Date.parse(MAX_YEAR + "-12-31T23:59:59.999Z") ||
        !untilString
      )
        untilDate = Date.parse(MAX_YEAR + "-12-31T23:59:59.999Z");

      setDatasetFilter(datasetString);
      setUserFilter(userString);
      setFromFilter(fromString);
      setUntilFilter(untilString);
      setStatusFilter(statusString);

      setFilteredRequests(
        requests.filter(
          (x) =>
            x.dataset_id.toLowerCase().includes(datasetString.toLowerCase()) &&
            x.full_user_name.toLowerCase().includes(userString.toLowerCase()) &&
            Date.parse(x.request_created) > fromDate &&
            Date.parse(x.request_created) < untilDate &&
            x.status.toLowerCase().includes(statusString.toLowerCase())
        )
      );
    }
  }

  useEffect(() => {
    async function fetchData() {
      let accessRequests: AccessRequest[] | null = null;
      if (user?.id) {
        const url = `${API_URL}/access-requests`;
        try {
          const response = await fetchJson(url);
          if (response.ok) {
            accessRequests = await response.json();
          } else {
            throw new Error(
              "Failed to retrieve access requests: " + response.text
            );
          }
        } catch (error) {
          showMessage({
            type: "error",
            title: "Cannot retrieve your access requests.",
          });
        }
      }
      if (accessRequests !== null) {
        setRequests(accessRequests);
        if (!filteredRequests)
          setFilteredRequests(
            accessRequests.filter((x) => x.status === "pending")
          );
      }
    }
    if (requests === null || requests === undefined) fetchData();
  }, [filteredRequests, requests, showMessage, user]);

  if (!user) {
    return (
      <Container className="p-4">
        <Alert variant="danger">
          Please log in to manage inbound access requests.
        </Alert>
      </Container>
    );
  }

  if (requests === undefined) {
    return (
      <Container className="p-4">
        Loading access requests...{" "}
        <Spinner className="ms-4" animation="border" />
      </Container>
    );
  }

  if (requests === null) {
    return (
      <Container className="p-4">
        <Alert variant="danger">Access requests could not be loaded.</Alert>
      </Container>
    );
  }

  const FORM_GROUP_ROW_CLASS_NAMES = "row mb-3";
  const LABEL_COL_CLASS_NAMES = "col-4 col-form-label";

  function parseDate(value: string) {
    if (
      parseInt(value.split("-")[0]) < MIN_YEAR &&
      parseInt(value.split("-")[0]) > 999
    )
      value = MIN_YEAR.toString() + "-" + value.split("-").slice(1).join("-");

    if (parseInt(value.split("-")[0]) > MAX_YEAR)
      value = MAX_YEAR.toString() + "-" + value.split("-").slice(1).join("-");
    return value;
  }

  return (
    <Container className="pb-4">
      <Row>
        <Col className="overflow-auto">
          <h3 style={{ margin: "1em 0" }}>Access Requests Management</h3>
          <Container className="mb-4 border rounded shadow p-2 mx-0 w-50">
            <Row>
              <Col className="fs-1" xs={"auto"}>
                <FontAwesomeIcon icon={faFilter} />
              </Col>
              <Col>
                <Form
                  onSubmit={(e) => {
                    handleFilter();
                    e.preventDefault();
                  }}
                >
                  <Form.Group className={FORM_GROUP_ROW_CLASS_NAMES}>
                    <Form.Label className={LABEL_COL_CLASS_NAMES}>
                      Dataset
                    </Form.Label>
                    <Col>
                      <Form.Control
                        type="text"
                        onChange={(event) => {
                          handleFilter(event.target.value);
                        }}
                      ></Form.Control>
                    </Col>
                  </Form.Group>
                  <Form.Group className={FORM_GROUP_ROW_CLASS_NAMES}>
                    <Form.Label className={LABEL_COL_CLASS_NAMES}>
                      User
                    </Form.Label>
                    <Col>
                      <Form.Control
                        type="text"
                        onChange={(event) => {
                          handleFilter(undefined, event.target.value);
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
                        min={MIN_YEAR + "-01-01"}
                        max={new Date().toISOString().split("T")[0]}
                        onChange={(event) => {
                          event.target.value = parseDate(event.target.value);
                          handleFilter(
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
                        min={MIN_YEAR + "-01-01"}
                        max={MAX_YEAR + "-12-31"}
                        onChange={(event) => {
                          event.target.value = parseDate(event.target.value);
                          handleFilter(
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
                    <Form.Label className={LABEL_COL_CLASS_NAMES}>
                      Status
                    </Form.Label>
                    <Col>
                      <Form.Select
                        onChange={(event) => {
                          handleFilter(
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
          <AccessRequestsList
            requests={filteredRequests ? filteredRequests : []}
            user={user}
            setRequests={filteredRequests ? setFilteredRequests : []}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default AccessRequests;
