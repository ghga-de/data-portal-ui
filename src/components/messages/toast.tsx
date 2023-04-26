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

import { CSSProperties, useState } from "react";
import Toast from "react-bootstrap/Toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMessages } from "./usage";
import { MessageType, messageStyles } from "./styles";

const DEFAULT_DELAY = 5000; // 5 seconds

export type ToastMessageProps = {
  id?: number;
  type?: MessageType;
  title?: string;
  detail?: string;
  delay?: number;
};

// toast that is used by the system wide message container
// (but can also be used inside a component on any page)

export const ToastMessage = (props: ToastMessageProps) => {
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
  const { icon, iconClass, bg } = messageStyle;

  let { delay } = props;
  if (delay === undefined) {
    // 0 or null can be used for sticky toasts (no autohide)
    delay = DEFAULT_DELAY;
  }
  const autohide = !!delay;

  const body = props.detail ? (
    <Toast.Body className="text-white">{props.detail}</Toast.Body>
  ) : null;
  const headerStyle: CSSProperties = {};
  if (!body) {
    // without body, the header should be rounded at the bottom as well
    headerStyle.borderRadius =
      "calc(var(--bs-toast-border-radius) - var(--bs-toast-border-width))";
  }

  return (
    <Toast
      show={show}
      onClose={handleClose}
      bg={bg}
      autohide={autohide}
      delay={delay}
    >
      <Toast.Header style={headerStyle}>
        <FontAwesomeIcon
          icon={icon}
          size="2x"
          className={iconClass + " me-3"}
        />
        <strong className="ms-3 me-auto">{title}</strong>
      </Toast.Header>
      {body}
    </Toast>
  );
};
