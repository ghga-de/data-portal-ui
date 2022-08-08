import { Row, Button, Spinner, Col } from "react-bootstrap";
import {
  datasetEmbeddedModel,
  hitModel,
} from "../../../../../models/dataset";
import DatasetExperiments from "./datasetExperiments";
import DatasetFiles from "./datasetFiles";
import DatasetSamples from "./datasetSamples";
import DatasetStudies from "./datasetStudies";
import DataRequestModal from "./dataRequestModal/dataRequestModal";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { getDACEmailId } from "../../../../../utils/utils"

interface dataSetDetailsProps {
  hit: hitModel;
  details: datasetEmbeddedModel | null | undefined;
}

const DatasetSummary = (props: dataSetDetailsProps) => {
  const [show, setShow] = React.useState(false);
  const [copyEmail, setCopyEmail] = React.useState<string>("helpdesk@ghga.de");
  const handleClose = () => setShow(false);

  var dacFormLink: string | null = null;
  if (props.details && props.details.has_data_access_policy.data_request_form) {
    dacFormLink = props.details.has_data_access_policy.data_request_form;
  }

  const handleOpen = () => {
    setCopyEmail(getDACEmailId(props.details));
    setShow(true);
  };

  return (
    <div className="fs-8">
      <Row>
        <Row className="pe-0">
          <div className="pe-0 d-block">
            {props.details !== null && props.details !== undefined ? (
              <Button
                className="fs-8 float-end mb-3 ms-4 text-white shadow-md-dark"
                variant="secondary"
                onClick={() => handleOpen()}
                style={{ width: "105px" }}
              >
                <Row className="p-0 m-0 align-items-center">
                  <Col className="p-0 m-0 col-3 ">
                    <FontAwesomeIcon icon={faKey} />
                  </Col>
                  <Col className="p-0 m-0 lh-1">
                    <strong>Request Access</strong>
                  </Col>
                </Row>
              </Button>
            ) : (
              <Button
                className="fs-8 py-2 float-end mb-3 ms-4 text-white shadow-md-dark"
                variant="secondary"
                disabled
                style={{ width: "85px" }}
              >
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              </Button>
            )}
            <p>
              <span className="fw-bold">Dataset ID:&nbsp;</span>
              <span style={{ userSelect: "all" }}>
                <Link to={"/browse/" + props.hit.id} state={props.hit.id}>
                  {props.hit.content.accession}
                </Link>
              </span>
              <br />
              <span className="fw-bold">Full title:&nbsp;</span>
              <span style={{ userSelect: "all" }}>
                {props.hit.content.title}
              </span>
              <br />
              <span className="fw-bold">Description:&nbsp;</span>
              {props.hit.content.description}
            </p>
          </div>
          <DataRequestModal
            accession={props.hit.content.accession}
            copyEmail={copyEmail}
            show={show}
            handleClose={handleClose}
            dacFormLink={dacFormLink}
          />
        </Row>
      </Row>
      {props.details !== null && props.details !== undefined ? (
        <div>
          <Row className="mb-3 mt-2 pt-3">
            <DatasetStudies studiesList={props.details.has_study} />
            <DatasetFiles filesList={props.details.has_file} />
          </Row>
          <Row className="pb-4 pt-2 ">
            <DatasetSamples samplesList={props.details.has_sample} />
            <DatasetExperiments
              experimentsList={props.details.has_experiment}
              hit={props.hit}
            />
          </Row>
        </div>
      ) : (
        <div>
          <Spinner animation="border" variant="primary" size="sm" />
          &nbsp;Dataset details loading, please wait...
        </div>
      )}
    </div>
  );
};

export default DatasetSummary;
