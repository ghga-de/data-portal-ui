// Copyright 2021 - 2024 Universität Tübingen, DKFZ and EMBL
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

import { Button, Modal } from "react-bootstrap";
import { UserWithIVA, IVAState, IVATypePrintable } from "../../../models/ivas";
import { useState } from "react";
import { AUTH_URL, fetchJson } from "../../../utils/utils";
import { useMessages } from "../../messages/usage";

interface IvaManagerListConfirmTransmissionModalProps {
  show: boolean;
  setShow: any;
  setShowCreateCodeModal: any;
  selectedIVA: UserWithIVA | undefined;
  setSelectedIVA: any;
  onUpdate: any;
}

const IvaManagerListConfirmTransmissionModal = (
  props: IvaManagerListConfirmTransmissionModalProps
) => {
  const [disabledButtons, setDisabledButtons] = useState(false);
  const { showMessage } = useMessages();

  async function handleTransmitted() {
    if (props.selectedIVA !== undefined) {
      setDisabledButtons(true);
      let url = new URL(AUTH_URL);
      let method = "POST",
        ok = 204;
      url = new URL(`rpc/ivas/${props.selectedIVA.id}/code-transmitted`, url);
      try {
        const response = await fetchJson(url, method);
        if (response && response.status === ok) {
          showMessage({
            type: "success",
            title: "Transmission of code successfully confirmed!",
          });
          props.selectedIVA.state = IVAState.CodeTransmitted;
          props.onUpdate();
          props.setSelectedIVA(undefined);
          props.setShow(false);
          props.setShowCreateCodeModal(false);
          setDisabledButtons(false);
        } else throw new Error("POST failed: " + response.text);
      } catch (error) {
        console.error(error);
        setDisabledButtons(false);
        showMessage({
          type: "error",
          title:
            "Could not confirm transmission of code. Please try again later",
        });
      }
    }
  }
  return (
    <Modal
      show={props.show}
      onHide={() => {
        props.setShow(false);
        props.setSelectedIVA(undefined);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirm code transmission</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Please confirm the transmission of the verification code for the{" "}
          <em>
            {props.selectedIVA ? IVATypePrintable[props.selectedIVA.type] : ""}
          </em>{" "}
          IVA for user <em>{props.selectedIVA?.user_name}</em> with address{" "}
          <em>{props.selectedIVA?.value}</em>.
        </p>
        <div>
          <Button
            variant="warning"
            onClick={() => {
              handleTransmitted();
            }}
            disabled={disabledButtons}
            className="text-white"
          >
            Confirm transmission
          </Button>
          <Button
            variant="dark-3"
            className="ms-2 text-white"
            onClick={() => {
              props.setShow(false);
            }}
          >
            Cancel
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default IvaManagerListConfirmTransmissionModal;
