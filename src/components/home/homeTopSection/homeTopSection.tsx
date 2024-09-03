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

import { Button, Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

/** Section on top of the home page where general information is given about platform. */
const HomeTopSection = () => {
  const PARAGRAPH_CLASS = "fs-5 text-md-justify";
  const LINK_CLASS = "text-secondary";
  return (
    <Col className="px-lg-2">
      <Row className="w-100 mx-0 mb-2 pb-4 pe-lg-4">
        <Col className="p-2 p-lg-4">
          <p className={PARAGRAPH_CLASS}>
            The GHGA Data Portal is a secure national infrastructure for human
            omics data available under controlled access. Access to the archived
            data can be requested from the data controllers who are responsible
            for evaluating your data access request.
          </p>
          <p className={PARAGRAPH_CLASS}>
            The datasets within are annotated following the{" "}
            <a
              className={LINK_CLASS}
              href="https://docs.ghga.de/metadata/overview/"
            >
              GHGA Metadata Model
            </a>
            , which is compatible with the metadata model of the EGA.
          </p>
          <p className={PARAGRAPH_CLASS}>
            For further documentation, please visit the{" "}
            <a className={LINK_CLASS} href="https://docs.ghga.de/">
              GHGA User Documentation
            </a>
            .
          </p>
          <div className="text-center">
            <NavLink to="/browse">
              <Button
                variant="quinary"
                className="py-1 fs-5 mt-4 text-white shadow-md-dark"
              >
                <span>Browse data</span>
              </Button>
            </NavLink>
          </div>
        </Col>
      </Row>
    </Col>
  );
};

export default HomeTopSection;
