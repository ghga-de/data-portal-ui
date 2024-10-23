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
  faArrowTurnUp,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getDatasetDetails, getDatasetFiles } from "../../../api/browse";
import { DatasetEmbeddedModel } from "../../../models/dataset";
import DataRequestFormModal from "../../../utils/dataRequestFormModal";
import SingleDatasetViewAccordion from "./singleDatasetViewAccordion/singleDatasetViewAccordion";
import SingleDatasetViewSummary from "./singleDatasetViewSummary/singleDatasetViewSummary";
import SingleDatasetViewTabs from "./singleDatasetViewTabs/singleDatasetViewTabs";
import RequestAccessButton from "../../../utils/requestAccessButton";
import { DatasetInformationFileSummaryModel } from "../../../models/files";

/** Single dataset details page */
const SingleDatasetView = () => {
  let accessionId: string | null | undefined = null;
  const { id } = useParams();
  accessionId = id;

  const location = useLocation();

  let paramId: string = location.pathname.split("/")[2];

  const [queried, setQueried] = useState<boolean>(false);

  const [details, setDetails] = useState<
    DatasetEmbeddedModel | null | undefined
  >(undefined);
  const [datasetFiles, setDatasetFiles] = useState<
    DatasetInformationFileSummaryModel | null | undefined
  >(undefined);

  useEffect(() => {
    const getDetails = (datasetAccession: string) => {
      if (!queried) {
        setQueried(true);
        getDatasetDetails(datasetAccession, setDetails);
        getDatasetFiles(datasetAccession, setDatasetFiles);
      }
    };
    if (!queried) {
      getDetails(paramId!);
    }
  }, [paramId, details, queried]);

  const [show, setShow] = useState(false);
  const [copyEmail, setCopyEmail] = useState<string>("helpdesk@ghga.de");
  const handleClose = () => setShow(false);

  var dacFormLink: string | null = null;

  let navigate = useNavigate();

  const handleOpen = () => {
    setCopyEmail(
      details?.data_access_policy?.data_access_committee?.email ||
        "helpdesk@ghga.de"
    );
    setShow(true);
  };

  return (
    <div className="py-2 py-sm-4 mx-auto px-2 px-sm-5">
      {details === undefined || datasetFiles === undefined ? (
        <div className="fs-5">
          <Spinner animation="border" variant="primary" size="sm" />
          &nbsp;Dataset details loading, please wait...
        </div>
      ) : details === null || datasetFiles === null ? (
        <div className="fs-4 fw-bold">
          <FontAwesomeIcon icon={faCircleExclamation} className="text-danger" />
          &nbsp; Error loading dataset details!
        </div>
      ) : (
        <>
          <Row className="justify-content-between w-100">
            <Col className="pe-0" xs={"auto"}>
              <Button
                onClick={() =>
                  navigate.length <= 2 ? navigate("/browse") : navigate(-1)
                }
                variant="white"
                className="text-secondary mb-3"
              >
                <FontAwesomeIcon
                  icon={faArrowTurnUp}
                  transform="rotate-270 grow-10 flip-v"
                />
              </Button>
            </Col>
            <Col className="px-0">
              <RequestAccessButton
                accession={accessionId!}
                handleOpen={handleOpen}
                classes="float-end ms-2 ms-sm-4 "
              />
            </Col>
          </Row>
          <DataRequestFormModal
            accession={details.accession}
            copyEmail={copyEmail}
            show={show}
            handleClose={handleClose}
            dacFormLink={dacFormLink}
          />
          <SingleDatasetViewSummary details={details} />
          <SingleDatasetViewTabs details={details} />
          <SingleDatasetViewAccordion details={details} files={datasetFiles} />
        </>
      )}
    </div>
  );
};

export default SingleDatasetView;
