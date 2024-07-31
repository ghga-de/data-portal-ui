import React from "react";
import { Row } from "react-bootstrap";
import DatasetDetailsLayout from "./datasetDetailsLayout/datasetDetailsLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlask } from "@fortawesome/free-solid-svg-icons";
import { ExperimentsSummaryModel } from "../../../../../models/dataset";
import BoldenedSummaryDetails from "./boldenedSummaryDetails/boldenedSummaryDetails";

interface DataSetExperimentsProps {
  experiments: ExperimentsSummaryModel | null;
}

/** Dataset summary section displays the experimental information. */
const DatasetExperiments = (props: DataSetExperimentsProps) => {
  const experiments = props.experiments || {
    count: 0,
    stats: { experiment_methods: [] },
  };
  return (
    <DatasetDetailsLayout
      icon={<FontAwesomeIcon icon={faFlask} />}
      content={
        <Row>
          <p className="mb-0">
            <strong>Experiment summary</strong>
          </p>
          <div>
            <p className="mb-0">
              <strong>{experiments.count}</strong> Experiments
            </p>
            <p className="mb-0">
              <strong>{experiments.stats.experiment_methods.length}</strong>{" "}
              Platforms
            </p>
            <ul>
              {experiments.stats.experiment_methods.map((x) => {
                return (
                  <li key={x.value}>{<BoldenedSummaryDetails x={x} />}</li>
                );
              })}
            </ul>
          </div>
        </Row>
      }
    />
  );
};

export default DatasetExperiments;
