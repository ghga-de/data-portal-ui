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

import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import { AccessRequest } from "../../models/submissionsAndRequests";
import { useMessages } from "../messages/usage";
import { useAuth } from "../../services/auth";
import { useEffect, useState } from "react";
import { fetchJson } from "../../utils/utils";
import AccessRequestsList from "./accessRequestsList/accessRequestsList";
import AccessRequestsFilter from "./accessRequestsFilter/accessRequestsFilter";
import { urlWithEndSlash } from "../../api/browse";

const CLIENT_URL = new URL(urlWithEndSlash(process.env.REACT_APP_CLIENT_URL!))
const ARS_URL = new URL(urlWithEndSlash(process.env.REACT_APP_ARS_URL!), CLIENT_URL);

const AccessRequests = () => {
  const MIN_YEAR = 2000;
  const MAX_YEAR = 2199;
  const MIN_ISO: string = MIN_YEAR + "-01-01T00:00:00.000Z";
  const MAX_ISO: string = MAX_YEAR + "-12-31T23:59:59.999Z";

  const [requests, setRequests] = useState<AccessRequest[] | null | undefined>(
    undefined
  );
  const { showMessage } = useMessages();
  const { user } = useAuth();

  let filteredRequests: AccessRequest[] | undefined = undefined;

  const [filterObj, setFilterObj] = useState({
    datasetFilter: "",
    userFilter: "",
    fromFilter: MIN_ISO,
    untilFilter: MAX_ISO,
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
      if (fromDate < Date.parse(MIN_ISO) || !fromString)
        fromDate = Date.parse(MIN_ISO);

      let untilDate = Date.parse(untilString);
      if (untilDate > Date.parse(MAX_ISO) || !untilString)
        untilDate = Date.parse(MAX_ISO);

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
    console.log("update");
    if (filteredRequests) {
      filteredRequests = [...filteredRequests];
    }
  }

  useEffect(() => {
    async function fetchData() {
      let accessRequests: AccessRequest[] | null = null;
      if (user?.id) {
        const url = new URL('access-requests', ARS_URL);
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
      }
    }
    if (requests === null || requests === undefined) fetchData();
  }, [requests, showMessage, user]);

  filteredRequests = requests?.filter(
    (x) =>
      x.dataset_id
        .toLowerCase()
        .includes(filterObj["datasetFilter"].toLowerCase()) &&
      x.full_user_name
        .toLowerCase()
        .includes(filterObj["userFilter"].toLowerCase()) &&
      Date.parse(x.request_created) > Date.parse(filterObj["fromFilter"]) &&
      Date.parse(x.request_created) < Date.parse(filterObj["untilFilter"]) &&
      x.status.toLowerCase().includes(filterObj["statusFilter"].toLowerCase())
  );

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

  function parseDate(value: string, force: boolean = false) {
    if (
      Date.parse(value) < Date.parse(MIN_ISO) &&
      (Date.parse(value) > 999 || force)
    )
      value = MIN_YEAR.toString() + "-" + value.split("-").slice(1).join("-");

    if (Date.parse(value) > Date.parse(MAX_ISO))
      value = MAX_YEAR.toString() + "-" + value.split("-").slice(1).join("-");

    return value;
  }

  return (
    <Container className="pb-4">
      <Row>
        <Col className="overflow-auto">
          <h3 style={{ margin: "1em 0" }}>Access Requests Management</h3>
          <AccessRequestsFilter
            handleFilter={handleFilter}
            MIN_ISO={MIN_ISO}
            MAX_ISO={MAX_ISO}
            filterObj={filterObj}
            parseDate={parseDate}
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
