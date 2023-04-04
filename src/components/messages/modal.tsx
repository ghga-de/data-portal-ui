// Copyright 2021 - 2023 Universität Tübingen, DKFZ and EMBL
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

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMessages } from "./usage";
import { MessageType, messageStyles } from "./styles";

const Z_INDEX = 9999; // should be above toast messages

export type ModalMessageProps = {
  id?: number;
  type?: MessageType;
  title?: string;
  detail?: string;
  callback1?: () => void;
  label1?: string;
  callback2?: () => void;
  label2?: string;
};

// modal that is used by the system wide message container
// (but can also be used inside a component on any page)

export function ModalMessage(props: ModalMessageProps) {
  const [show, setShow] = useState(true);
  const { dismissMessage: dismiss } = useMessages();

  const handleClose = () => {
    setShow(false);
    if (props.id !== undefined) {
      dismiss(props.id);
    }
  };

  const messageStyle = messageStyles[props.type || "success"];
  const title = props.title || messageStyle.title;
  const { icon, iconClass } = messageStyle;

  const body = props.detail ? <Modal.Body>{props.detail}</Modal.Body> : null;
  const { callback1, callback2 } = props;
  const handleButton1 = () => {
    callback1 && callback1();
    handleClose();
  };
  const button1 = (
    <Button variant="primary" onClick={handleButton1}>
      {props.label1 || "OK"}
    </Button>
  );
  let button2 = null;
  if (callback2) {
    const handleButton2 = () => {
      callback2();
      handleClose();
    };
    button2 = (
      <Button variant="secondary" onClick={handleButton2}>
        {props.label2 || "Cancel"}
      </Button>
    );
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered={true}
      style={{ zIndex: Z_INDEX }}
    >
      <Modal.Header closeButton>
        <FontAwesomeIcon
          icon={icon}
          size="2x"
          className={iconClass + " me-3"}
        />
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      {body}
      <Modal.Footer>
        {button2}
        {button1}
      </Modal.Footer>
    </Modal>
  );
}
