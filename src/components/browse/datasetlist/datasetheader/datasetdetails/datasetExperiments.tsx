import React from "react";
import { Row } from "react-bootstrap";
import DatasetDetailsLayout from "./datasetdetailslayout/datasetDetailsLayout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlask } from '@fortawesome/free-solid-svg-icons';
import { experimentModel } from "../../../../../models/dataset";

interface dataSetExperimentsProps {
  experimentsList: experimentModel[] | null;
}

const DatasetExperiments = (props: dataSetExperimentsProps) => {
  return (
    <DatasetDetailsLayout
      icon={<FontAwesomeIcon icon={faFlask}/>}
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
