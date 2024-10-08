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

import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { AUTH_URL, fetchJson } from "../../../utils/utils";
import { IVA, IVAState, IVAType } from "../../../models/ivas";

interface NewIVAModalProps {
  show: boolean;
  setShow: any;
  userId: string;
  newUserIVA: any;
}

const NewIVAModal = (props: NewIVAModalProps) => {
  const [promptText, setPromptText] = useState("");
  const [clickedButton, setClickedButton] = useState<IVAType | null>(null);
  const [disabledButton, setDisabledButton] = useState(true);

  const handleSubmit = async (value: string) => {
    setDisabledButton(true);
    let url = AUTH_URL;
    url = new URL(`users/${props.userId}/ivas`, url);
    let userData: { type: IVAType; value: string } = {
        type: clickedButton as unknown as IVAType,
        value: value,
      },
      method: string = "POST",
      ok: number = 201;
    const response = await fetchJson(url, method, userData).catch(() => null);
    if (response && response.status === ok) {
      try {
        const iva = await response.json();
        const id = iva.id;
        if (id) {
          const newIVA: IVA = {
            id,
            type: userData.type as unknown as IVAType,
            value: userData.value,
            changed: new Date().toISOString(),
            state: IVAState.Unverified,
          };
          props.newUserIVA(newIVA);
          setPromptText("");
          setClickedButton(null);
          props.setShow(false);
        }
      } catch {}
    }
    setDisabledButton(false);
    return;
  };

  return (
    <Modal
      show={props.show}
      onHide={() => {
        props.setShow(false);
        setClickedButton(null);
        setPromptText("");
      }}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>New contact address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-4">
          <p>Please select one of the following contact address types:</p>
          <Row>
            <Col>
              <Button
                className={clickedButton === IVAType.Phone ? "w-100" : "w-100"}
                variant={
                  clickedButton === IVAType.Phone
                    ? "quinary"
                    : "outline-quinary"
                }
                onClick={() => {
                  setClickedButton(IVAType.Phone);
                  setDisabledButton(false);
                  setPromptText("phone number to receive SMS messages");
                }}
              >
                SMS
              </Button>
            </Col>
            <Col>
              <Button
                className={
                  clickedButton === IVAType.PostalAddress ? "w-100" : "w-100"
                }
                variant={
                  clickedButton === IVAType.PostalAddress
                    ? "quinary"
                    : "outline-quinary"
                }
                onClick={() => {
                  setClickedButton(IVAType.PostalAddress);
                  setDisabledButton(false);
                  setPromptText("postal address");
                }}
              >
                Letter
              </Button>
            </Col>
            <Col>
              <Button
                className={
                  clickedButton === IVAType.InPerson ? "w-100" : "w-100"
                }
                variant={
                  clickedButton === IVAType.InPerson
                    ? "quinary"
                    : "outline-quinary"
                }
                onClick={() => {
                  setClickedButton(IVAType.InPerson);
                  setDisabledButton(false);
                  setPromptText("Where can we meet you?");
                }}
              >
                In-Person
              </Button>
            </Col>
          </Row>
        </div>
        {clickedButton !== null ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const target = e.target as HTMLFormElement;
              handleSubmit(target.iva.value);
            }}
          >
            <p>
              {clickedButton === IVAType.InPerson
                ? promptText
                : `Please enter your ${promptText}:`}
            </p>
            <input
              type={
                clickedButton === IVAType.Fax || clickedButton === IVAType.Phone
                  ? "tel"
                  : "text"
              }
              id="iva"
              name="iva"
              className="mb-4 w-100"
              required={true}
            />
            <p>
              <strong>
                In order to verify your address, you will need to request
                verification from your account page.
              </strong>
            </p>
            <div className="d-flex justify-content-between mt-4">
              <Col xs={5}>
                <Button
                  variant="quinary"
                  className="w-100 px-1"
                  type="submit"
                  disabled={disabledButton}
                >
                  <FontAwesomeIcon icon={faCheck} /> Add unverified contact
                  address
                </Button>
              </Col>

              <Col xs={2}>
                <Button
                  variant="dark-3"
                  className="text-white w-100"
                  onClick={() => {
                    props.setShow(false);
                    setClickedButton(null);
                    setPromptText("");
                  }}
                >
                  <FontAwesomeIcon icon={faX} /> Cancel
                </Button>
              </Col>
            </div>
          </form>
        ) : (
          <></>
        )}
        <div className="d-flex justify-content-between mt-3"></div>
      </Modal.Body>
    </Modal>
  );
};

export default NewIVAModal;
