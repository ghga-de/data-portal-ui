import React from "react";
import { Row } from "react-bootstrap";
import DatasetDetailsLayout from "./datasetDetailsLayout/datasetDetailsLayout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlask } from '@fortawesome/free-solid-svg-icons';
import { experimentModel, hitModel } from "../../../../../models/dataset";


interface dataSetExperimentsProps {
  experimentsList: experimentModel[] | null;
  hit: hitModel;
}

const DatasetExperiments = (props: dataSetExperimentsProps) => {
  const experiments = props.experimentsList;
  const protocols: string[] = [];
  if (experiments !== null) {
    experiments.map((exp) => {
      if (exp.has_protocol !== null) {
        exp.has_protocol.map((schema) => {
          if (schema.instrument_model !== null) {
            console.log(schema.instrument_model)
            var protocol = protocols.find((x) => x === schema.id);
            if (!protocol && protocol !== null) protocols.push(schema.instrument_model);
          }
          return null;
        });
      }
      return null;
    });
  }
  return (
    <DatasetDetailsLayout
      icon={<FontAwesomeIcon icon={faFlask} />}
      content={
        <Row>
          <p className="mb-0">
            <strong>Experiment info</strong>
            <br />
            Experiments: {experiments !== null ? experiments.length : "0"} total
            <br />
            Dataset type:&nbsp;{props.hit.content.type}
            <br />
            Protocols:&nbsp;
            {experiments !== null
              ? protocols.length > 0
                ? protocols.map((schema) => {
                  return <span>{schema}, </span>;
                })
                : "N/A"
              : "N/A"}
          </p>
        </Row>
      }
    />
  );
};

export default DatasetExperiments;
