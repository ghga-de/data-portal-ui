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

import { Button, Form, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { AUTH_URL, fetchJson } from "../../../utils/utils";
import { showMessage } from "../../messages/usage";
import { useEffect, useState } from "react";
import { EmbeddedIVA, IVAStatus, IVATypePrintable } from "../../../models/ivas";

interface IVABrowserListCreateCodeModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  selectedIVA: EmbeddedIVA | undefined;
  setSelectedIVA: any;
  setShowConfirmTransmissionModal: any;
  onUpdate: any;
}

//
const IVABrowserListCreateCodeModal = (
  props: IVABrowserListCreateCodeModalProps
) => {
  const [disabledButtons, setDisabledButtons] = useState(false);
  const [code, setCode] = useState("");

  let { selectedIVA, show, onUpdate } = props;

  useEffect(() => {
    async function fetchData() {
      if (selectedIVA !== undefined && show === true) {
        setDisabledButtons(true);
        const url = new URL(
          `rpc/ivas/${selectedIVA?.id}/create-code`,
          AUTH_URL
        );
        let method = "POST",
          ok = 201;
        try {
          const response = await fetchJson(url, method);
          if (response && response.status === ok) {
            const code = await response.json();
            setCode(code);
            selectedIVA.status = IVAStatus.CodeCreated;
            onUpdate();
            setDisabledButtons(false);
          } else throw new Error("POST failed: " + response.text);
        } catch (error) {
          console.log(error);
          showMessage({
            type: "error",
            title: "Could not obtain verification code.",
          });
        }
      }
    }
    fetchData();
  }, [selectedIVA, show, onUpdate]);

  return (
    <>
      <Modal
        show={props.show}
        onHide={() => {
          props.setShow(false);
          props.setSelectedIVA(undefined);
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
              {props.selectedIVA
                ? IVATypePrintable[props.selectedIVA?.type]
                : ""}
              <br />
              Address: {props.selectedIVA?.value}
            </p>
            <div className="mb-3">
              <label htmlFor="verification_code">
                Verification code:&nbsp;
              </label>
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip>Code copied to clipboard</Tooltip>}
                trigger={"click"}
                rootClose={true}
              >
                <input
                  type="text"
                  readOnly
                  value={code}
                  className="text-center"
                  onClick={() => {
                    navigator.clipboard.writeText(code);
                  }}
                />
              </OverlayTrigger>
            </div>
            <div>
              <Button
                disabled={disabledButtons}
                type="submit"
                variant="quaternary"
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
                Close and send later
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default IVABrowserListCreateCodeModal;
