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
import { ARS_URL, fetchJson } from "../../../utils/utils";
import { showMessage } from "../../messages/usage";
import { AccessRequest } from "../../../models/submissionsAndRequests";
import { useState } from "react";
import {
  IVA,
  IVAState,
  IVAStatePrintable,
  IVAType,
  IVATypePrintable,
} from "../../../models/ivas";

interface AccessRequestModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string | undefined;
  handleClose: any;
  handleShow: any;
  accessRequest: AccessRequest | undefined;
  onUpdate: any;
  userIVAs: IVA[];
}

const COL_CLASSES = "col-xs-5 col-md-4";
const ROW_CLASSES = "mb-3";

//
const AccessRequestModal = (props: AccessRequestModalProps) => {
  const [disabledButtons, setDisabledButtons] = useState(false);
  const [selectedIVA, setSelectedIVA] = useState("");

  async function handleButtonClickAccess(status: "allowed" | "denied") {
    if (props.accessRequest === undefined || props.userId === undefined) {
      return null;
    }
    setDisabledButtons(true);
    const url = new URL(`access-requests/${props.accessRequest?.id}`, ARS_URL);
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
        props.accessRequest.iva_id = selectedIVA;
        props.onUpdate();
        setDisabledButtons(false);
      } else throw new Error("PATCH failed: " + response.text);
    } catch (error) {
      console.error(error);
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
        onHide={() => {
          setShowConfirmation(false);
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm access request {status}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Confirm changing current access request status to {status}
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button
            variant="dark-3"
            className="text-white"
            onClick={() => {
              setShowConfirmation(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="quaternary"
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

  let allowedIVA: IVA | undefined | null = null;
  if (props.accessRequest?.status === "allowed") {
    allowedIVA = props.userIVAs.find(
      (x: IVA) => x.id === props.accessRequest?.iva_id
    );
  }
  if (props.userIVAs.length === 1 && selectedIVA === "")
    setSelectedIVA(props.userIVAs[0].id);

  return (
    <>
      <Modal
        show={props.show}
        onHide={() => {
          setSelectedIVA("");
          props.handleClose();
        }}
        size="lg"
      >
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
          {props.accessRequest?.status === "pending" ? (
            <Row className={ROW_CLASSES}>
              <Col className="mt-3">
                {props.userIVAs.length > 0 ? (
                  <>
                    <p className="mt-2 fw-bold">
                      {props.userIVAs.length === 1
                        ? "Make sure the verification address specified by the user is correct:"
                        : "Please select the verification address that should be used to secure the access request:"}
                    </p>
                    {props.userIVAs.map((x: IVA) => {
                      return (
                        <div key={x.id}>
                          <Row className="mb-1 align-items-center">
                            <Col xs={"auto"} className="pe-0 me-0">
                              <input
                                type="radio"
                                className="me-2"
                                id={"iva_" + x.id}
                                name="ivas"
                                value={x.id}
                                onClick={() => setSelectedIVA(x.id)}
                                defaultChecked={
                                  props.userIVAs.length === 1 ? true : false
                                }
                              />
                            </Col>
                            <Col className="ps-0">
                              <label
                                htmlFor={"iva_" + x.id}
                                className={
                                  selectedIVA === x.id ||
                                  props.userIVAs.length === 1
                                    ? "fw-bold w-100"
                                    : "w-100"
                                }
                              >
                                <Row className="align-items-center">
                                  <Col xs={4}>{IVATypePrintable[x.type]}:</Col>
                                  <Col>{x.value}</Col>
                                </Row>
                              </label>
                            </Col>
                            <Col xs={3} className="">
                              <label
                                htmlFor={"iva_" + x.id}
                                className={
                                  x.state === IVAState.Verified
                                    ? "text-success"
                                    : "text-danger"
                                }
                              >
                                {IVAStatePrintable[x.state]}
                              </label>
                            </Col>
                          </Row>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  "No verification address have been entered by the user so far"
                )}
              </Col>
            </Row>
          ) : (
            <></>
          )}
          {props.accessRequest?.status === "allowed" && allowedIVA ? (
            <Row className={ROW_CLASSES}>
              <Col>
                Verification address used:
                <br />
                {IVAType[allowedIVA.type] + ": " + allowedIVA.value}{" "}
                <span
                  className={
                    allowedIVA.state === IVAState.Verified
                      ? "text-success"
                      : "text-secondary"
                  }
                >
                  ({IVAStatePrintable[allowedIVA.state]})
                </span>
              </Col>
            </Row>
          ) : props.accessRequest?.status === "allowed" &&
            allowedIVA === undefined ? (
            <>
              <span className="text-secondary fw-bold">
                Verification address used to approve this user's access request
                was not found
              </span>
            </>
          ) : (
            <></>
          )}
        </Modal.Body>

        {props.accessRequest?.status === "pending" ? (
          <Modal.Footer className="d-block text-start">
            <Button
              variant="dark-3"
              className="text-white ms-3 float-end"
              onClick={() => props.setShow(false)}
              disabled={disabledButtons}
            >
              Cancel
            </Button>
            <Button
              variant="success"
              className="text-white"
              onClick={() => {
                setShowConfirmation(true);
                setStatus("allowed");
              }}
              disabled={
                disabledButtons ||
                props.userIVAs.length === 0 ||
                selectedIVA === ""
              }
            >
              Allow
            </Button>
            <Button
              variant="danger"
              className="text-white ms-3"
              onClick={() => {
                setShowConfirmation(true);
                setStatus("denied");
              }}
              disabled={disabledButtons}
            >
              Deny
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
