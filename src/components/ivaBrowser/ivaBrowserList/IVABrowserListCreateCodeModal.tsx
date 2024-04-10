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
import { EmbeddedIVA } from "../../../models/ivas";

interface IVABrowserListCreateCodeModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose: any;
  handleShow: any;
  selectedIVA: EmbeddedIVA | undefined;
  setSelectedIVA: any;
  ConfirmTransmissionModal: any;
  showConfirmTransmissionModal: boolean;
  setShowConfirmTransmissionModal: any;
  onUpdate: any;
}

//
const IVABrowserListCreateCodeModal = (
  props: IVABrowserListCreateCodeModalProps
) => {
  const [disabledButtons, setDisabledButtons] = useState(false);

  async function handleButtonConfirm() {
    if (props.selectedIVA === undefined) {
      return null;
    }
    setDisabledButtons(true);
    const url = new URL(`access-requests/${props.selectedIVA?.id}`, ARS_URL);
    try {
      const response = await fetchJson(url, "PATCH");
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
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              props.setShowConfirmTransmissionModal(true);
            }}
          >
            <p>Please send the following verification code to:</p>
            <p>
              Name: {props.selectedIVA?.user_name}
              <br />
              E-Mail: {props.selectedIVA?.user_email}
              <br />
              Via:{" "}
              {props.selectedIVA?.type
                .toString()
                .split(/(?=[A-Z])/)
                .join(" ")}
              <br />
              Address: {props.selectedIVA?.value}
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
              <Button
                className="ms-2 text-white"
                variant="warning"
                onClick={() => {
                  props.setShow(false);
                  props.setSelectedIVA(undefined);
                }}
              >
                Send later
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <props.ConfirmTransmissionModal />
    </>
  );
};

export default IVABrowserListCreateCodeModal;
