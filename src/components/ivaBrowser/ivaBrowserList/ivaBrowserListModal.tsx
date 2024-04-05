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

import { Button, Form, Modal } from "react-bootstrap";
import { ARS_URL, fetchJson } from "../../../utils/utils";
import { showMessage } from "../../messages/usage";
import { useState } from "react";
import { IVA, IVAType } from "../../../models/ivas";
import { User } from "../../../services/auth";

interface AccessRequestModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
  handleClose: any;
  handleShow: any;
  iva: IVA | undefined;
  onUpdate: any;
}

//
const IVABrowserListModal = (props: AccessRequestModalProps) => {
  const [disabledButtons, setDisabledButtons] = useState(false);

  async function handleButtonConfirm() {
    if (props.iva === undefined || props.user.id === undefined) {
      return null;
    }
    setDisabledButtons(true);
    const url = new URL(`access-requests/${props.iva?.id}`, ARS_URL);
    try {
      const response = await fetchJson(url, "PATCH", { status: status });
      if (response.ok) {
        showMessage({
          type: "success",
          title: "IVA status changed",
        });
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
        onHide={() => {
          setShowConfirmation(false);
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm IVA verification code has been sent</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Confirm sending the verification code for the selected user's IVA
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
              handleButtonConfirm();
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
      <Modal
        show={props.show}
        onHide={() => {
          props.handleClose();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmation Code</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <p>Please send the following verification code to:</p>
            <p>
              Name: {props.user.full_name || props.user.name}
              <br />
              E-Mail: {props.user.email}
              <br />
              Via: {props.iva ? props.iva?.type : ""}
              <br />
              Address: {props.iva?.value}
            </p>
            <div className="mb-3">
              <label htmlFor="verification_code">
                Verification code:&nbsp;
              </label>
              <input type="text" name="verification_code" />
            </div>
            <div className="text-end">
              <Button
                disabled={disabledButtons}
                type="submit"
                variant="quinary"
              >
                Confirm transmission
              </Button>
              <Button className="ms-2 text-white" variant="gray">
                Send later
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <ConfirmationModal />
    </>
  );
};

export default IVABrowserListModal;
