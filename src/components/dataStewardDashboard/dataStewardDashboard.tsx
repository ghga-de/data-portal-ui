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
import { accessRequest } from "../../models/submissionsAndRequests";
import { useMessages } from "../messages/usage";
import { useAuth } from "../../services/auth";
import { useEffect, useState } from "react";
import { fetchJson } from "../../utils/utils";

const API_URL = process.env.REACT_APP_SVC_API_URL;

const DataStewardDashboard = () => {
  const [requests, setRequests] = useState<accessRequest[] | null | undefined>(
    undefined
  );
  const { showMessage } = useMessages();
  const { user } = useAuth();

  useEffect(() => {
    async function fetchData() {
      let requests: accessRequest[] | null = null;
      console.log(`${API_URL}/access-requests`);
      if (user?.id) {
        const url = `${API_URL}/access-requests`;
        try {
          const response = await fetchJson(url);
          requests = await response.json();
        } catch (error) {
          showMessage({
            type: "error",
            title: "Cannot retrieve your datasets.",
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
        Loading datasets... <Spinner className="ms-4" animation="border" />
      </Container>
    );
  }

  if (!user) {
    return (
      <Container className="p-4">
        <Alert variant="danger">
          Please log in to prepare for downloading or uploading data.
        </Alert>
      </Container>
    );
  }

  if (requests === null) {
    return (
      <Container className="p-4">
        <Alert variant="danger">Datasets could not be loaded.</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Row>
        <Col>
          <h3 style={{ margin: "1em 0" }}>Data Steward Dashboard</h3>
          <table style={{ minWidth: "800px" }}>
            <thead className="border-light-3 border-1 bg-secondary text-white px-2">
              <tr>
                <td>Data Request ID</td>
                <td>Title</td>
                <td>Description</td>
              </tr>
            </thead>
          </table>
        </Col>
      </Row>
    </Container>
  );
};

export default DataStewardDashboard;
