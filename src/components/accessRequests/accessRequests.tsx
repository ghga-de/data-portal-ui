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
import AccessRequestModal from "./accessRequestModal";

const API_URL = process.env.REACT_APP_SVC_API_URL;
const TD_CLASSES = "ps-1 pe-1 pe-lg-3 border";

const AccessRequests = () => {
  const [requests, setRequests] = useState<accessRequest[] | null | undefined>(
    undefined
  );
  const { showMessage } = useMessages();
  const { user } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState("");
  const [requester, setRequester] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [requested, setRequested] = useState("");
  const [accessStart, setAccessStart] = useState("");
  const [accessEnd, setAccessEnd] = useState("");

  const handleCloseModal = () => {
    setId("");
    setRequester("");
    setEmail("");
    setText("");
    setRequested("");
    setAccessStart("");
    setAccessEnd("");
    setShowModal(false);
  };
  const handleShowModal = (
    accessId: string,
    accessRequester: string,
    requesterEmail: string,
    requestText: string,
    dateRequested: string,
    accessStartDate: string,
    accessEndDate: string
  ) => {
    setId(accessId);
    setRequester(accessRequester);
    setEmail(requesterEmail);
    setText(requestText);
    setRequested(dateRequested);
    setAccessStart(accessStartDate);
    setAccessEnd(accessEndDate);
    setShowModal(true);
  };

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
            handleClose={handleCloseModal}
            handleShow={handleShowModal}
            id={id}
            requester={requester}
            email={email}
            text={text}
            requested={requested}
            accessStart={accessStart}
            accessEnd={accessEnd}
          />
          <h3 style={{ margin: "1em 0" }}>Access Requests Management</h3>
          <table className="w-lg-100" style={{ minWidth: "800px" }}>
            <thead className="border-light-3 border-1 bg-secondary text-white px-2">
              <tr>
                <td className={TD_CLASSES}>Data Request ID</td>
                <td className={TD_CLASSES}>Dataset</td>
                <td className={TD_CLASSES}>User</td>
                <td className={TD_CLASSES}>Starts</td>
                <td className={TD_CLASSES}>Ends</td>
                <td className={TD_CLASSES}>Requested</td>
                <td className={TD_CLASSES}>Status</td>
              </tr>
            </thead>
            {requests.map((x: accessRequest) => {
              return (
                <tr
                  role="button"
                  title={"View access request " + x.id}
                  id={x.id}
                  onClick={() =>
                    handleShowModal(
                      x.id,
                      x.full_user_name,
                      x.email,
                      x.request_text,
                      x.request_created,
                      x.access_starts,
                      x.access_ends
                    )
                  }
                >
                  <td className={TD_CLASSES}>{x.id}</td>
                  <td className={TD_CLASSES}>{x.dataset_id}</td>
                  <td className={TD_CLASSES}>{x.full_user_name}</td>
                  <td className={TD_CLASSES}>
                    {x.access_starts.split("T")[0]}
                  </td>
                  <td className={TD_CLASSES}>{x.access_ends.split("T")[0]}</td>
                  <td className={TD_CLASSES}>
                    {x.request_created.split("T")[0]}
                  </td>
                  <td className={TD_CLASSES}>{x.status}</td>
                </tr>
              );
            })}
          </table>
        </Col>
      </Row>
    </Container>
  );
};

export default AccessRequests;
