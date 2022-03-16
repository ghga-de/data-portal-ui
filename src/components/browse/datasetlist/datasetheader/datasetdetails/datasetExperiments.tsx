import React from "react";
import { Row } from "react-bootstrap";
import DatasetDetailsLayout from "./datasetdetailslayout/datasetDetailsLayout";
import { ClipboardData } from "react-bootstrap-icons";

interface dataSetExperimentsProps {
  experimentsList: string[];
}

const DatasetExperiments = (props: dataSetExperimentsProps) => {
  return (
    <DatasetDetailsLayout
      icon={<ClipboardData size={32} />}
      content={
        <Row>
          <p className="mb-0">
            <strong>Experiment info</strong>
            <br />
            Experiments: {props.experimentsList !== undefined ? props.experimentsList.length : "0"} total
            <br/>
            Dataset type: PLACEHOLDER
            <br/>
            Technology: PLACEHOLDER
          </p>
        </Row>
      }
    />
  );
};

export default DatasetExperiments;
