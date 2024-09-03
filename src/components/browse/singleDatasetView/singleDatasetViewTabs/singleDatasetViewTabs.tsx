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

import {
  faBookOpen,
  faBook,
  faUsersRays,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import { DatasetEmbeddedModel } from "../../../../models/dataset";
import DapTabContents from "./dapTabContents";
import PublicationTabContents from "./publicationTabContents";
import StudyTabContents from "./studyTabContents";

interface SingleDatasetViewTabsProps {
  details: DatasetEmbeddedModel;
}

/** Tab navigations (buttons) on the dataset details page. */
const SingleDatasetViewTabs = (props: SingleDatasetViewTabsProps) => {
  const tabPillClasses =
    "border border-1 mx-0 mx-md-2 border-light-3 text-center d-flex align-items-center justify-content-center";
  const tabPillStyle = { width: "150px", borderRadius: "10px" };
  const iconStyle = {
    width: "15px",
    height: "15px",
    backgroundColor: "rgba(214,95,48,0.2)",
    padding: "4px",
  };

  return (
    <div className="mx-auto w-100 mb-5">
      <Tab.Container defaultActiveKey="0">
        <Nav variant="pills" className="justify-content-center mb-2 w-100 mx-0">
          <Row className="justify-content-center">
            <Col xs={6} md={"auto"} className="px-0">
              <Nav.Item className="float-end">
                <Nav.Link
                  eventKey="0"
                  className={tabPillClasses}
                  style={tabPillStyle}
                >
                  <FontAwesomeIcon
                    icon={faBook}
                    className="text-secondary me-2 rounded"
                    style={iconStyle}
                  />
                  Study
                </Nav.Link>
              </Nav.Item>
            </Col>
            <Col xs={6} md={"auto"} className="px-0">
              <Nav.Item className="float-end">
                <Nav.Link
                  eventKey="2"
                  className={tabPillClasses}
                  style={tabPillStyle}
                >
                  <FontAwesomeIcon
                    icon={faBookOpen}
                    className="text-secondary me-2 rounded"
                    style={iconStyle}
                  />
                  Publications
                </Nav.Link>
              </Nav.Item>
            </Col>
            <Col xs={6} md={"auto"} className="px-0">
              <Nav.Item>
                <Nav.Link
                  eventKey="3"
                  className={tabPillClasses}
                  style={tabPillStyle}
                >
                  <FontAwesomeIcon
                    icon={faUsersRays}
                    className="text-secondary me-2 rounded"
                    style={iconStyle}
                    transform="grow-7"
                  />
                  DAP/DAC
                </Nav.Link>
              </Nav.Item>
            </Col>
          </Row>
        </Nav>
        <div
          className="mx-auto w-100 mb-5 border border-1 border-light-3 p-3 shadow-sm"
          style={{ borderRadius: "20px" }}
        >
          <Tab.Content className="mb-4" style={{ height: "450px" }}>
            <StudyTabContents details={props.details} />
            <PublicationTabContents details={props.details} />
            <DapTabContents details={props.details} />
          </Tab.Content>
        </div>
      </Tab.Container>
    </div>
  );
};

export default SingleDatasetViewTabs;
