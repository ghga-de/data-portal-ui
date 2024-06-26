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

import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row } from "react-bootstrap";
import { useAuth } from "../services/auth";
import { AccessRequest } from "../models/submissionsAndRequests";
import { useEffect, useState } from "react";
import { ARS_URL, fetchJson } from "./utils";
import { useMessages } from "../components/messages/usage";
import { useNavigate } from "react-router-dom";

interface RequestAccessButtonProps {
  accession: string;
  handleOpen: () => void;
  classes?: string;
}

const RequestAccessButton = (props: RequestAccessButtonProps) => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<AccessRequest[] | null | undefined>(
    undefined
  );
  const [pendingRequests, setPendingRequests] = useState<
    AccessRequest[] | null | undefined
  >(undefined);
  const [allowedRequests, setAllowedRequests] = useState<
    AccessRequest[] | null | undefined
  >(undefined);

  const navigate = useNavigate();

  const { showMessage } = useMessages();

  useEffect(() => {
    async function fetchData() {
      let accessRequests: AccessRequest[] | null = null;
      if (user?.id) {
        const url = new URL(
          `access-requests?dataset_id=${props.accession}&user_id=${user.id}`,
          ARS_URL
        );
        try {
          const response = await fetchJson(url, "GET");
          if (response.ok) {
            accessRequests = await response.json();
            setPendingRequests(
              accessRequests?.filter(
                (x) =>
                  x.dataset_id === props.accession &&
                  x.user_id === user.id &&
                  x.status === "pending" &&
                  Date.now() <= Date.parse(x.access_ends)
              )
            );
            setAllowedRequests(
              accessRequests?.filter(
                (x) =>
                  x.dataset_id === props.accession &&
                  x.user_id === user.id &&
                  x.status === "allowed" &&
                  Date.now() <= Date.parse(x.access_ends)
              )
            );
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
  }, [props.accession, requests, user, showMessage]);

  return (
    <Button
      className={"fs-7 mb-3 shadow-md-dark " + props.classes}
      variant="quinary"
      onClick={() => {
        allowedRequests && allowedRequests?.length > 0
          ? navigate("/work-package")
          : props.handleOpen();
      }}
      style={{ width: "115px" }}
      title="Request access"
      disabled={
        pendingRequests !== undefined &&
        pendingRequests !== null &&
        pendingRequests.length > 0
      }
    >
      <Row className="p-0 m-0 align-items-center text-start flex-nowrap">
        <Col className="p-0 m-0 col-3 ">
          <FontAwesomeIcon icon={faKey} />
        </Col>
        <Col className="p-0 m-0 lh-1">
          <strong>
            {pendingRequests && pendingRequests?.length > 0
              ? "Access Request Pending"
              : allowedRequests && allowedRequests?.length > 0
              ? "Create Download Token"
              : "Request Access"}
          </strong>
        </Col>
      </Row>
    </Button>
  );
};

export default RequestAccessButton;
