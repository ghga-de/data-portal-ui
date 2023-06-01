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
//

import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row } from "react-bootstrap";

interface RequestAccessButtonProps {
  handleOpen: () => void;
  classes?: string;
}

const RequestAccessButton = (props: RequestAccessButtonProps) => {
  return (
    <Button
      className={"fs-7 mb-3 text-white shadow-md-dark " + props.classes}
      variant="secondary"
      onClick={() => props.handleOpen()}
      style={{ width: "115px" }}
      title="Request access"
    >
      <Row className="p-0 m-0 align-items-center text-start">
        <Col className="p-0 m-0 col-3 ">
          <FontAwesomeIcon icon={faKey} />
        </Col>
        <Col className="p-0 m-0 lh-1">
          <strong>Request Access</strong>
        </Col>
      </Row>
    </Button>
  );
};

export default RequestAccessButton;
