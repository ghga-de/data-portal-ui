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

import { Col, Row } from "react-bootstrap";
import "react-perfect-scrollbar/dist/css/styles.css";
import logo from "../../../assets/GHGA_full_Logo_orange.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

/**
 * Section on the home page where an "About us" section is displayed.
 */
const HomeBottomSection = () => {
  const PARAGRAPH_CLASS = "fs-lg-5 text-md-justify";
  const LINK_CLASS = "text-secondary";
  return (
    <div className="pt-4 px-lg-2">
      <h2 className="fw-bold fs-3 px-lg-4 pb-2 text-center text-lg-start">
        About GHGA
      </h2>
      <h3 className="mb-0 fs-4 px-lg-4 text-center text-lg-start">
        GHGA &ndash; The German Human Genome&#8209;Phenome Archive
      </h3>
      <Row className="p-2 p-lg-4 align-items-center">
        <Col md={5} lg={4} xl={3}>
          <img alt="GHGA Logo" src={logo} className="w-100" />
        </Col>
        <Col>
          <p className={PARAGRAPH_CLASS}>
            GHGA is a national infrastructure to enable the FAIR and secure
            sharing of genetic and other human omics data. It is embedded in
            European activities such as the federated European Genome-Phenome
            Archive (
            <a
              className={LINK_CLASS}
              target="_blank"
              rel="noreferrer"
              href="https://ega-archive.org/about/projects-and-funders/federated-ega/"
              style={{ whiteSpace: "nowrap" }}
            >
              FEGA
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="fs-9"
                style={{ margin: "0 0 2.5px 3.5px" }}
              />
            </a>
            ) and the European Genomic Data Infrastructure (
            <a
              className={LINK_CLASS}
              target="_blank"
              rel="noreferrer"
              href="https://gdi.onemilliongenomes.eu/"
              style={{ whiteSpace: "nowrap" }}
            >
              GDI
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="fs-9"
                style={{ margin: "0 0 2.5px 3.5px" }}
              />
            </a>
            ).
          </p>
          <p className={PARAGRAPH_CLASS}>
            GHGA is funded by the Deutsche Forschungsgemeinschaft (DFG, German
            Research Foundation, Grant Number{" "}
            <a
              className={LINK_CLASS}
              target="_blank"
              rel="noreferrer"
              href="https://gepris.dfg.de/gepris/projekt/441914366?context=projekt&task=showDetail&id=441914366&"
              style={{ whiteSpace: "nowrap" }}
            >
              441914366
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="fs-9"
                style={{ margin: "0 0 2.5px 3.5px" }}
              />
            </a>
            ) as part of the National Research Data Infrastructure initiative (
            <a
              className={LINK_CLASS}
              target="_blank"
              rel="noreferrer"
              href="https://www.nfdi.de/?lang=en"
              style={{ whiteSpace: "nowrap" }}
            >
              NFDI
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="fs-9"
                style={{ margin: "0 0 2.5px 3.5px" }}
              />
            </a>
            ) and by the contributing institutions.
          </p>
          <p className={PARAGRAPH_CLASS}>
            More at{" "}
            <a
              className={LINK_CLASS}
              target="_blank"
              rel="noreferrer"
              href="https://www.ghga.de"
              style={{ whiteSpace: "nowrap" }}
            >
              www.ghga.de
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="fs-9"
                style={{ margin: "0 0 2.5px 3.5px" }}
              />
            </a>
            .
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default HomeBottomSection;
