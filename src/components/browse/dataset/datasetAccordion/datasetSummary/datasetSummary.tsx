import { Row, Button, Spinner, Col, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  DatasetDetailsSummaryModel,
  HitModel,
} from "../../../../../models/dataset";
import DatasetExperiments from "./datasetExperiments";
import DatasetFiles from "./datasetFiles";
import DatasetSamples from "./datasetSamples";
import DatasetStudies from "./datasetStudies";
import DataRequestFormModal from "../../../../../utils/dataRequestFormModal";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import RequestAccessButton from "../../../../../utils/requestAccessButton";

interface DataSetDetailsProps {
  hit: HitModel;
  summary: DatasetDetailsSummaryModel | null | undefined;
}

/** Body component for the datasets listed in accordion. */
const DatasetSummary = (props: DataSetDetailsProps) => {
  const [show, setShow] = React.useState(false);
  const [copyEmail, setCopyEmail] = React.useState<string>("helpdesk@ghga.de");
  const handleClose = () => setShow(false);

  var dacFormLink: string | null = null;

  const handleOpen = () => {
    setCopyEmail(props.summary?.dac_email || "helpdesk@ghga.de");
    setShow(true);
  };

  const pClass = "mb-0";

  return (
    <div className="fs-7">
      <div className="pe-0 px-0 px-md-2 pt-md-1">
        <div className="float-end ps-0 ps-md-4 ms-1">
          {props.summary ? (
            <>
              <RequestAccessButton
                accession={props.hit.content.accession}
                handleOpen={handleOpen}
                classes="d-block"
              />
              <Link to={props.hit.content.accession}>
                <Button
                  variant="quinary"
                  className="text-white mb-3 fs-7 shadow-md-dark d-block"
                  title="Dataset Details"
                  style={{ width: "115px" }}
                >
                  <Row className="p-0 m-0 align-items-center text-start">
                    <Col className="p-0 m-0 col-3 ">
                      <FontAwesomeIcon icon={faUpRightFromSquare} />
                    </Col>
                    <Col className="p-0 m-0 lh-1">
                      <strong>Dataset Details</strong>
                    </Col>
                  </Row>
                </Button>
              </Link>
            </>
          ) : (
            <Button
              className="fs-7 mb-3 py-2 text-white shadow-md-dark"
              variant="quinary"
              disabled
              style={{ width: "115px" }}
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
        </div>
        <div className="text-break mb-3">
          <p className={pClass}>
            <strong>Dataset ID:&nbsp;</strong>
            {props.hit.content.accession}
          </p>
          <p className={pClass}>
            <strong>Full title:&nbsp;</strong>
            {props.hit.content.title}
          </p>
          <p className={pClass}>
            <strong>Description:&nbsp;</strong>
            {props.hit.content.description}
          </p>
          <p className={pClass}>
            <strong>Types:&nbsp;</strong>
            {props.hit.content.types.map((x) => (
              <Badge
                className="me-1 bg-white text-black border-primary border px-1 fw-normal"
                key={x}
              >
                {x}
              </Badge>
            ))}
          </p>
        </div>
        {props.summary ? (
          <div>
            <Row className="pt-3">
              <Col xs={12} md={6} lg={12} xl={6}>
                <DatasetStudies studies={props.summary.studies_summary} />
                <DatasetSamples samples={props.summary.samples_summary} />
              </Col>
              <Col>
                <DatasetFiles files={props.summary.files_summary} />
                <DatasetExperiments
                  experiments={props.summary.experiments_summary}
                />
              </Col>
            </Row>
          </div>
        ) : (
          <div>
            <Spinner animation="border" variant="primary" size="sm" />
            &nbsp;Dataset details loading, please wait...
          </div>
        )}
      </div>
      <DataRequestFormModal
        accession={props.hit.content.accession}
        copyEmail={copyEmail}
        show={show}
        handleClose={handleClose}
        dacFormLink={dacFormLink}
      />
    </div>
  );
};

export default DatasetSummary;
