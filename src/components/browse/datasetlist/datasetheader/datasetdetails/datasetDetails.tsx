import React, { useState } from "react";
import { Row, Col, Button, Modal, Spinner } from "react-bootstrap";
import { datasetEmbeddedModel, hitModel } from "../../../../../models/dataset";
import DatasetExperiments from "./datasetExperiments";
import DatasetFiles from "./datasetFiles";
import DatasetSamples from "./datasetSamples";
import DatasetStudies from "./datasetStudies";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";

interface dataSetDetailsProps {
  hit: hitModel;
  details: datasetEmbeddedModel | null | undefined;
}

const DatasetDetails = (props: dataSetDetailsProps) => {
  const mailId: string = "helpdesk@ghga.de";
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  const requestAccess = (datasetId: string) => {
    const subject: string = "Request access for dataset " + datasetId;
    const body: string =
      `Dear  DAC team,%0D%0A%0D%0A` +
      `I am interested in accessing the Dataset%20` +
      `${props.hit.content.accession}, which is listed in the GHGA%20` +
      `Metadata Catalogue. %0D%0A` +
      `Please could you reply to me as soon as you%20` +
      `are able to discuss my proposed project? Thank you.%0D%0A%0D%0A%0D%0A` +
      `Kind regards`;
    window.location.assign(`mailto:${mailId}?subject=${subject}&body=${body}`);
  };

  return (
    <div className="fs-9">
      <Row>
        <Row className="pe-0">
          <Col className="pe-3">
            <p className="mb-1">
              <span className="fw-bold">Dataset ID:&nbsp;</span>
              <span style={{ userSelect: "all" }}>
                {props.hit.content.accession}
              </span>
            </p>
            <p>
              <span className="fw-bold">Full title:&nbsp;</span>
              <span style={{ userSelect: "all" }}>
                {props.hit.content.title}
              </span>
            </p>
          </Col>
          <Col lg md sm xl xs xxl="1" className="text-end px-0">
            {props.details !== null && props.details !== undefined ? (
              <Button className="fs-8 w-100" onClick={() => handleOpen()}>
                Request Access
              </Button>
            ) : (
              <Button className="fs-8 w-100" disabled>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              </Button>
            )}
          </Col>
          <Modal size="lg" centered show={show} onHide={handleClose}>
            <Modal.Header closeButton className="border-0">
              <Modal.Title>
                <FontAwesomeIcon
                  icon={faDownload}
                  className="text-muted me-3"
                />
                <strong>
                  How to request access for dataset{" "}
                  {props.hit.content.accession}
                </strong>
              </Modal.Title>
            </Modal.Header>

            <Modal.Body className="px-4">
              <Row className="mb-3 p-3 bg-gray align-items-center">
                <Col lg md sm xl xs xxl={1}>
                  <FontAwesomeIcon
                    icon={faCircleExclamation}
                    className="text-danger"
                    size="2x"
                  />
                </Col>
                <Col>
                  To request access, you will need to contact to Data Access
                  Committee (DAC) who are responsible for approving applications
                  for this dataset. Please copy the message below and send it
                  via email to {mailId}. If configured, you can click on ‘Open
                  Mail Client’ to open the message in your preferred email
                  client. Please add any additional details if necessary.
                  <br />
                  GHGA does not receive a copy of your email or any other
                  personal data from you if you open this message in your email
                  client. GHGA has no role in approving or rejecting data access
                  requests.
                </Col>
              </Row>
              <p className="user-select-all mb-4">
                Dear DAC team,
                <br />
                <br />I am interested in accessing the Dataset{" "}
                {props.hit.content.accession}, which is listed in the GHGA
                Metadata Catalogue. Please could you reply to me as soon as you
                are able to discuss my proposed project? Thank you.
                <br />
                <br />
                Kind regards
              </p>
              <p className="mb-0 fs-7">
                <strong>* I accept the privacy policy</strong>
              </p>
            </Modal.Body>
            <Modal.Footer className="border-0">
              <Col className="px-4">
                <Button
                  variant="outline-dark"
                  onClick={handleClose}
                  className="w-100"
                >
                  Cancel
                </Button>
              </Col>
              <Col className="pe-4">
                <Button
                  className="w-100"
                  onClick={() => requestAccess(props.hit.content.accession)}
                >
                  Open Mail Client
                </Button>
              </Col>
            </Modal.Footer>
          </Modal>
        </Row>
        <p className="fs-8">
          <span className="fw-bold">Description:&nbsp;</span>
          {props.hit.content.description}
        </p>
      </Row>
      <hr />
      {props.details !== null && props.details !== undefined ? (
        <div>
          <Row className="my-4 pt-3 fs-8">
            <DatasetStudies studiesList={props.details.has_study} />
            <DatasetFiles filesList={props.details.has_file} />
          </Row>
          <Row className="pb-4 pt-2 fs-8">
            <DatasetSamples samplesList={props.details.has_sample} />
            <DatasetExperiments
              experimentsList={props.details.has_experiment}
              hit={props.hit}
            />
          </Row>
        </div>
      ) : (
        <div>
          <p>
            <Spinner animation="border" variant="primary" size="sm" />
            &nbsp;Dataset details loading, please wait...
          </p>
        </div>
      )}
    </div>
  );
};

export default DatasetDetails;
