import React, { useState } from "react";
import { Row, Col, Button, Modal, Spinner } from "react-bootstrap";
import { datasetEmbeddedModel, hitModel } from "../../../../../models/dataset";
import DatasetExperiments from "./datasetExperiments";
import DatasetFiles from "./datasetFiles";
import DatasetSamples from "./datasetSamples";
import DatasetStudies from "./datasetStudies";

interface dataSetDetailsProps {
  hit: hitModel;
  details: datasetEmbeddedModel | null | undefined
}

const DatasetDetails = (props: dataSetDetailsProps) => {
  const mailId: string = "dac-ghga@ghga.de"
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true)

  const requestAccess = (datasetId: string, topic: string) => {
    const subject: string = "Request access for dataset " + datasetId
    const body: string = `Hello DAC team,%0D%0A%0D%0A` +
      `Since I am interested in the topic ${topic}, I would like to request access to the Dataset ${datasetId}.%0D%0A%0D%0A` +
      `Kindly grant the access for the requested dataset.%0D%0A%0D%0A%0D%0A` +
      `Thank you`
    window.location.assign(`mailto:${mailId}?subject=${subject}&body=${body}`)
  }

  return (
    <div className="fs-9" >
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
              <span style={{ userSelect: "all" }}>{props.hit.content.title}</span>
            </p>
          </Col>
          <Col lg md sm xl xs xxl="1" className="text-end px-0">
            {props.details !== null && props.details !== undefined ?
              <Button className="fs-8 w-100"
                onClick={() => handleOpen()}>Request Access</Button> :
              <Button className="fs-8 w-100" disabled>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true" />
              </Button>
            }
          </Col>
          <Modal size="lg" centered
            show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Request access for dataset {props.hit.content.accession}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>Please copy the following message and send us a mail to {mailId}. If configured, the
                message opens in your email client. Please provide any additional details if needed.
              </p>
              <hr />
              <p>Hello DAC team,
                <br /><br />
                Since I am interested in the topic {props.hit.content.title}, I would like to request access to the Dataset {props.hit.content.accession}.
                Kindly grant the access for the requested dataset.
                <br /><br />
                Thank you
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => requestAccess(props.hit.content.accession, props.hit.content.title)}>Open Mail Client</Button>
            </Modal.Footer>
          </Modal>
        </Row>
        <p className="fs-8">
          <span className="fw-bold">Description:&nbsp;</span>
          {props.hit.content.description}
        </p>
      </Row>
      <hr />
      {
        props.details !== null && props.details !== undefined ? (
          <div>
            <Row className="my-4 pt-3 fs-8">
              <DatasetStudies studiesList={props.details.has_study} />
              <DatasetFiles filesList={props.details.has_file} />
            </Row>
            <Row className="pb-4 pt-2 fs-8">
              <DatasetSamples samplesList={props.details.has_sample} />
              <DatasetExperiments experimentsList={props.details.has_experiment} hit={props.hit} />
            </Row>
          </div>
        ) : (
          <div>
            <p><Spinner animation="border" variant="primary" size="sm" />&nbsp;Dataset details loading, please wait...</p>
          </div>
        )
      }
    </div >
  );
};

export default DatasetDetails;
