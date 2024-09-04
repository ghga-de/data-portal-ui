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

interface RequestVerificationModalProps {
  show: boolean;
  setShow: any;
}

const RequestVerificationModal = (props: RequestVerificationModalProps) => {
  return (
    <Modal show={props.show} onHide={() => props.setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Verification Requested</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          We will send a verification code to the selected address. Please allow
          some time for processing your request. When the verification code has
          been transmitted, you will also be notified via e-mail.
        </p>
        <Button
          variant="quinary"
          className="float-end"
          onClick={() => props.setShow(false)}
        >
          Close
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default RequestVerificationModal;
