import React from "react";
import { Row, Col } from "react-bootstrap";
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

  return (
    <div className="fs-8">
      <Row>
        <Col lg md sm xl xs xxl="10">
          <p className="my-0">
            <span className="fw-bold">Dataset ID:&nbsp;</span>
            {hit.content.accession}

            <br />
            <span className="fw-bold">Description:&nbsp;</span>
            {hit.content.description}
          </p>
        </Col>
      </Row>
      <hr />
      <Row className="my-4 pt-3">
        <DatasetStudies studiesList={hit.content.has_study} />
        <DatasetFiles filesList={hit.content.has_file} />
      </Row>
      <Row className="pb-4 pt-2">
        <DatasetSamples samplesList={hit.content.has_sample} />
        <DatasetExperiments experimentsList={hit.content.has_experiment} />
      </Row>
    </div>
  );
};

export default DatasetDetails;
