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
  faArrowUpRightFromSquare,
  faBookOpen,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tab, Button, Row, Col } from "react-bootstrap";
import { DatasetEmbeddedModel } from "../../../../models/dataset";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";

interface PublicationTabContentsProps {
  details: DatasetEmbeddedModel;
}

const PublicationTabContents = (props: PublicationTabContentsProps) => {
  const publications = props.details.study?.publications;

  return (
    <Tab.Pane eventKey="2" className="h-100">
      <PerfectScrollbar>
        {publications ? (
          <div>
            {publications.map((pub, idx) => {
              return (
                <div
                  key={pub.accession + "_pub"}
                  className={
                    idx < publications.length - 1
                      ? "text-break overflow-auto h-100 mb-5"
                      : "text-break overflow-auto h-100"
                  }
                >
                  {pub.doi !== null ? (
                    <Button
                      href={"https://doi.org/" + pub.doi}
                      target="_blank"
                      variant="outline-quinary"
                      className="float-end fs-7 py-2 mb-2 ms-4 me-3 shadow-md-dark"
                    >
                      <Row className="p-0 m-0 align-items-center text-start">
                        <Col xs={"auto"} className="ps-0 pe-1 m-0">
                          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                        </Col>
                        <Col className="px-0 m-0 lh-1">
                          <strong>View Publication</strong>
                        </Col>
                      </Row>
                    </Button>
                  ) : (
                    <></>
                  )}
                  <h5 className="mb-4 d-flex align-items-center">
                    <FontAwesomeIcon
                      icon={faBookOpen}
                      pull="left"
                      style={{
                        width: "30px",
                        height: "30px",
                        backgroundColor: "rgba(214,95,48,0.2)",
                        padding: "8px",
                      }}
                      className="text-secondary me-3 fs-4 rounded"
                    />
                    <strong>Publication</strong>
                  </h5>
                  <p>
                    <strong>Title: </strong>
                    {pub.title}
                  </p>
                  <p>
                    <strong>Author: </strong>
                    {pub.author}
                    <br />
                    <strong>Journal: </strong>
                    {pub.journal}
                    <br />
                    <strong>Year: </strong>
                    {pub.year}
                  </p>
                  <p>
                    <strong>Abstract: </strong>
                    {(pub.abstract || "").split("\n").map((x, idx) => (
                      <span key={"pub_abstract_" + idx}>
                        {x}
                        <br />
                      </span>
                    ))}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-2 fs-5 fw-bold">
            <FontAwesomeIcon icon={faCircleInfo} className="text-info" />
            &nbsp; No publications found.
          </div>
        )}
      </PerfectScrollbar>
    </Tab.Pane>
  );
};

export default PublicationTabContents;
