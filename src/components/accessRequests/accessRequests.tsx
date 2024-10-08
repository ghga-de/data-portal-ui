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
//

import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import { AccessRequest } from "../../models/submissionsAndRequests";
import { useMessages } from "../messages/usage";
import { useAuth } from "../../services/auth";
import { useEffect, useState } from "react";
import {
  ARS_URL,
  FILTER_MAX_ISO,
  FILTER_MIN_ISO,
  fetchJson,
} from "../../utils/utils";
import AccessRequestsList from "./accessRequestsList/accessRequestsList";
import AccessRequestsFilter from "./accessRequestsFilter/accessRequestsFilter";

const AccessRequests = () => {
  const [requests, setRequests] = useState<AccessRequest[] | null | undefined>(
    undefined
  );
  const { showMessage } = useMessages();
  const { user } = useAuth();

  let filteredRequests: AccessRequest[] | undefined = undefined;

  const [filterObj, setFilterObj] = useState({
    datasetFilter: "",
    userFilter: "",
    fromFilter: FILTER_MIN_ISO,
    untilFilter: FILTER_MAX_ISO,
    statusFilter: "pending",
  });

  function handleFilter(
    dataset?: string,
    user?: string,
    from?: string,
    until?: string,
    status?: string
  ) {
    if (requests) {
      let datasetString: string =
        dataset !== undefined ? dataset : filterObj["datasetFilter"];
      let userString: string =
        user !== undefined ? user : filterObj["userFilter"];
      let fromString: string =
        from !== undefined ? from : filterObj["fromFilter"];
      let untilString: string =
        until !== undefined ? until : filterObj["untilFilter"];
      let statusString: string =
        status !== undefined ? status : filterObj["statusFilter"];

      let fromDate = Date.parse(fromString);
      if (fromDate < Date.parse(FILTER_MIN_ISO) || !fromString)
        fromDate = Date.parse(FILTER_MIN_ISO);

      let untilDate = Date.parse(untilString);
      if (untilDate > Date.parse(FILTER_MAX_ISO) || !untilString)
        untilDate = Date.parse(FILTER_MAX_ISO);

      setFilterObj({
        datasetFilter: datasetString,
        userFilter: userString,
        fromFilter: fromString,
        untilFilter: untilString,
        statusFilter: statusString,
      });
    }
  }

  function onUpdate() {
    if (filteredRequests) {
      filteredRequests = [...filteredRequests];
    }
  }

  useEffect(() => {
    async function fetchData() {
      let accessRequests: AccessRequest[] | null = null;
      const url = new URL("access-requests", ARS_URL);
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
      setRequests(accessRequests);
    }
    if (requests === undefined && user?.id) fetchData();
  }, [requests, showMessage, user]);

  filteredRequests = requests?.filter(
    (x) =>
      x.dataset_id
        .toLowerCase()
        .includes(filterObj["datasetFilter"].toLowerCase()) &&
      x.full_user_name
        .toLowerCase()
        .includes(filterObj["userFilter"].toLowerCase()) &&
      (filterObj["fromFilter"] === "" ||
        Date.parse(x.request_created) > Date.parse(filterObj["fromFilter"])) &&
      (filterObj["untilFilter"] === "" ||
        Date.parse(x.request_created) < Date.parse(filterObj["untilFilter"])) &&
      x.status.toLowerCase().includes(filterObj["statusFilter"].toLowerCase())
  );

  if (user?.role !== "data_steward") {
    return (
      <Container className="p-4">
        <Alert variant="danger">
          Please log in as a data steward to manage inbound access requests.
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

  return (
    <Container className="pb-4">
      <Row>
        <Col className="overflow-auto">
          <h3 style={{ margin: "1em 0" }}>Access Requests Management</h3>
          <AccessRequestsFilter
            handleFilter={handleFilter}
            filterObj={filterObj}
          />
          <AccessRequestsList
            requests={filteredRequests ? filteredRequests : []}
            user={user}
            onUpdate={onUpdate}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default AccessRequests;
