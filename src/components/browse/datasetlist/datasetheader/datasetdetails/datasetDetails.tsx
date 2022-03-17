import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { hitModel } from "../../../../../models/dataset";
import DatasetExperiments from "./datasetExperiments";
import DatasetFiles from "./datasetFiles";
import DatasetSamples from "./datasetSamples";
import DatasetStudies from "./datasetStudies";

interface dataSetDetailsProps {
  hit: hitModel;
}

const DatasetDetails = (props: dataSetDetailsProps) => {
  let hit = props.hit;


  const requestAccess = (datasetId: string, topic: string) => {
    const mailId: string = "dac-ghga@ghga.de"
    const subject: string = "request access for Dataset " + datasetId
    const body: string = `Hello DAC team, 

          Since I am interested in the topic ${topic}, I would like to request access to the Dataset ${datasetId}.
          Kindly grant the accesses for the requested dataset.

          Thank you`
    window.open(`mailto:${mailId}?subject=${subject}&body=${body}`)
  }

  return (
    <div className="fs-9">
      <Row>
        <Row className="pe-0">
          <Col>
            <p className="my-0">
              <span className="fw-bold">Dataset ID:&nbsp;</span>
              <span style={{ userSelect: "all" }}>{hit.content.accession}</span>
            </p>
            <p>
              <span className="fw-bold">Full title:&nbsp;</span>
              <span style={{ userSelect: "all" }}>{hit.content.title}</span>
            </p>
          </Col>
          <Col lg md sm xl xs xxl="1" className="text-end px-0">
            <Button className="fs-8 w-100" onClick={() => requestAccess(hit.content.accession, hit.content.title)}>Request Access</Button>
          </Col>
        </Row>
        <p className="fs-8">
          <span className="fw-bold">Description:&nbsp;</span>
          {hit.content.description}
        </p>
      </Row>
      <hr />
      <Row className="my-4 pt-3 fs-8">
        <DatasetStudies studiesList={hit.content.has_study} />
        <DatasetFiles filesList={hit.content.has_file} />
      </Row>
      <Row className="pb-4 pt-2 fs-8">
        <DatasetSamples samplesList={hit.content.has_sample} />
        <DatasetExperiments experimentsList={hit.content.has_experiment} />
      </Row>
    </div>
  );
};

export default DatasetDetails;
