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

import { Button, Col, Modal, Row } from "react-bootstrap";
import { fetchJson } from "../../../utils/utils";
import { showMessage } from "../../messages/usage";
import { AccessRequest } from "../../../models/submissionsAndRequests";
import { useState } from "react";

const ARS_URL = process.env.REACT_APP_ARS_URL;

interface AccessRequestModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string | undefined;
  handleClose: any;
  handleShow: any;
  accessRequest: AccessRequest | undefined;
  onUpdate: any;
}

const COL_CLASSES = "col-xs-5 col-md-4";
const ROW_CLASSES = "mb-3";

//
const AccessRequestModal = (props: AccessRequestModalProps) => {
  const [disabledButtons, setDisabledButtons] = useState(false);

  async function handleButtonClickAccess(status: "allowed" | "denied") {
    if (props.accessRequest === undefined || props.userId === undefined) {
      return null;
    }
    setDisabledButtons(true);
    const url = `${ARS_URL}/access-requests/${props.accessRequest?.id}`;
    try {
      const response = await fetchJson(url, "PATCH", { status: status });
      if (response.ok) {
        showMessage({
          type: "success",
          title: "Access successfully " + status + "!",
        });
        props.accessRequest.status = status;
        props.accessRequest.status_changed = new Date().toISOString();
        props.accessRequest.changed_by = props.userId;
        props.onUpdate();
      } else throw new Error("PATCH failed: " + response.text);
    } catch (error) {
      console.log(error);
      setDisabledButtons(false);
      showMessage({
        type: "error",
        title: "Could not change status of request.",
      });
    }
  }

  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [status, setStatus] = useState<"allowed" | "denied">("denied");

  const ConfirmationModal = () => {
    return (
      <Modal
        show={showConfirmation && props.show}
        onHide={() => setShowConfirmation(false)}
        centered
      >
        <Modal.Header>
          <Modal.Title>Confirm access request {status}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Confirm changing current access request status to {status}
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button
            variant="dark-3"
            onClick={() => {
              setShowConfirmation(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant={"quinary"}
            className="text-white"
            onClick={() => {
              handleButtonClickAccess(status);
              setDisabledButtons(true);
              setShowConfirmation(false);
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Access Request Detail</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row className={ROW_CLASSES}>
            <Col className={COL_CLASSES}>Requester:</Col>
            <Col>{props.accessRequest?.full_user_name}</Col>
          </Row>
          <Row className={ROW_CLASSES}>
            <Col className={COL_CLASSES}>Contact e-Mail:</Col>
            <Col>{props.accessRequest?.email}</Col>
          </Row>
          <Row className={ROW_CLASSES}>
            <Col className={COL_CLASSES}>Request Text:</Col>
            <Col>{props.accessRequest?.request_text}</Col>
          </Row>
          <Row className={ROW_CLASSES}>
            <Col>
              Request has been made on{" "}
              {props.accessRequest?.request_created.split("T")[0]}
            </Col>
          </Row>
          <Row className={ROW_CLASSES}>
            <Col>
              Access has been requested from{" "}
              {props.accessRequest?.access_starts.split("T")[0]}
              &nbsp;until {props.accessRequest?.access_ends.split("T")[0]}{" "}
            </Col>
          </Row>
          <Row className={ROW_CLASSES}>
            <Col>
              {props.accessRequest?.status_changed
                ? "Access has been " +
                  props.accessRequest?.status +
                  " on " +
                  props.accessRequest?.status_changed.split("T")[0]
                : "Access request is pending"}
            </Col>
          </Row>
        </Modal.Body>

        {props.accessRequest?.status === "pending" ? (
          <Modal.Footer className="d-block text-end">
            <Button
              variant="dark-3"
              className="text-white me-3 float-start"
              onClick={() => props.setShow(false)}
              disabled={disabledButtons}
            >
              Cancel
            </Button>
            <Button
              variant="secondary"
              className="text-white me-3"
              onClick={() => {
                setShowConfirmation(true);
                setStatus("denied");
              }}
              disabled={disabledButtons}
            >
              Deny
            </Button>
            <Button
              variant="quaternary"
              onClick={() => {
                setShowConfirmation(true);
                setStatus("allowed");
              }}
              disabled={disabledButtons}
            >
              Allow
            </Button>
          </Modal.Footer>
        ) : (
          <></>
        )}
      </Modal>
      <ConfirmationModal />
    </>
  );
};

export default AccessRequestModal;
