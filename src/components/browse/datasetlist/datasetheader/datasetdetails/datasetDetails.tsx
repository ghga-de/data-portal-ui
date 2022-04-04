import { Row, Col, Button, Spinner } from "react-bootstrap";
import {
  dataAccessCommitteeModel,
  dataAccessPolicyModel,
  datasetEmbeddedModel,
  hitModel,
} from "../../../../../models/dataset";
import DatasetExperiments from "./datasetExperiments";
import DatasetFiles from "./datasetFiles";
import DatasetSamples from "./datasetSamples";
import DatasetStudies from "./datasetStudies";
import DataRequestModal from "./dataRequestModal/dataRequestModal";
import React from "react";

interface dataSetDetailsProps {
  hit: hitModel;
  details: datasetEmbeddedModel | null | undefined;
}

const DatasetDetails = (props: dataSetDetailsProps) => {
  const [show, setShow] = React.useState(false);
  const [copyEmail, setCopyEmail] = React.useState<string>("helpdesk@ghga.de");
  const handleClose = () => setShow(false);

  const getEmailId = () => {
    let mailId: string = "helpdesk@ghga.de";
    if (props.details !== null && props.details !== undefined) {
      const dataAccessPolicy: dataAccessPolicyModel =
        props.details.has_data_access_policy;
      const dataAccessCommittee: dataAccessCommitteeModel =
        dataAccessPolicy.has_data_access_committee;
      const main_contact = dataAccessCommittee.main_contact;
      for (var item of dataAccessCommittee.has_member) {
        if (main_contact === null) {
          mailId =
            item.email === null || item.email === undefined
              ? mailId
              : item.email;
        }
        if (
          item.id === main_contact &&
          item.email !== null &&
          item.email !== undefined
        ) {
          mailId = item.email;
        }
      }
    }
    return mailId;
  };

  const handleOpen = () => {
    setCopyEmail(getEmailId());
    setShow(true);
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
          <Col
            lg={1}
            md={1}
            sm={1}
            xl={1}
            xs={1}
            xxl={1}
            className="text-end px-0"
          >
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
          <DataRequestModal
            accession={props.hit.content.accession}
            copyEmail={copyEmail}
            show={show}
            handleClose={handleClose}
          />
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
          <Spinner animation="border" variant="primary" size="sm" />
          &nbsp;Dataset details loading, please wait...
        </div>
      )}
    </div>
  );
};

export default DatasetDetails;
