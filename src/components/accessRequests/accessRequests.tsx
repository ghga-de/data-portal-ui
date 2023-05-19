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
import AccessRequestModal from "./accessRequestModal";

const API_URL = process.env.REACT_APP_SVC_API_URL;
const TD_CLASSES = "ps-1 pe-1 pe-lg-3 border";

const AccessRequests = () => {
  const [requests, setRequests] = useState<AccessRequest[] | null | undefined>(
    undefined
  );

  const { showMessage } = useMessages();
  const { user } = useAuth();

  const [selectedAccessRequest, setSelectedAccessRequest] = useState<
    AccessRequest | undefined
  >();

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setSelectedAccessRequest(undefined);
    setShowModal(false);
  };
  const handleShowModal = (accessRequest: AccessRequest) => {
    setSelectedAccessRequest(accessRequest);
    setShowModal(true);
  };

  function onUpdate() {
    if (requests) {
      setRequests([...requests]);
    }
    console.log("called");
  }

  useEffect(() => {
    async function fetchData() {
      let requests: AccessRequest[] | null = null;
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
          <AccessRequestModal
            show={showModal}
            setShow={setShowModal}
            userId={user.id}
            handleClose={handleCloseModal}
            handleShow={handleShowModal}
            accessRequest={selectedAccessRequest}
            setAccessRequests={setRequests}
            onUpdate={onUpdate}
          />
          <h3 style={{ margin: "1em 0" }}>Access Requests Management</h3>
          <table className="w-lg-100" style={{ minWidth: "800px" }}>
            <thead className="border-light-3 border-1 bg-secondary text-white px-2">
              <tr>
                <th className={TD_CLASSES}>Dataset</th>
                <th className={TD_CLASSES}>User</th>
                <th className={TD_CLASSES}>Starts</th>
                <th className={TD_CLASSES}>Ends</th>
                <th className={TD_CLASSES}>Requested</th>
                <th className={TD_CLASSES}>Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request: AccessRequest) => {
                return (
                  <tr
                    role="button"
                    title={"View access request " + request.id}
                    className={
                      request.status === "allowed"
                        ? "text-success"
                        : request.status === "denied"
                        ? "text-danger"
                        : ""
                    }
                    key={request.id}
                    onClick={() => handleShowModal(request)}
                  >
                    <td className={TD_CLASSES}>{request.dataset_id}</td>
                    <td className={TD_CLASSES}>{request.full_user_name}</td>
                    <td className={TD_CLASSES}>
                      {request.access_starts.split("T")[0]}
                    </td>
                    <td className={TD_CLASSES}>
                      {request.access_ends.split("T")[0]}
                    </td>
                    <td className={TD_CLASSES}>
                      {request.request_created.split("T")[0]}
                    </td>
                    <td className={TD_CLASSES}>{request.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Col>
      </Row>
    </Container>
  );
};

export default AccessRequests;
