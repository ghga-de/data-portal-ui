import React from "react";
import { Row } from "react-bootstrap";
import DatasetDetailsLayout from "./datasetdetailslayout/datasetDetailsLayout";
import { ClipboardData } from "react-bootstrap-icons";
import { experimentModel } from "../../../../../models/dataset";

interface dataSetExperimentsProps {
  experimentsList: experimentModel[] | null;
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
            Experiments: {props.experimentsList !== null ? props.experimentsList.length : "0"} total
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
