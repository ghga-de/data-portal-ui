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

import { Row, Col } from "react-bootstrap";

interface DataSetDetailsLayoutProps {
  icon: JSX.Element;
  content: any;
}

/** Standard layout component for the information displayed in the Dataset summary. */
const DatasetDetailsLayout = (props: DataSetDetailsLayoutProps) => {
  return (
    <Col className="me-2 pb-4 mt-2" style={{ minHeight: "100px" }}>
      <Row className="w-100 flex-nowrap">
        <Col xs={"auto"} className="pe-2 pt-2 fs-1 text-muted">
          {props.icon}
        </Col>
        <Col className="">{props.content}</Col>
      </Row>
    </Col>
  );
};

export default DatasetDetailsLayout;
