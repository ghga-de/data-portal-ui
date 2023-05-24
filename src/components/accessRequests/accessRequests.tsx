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

const API_URL = process.env.REACT_APP_SVC_API_URL;

const AccessRequests = () => {
  const [requests, setRequests] = useState<AccessRequest[] | null | undefined>(
    undefined
  );

  const { showMessage } = useMessages();
  const { user } = useAuth();

  useEffect(() => {
    async function fetchData() {
      let requests: AccessRequest[] | null = null;
      if (user?.id) {
        const url = `${API_URL}/access-requests`;
        try {
          const response = await fetchJson(url);
          if (response.ok) {
            requests = await response.json();
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
      setRequests(requests);
    }
    fetchData();
  }, [showMessage, user]);

  if (requests === undefined) {
    return (
      <Container className="p-4">
        Loading access requests...{" "}
        <Spinner className="ms-4" animation="border" />
      </Container>
    );
  }

  if (!user) {
    return (
      <Container className="p-4">
        <Alert variant="danger">
          Please log in to manage inbound access requests.
        </Alert>
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
          <AccessRequestsList
            requests={requests}
            setRequests={setRequests}
            user={user}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default AccessRequests;
