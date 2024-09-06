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
  faUsersRays,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tab, Button, Row, Col } from "react-bootstrap";
import { DatasetEmbeddedModel } from "../../../../models/dataset";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";

interface DapTabContentsProps {
  details: DatasetEmbeddedModel;
}

/** Section at the top of dataset details page where the summary of dataset displayed. */
const DapTabContents = (props: DapTabContentsProps) => {
  function isValidHttpUrl(str: string) {
    let url;
    try {
      url = new URL(str);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }

  return (
    <Tab.Pane eventKey="3" className="h-100">
      {props.details.data_access_policy ? (
        <div className="text-break overflow-auto h-100">
          <PerfectScrollbar>
            {props.details.data_access_policy.policy_url &&
            isValidHttpUrl(props.details.data_access_policy.policy_url) ? (
              <Button
                href={props.details.data_access_policy.policy_url}
                target="_blank"
                variant="outline-quinary"
                className="float-end fs-7 py-2 mb-2 ms-4 me-3 shadow-md-dark"
              >
                <Row className="p-0 m-0 align-items-center text-start">
                  <Col xs={"auto"} className="ps-0 pe-1 m-0">
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                  </Col>
                  <Col className="px-0 m-0 lh-1">
                    <strong>Data Access Info Form</strong>
                  </Col>
                </Row>
              </Button>
            ) : (
              <></>
            )}
            <h5 className="mb-4 d-flex align-items-center">
              <FontAwesomeIcon
                icon={faUsersRays}
                pull="left"
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: "rgba(214,95,48,0.2)",
                  padding: "8px",
                }}
                className="text-secondary me-3 fs-4 rounded"
              />
              <strong>Policy and Data Access Committee</strong>
            </h5>
            {props.details.data_access_policy.data_access_committee.alias !==
            null ? (
              <p>
                <strong>Data Access Committee: </strong>
                {props.details.data_access_policy.data_access_committee.alias}
              </p>
            ) : (
              ""
            )}
            <p>
              <strong>e-Mail: </strong>
              {props.details.data_access_policy.data_access_committee.email}
            </p>
            <p>
              <strong>Data Access Policy: </strong>
              {props.details.data_access_policy.name}
            </p>
            <p>
              <strong>Policy: </strong>
              {props.details.data_access_policy.policy_text
                .split("\n")
                .map((x, idx) => (
                  <span key={"dap_policy_" + idx} className="fs-7">
                    {x}
                    <br />
                  </span>
                ))}
            </p>
          </PerfectScrollbar>
        </div>
      ) : (
        <>
          <h5 className="mb-4 d-flex align-items-center">
            <FontAwesomeIcon
              icon={faUsersRays}
              pull="left"
              style={{
                width: "30px",
                height: "30px",
                backgroundColor: "rgba(214,95,48,0.2)",
                padding: "8px",
              }}
              className="text-secondary me-3 fs-4 rounded"
            />
            <strong>Policy and Data Access Committee</strong>
          </h5>
          <p>No Data Access Policy or Data Access Committee found.</p>
        </>
      )}
    </Tab.Pane>
  );
};

export default DapTabContents;
