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
  const expTechs: string[] = [];
  if (experiments !== null) {
    experiments.map((exp) => {
      if (exp.has_technology !== null) {
        exp.has_technology.map((tech) => {
          if (tech.name !== null) {
            var expTech = expTechs.find((x) => x === tech.name);
            if (!expTech && expTech !== null) expTechs.push(tech.name);
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
            Technology:&nbsp;
            {experiments !== null
              ? expTechs.length > 0
                ? expTechs.map((tech) => {
                  return <span>{tech}, </span>;
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
