import React from "react";
import { Row } from "react-bootstrap";
import DatasetDetailsLayout from "./datasetDetailsLayout/datasetDetailsLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlask } from "@fortawesome/free-solid-svg-icons";
import { ExperimentSummaryModel } from "../../../../../models/dataset";
import BoldenedSummaryDetails from "./boldenedSummaryDetails/boldenedSummaryDetails";

interface DataSetExperimentsProps {
  experiments: ExperimentSummaryModel | null;
}

/** Dataset summary section displays the experimental information. */
const DatasetExperiments = (props: DataSetExperimentsProps) => {
  return (
    <DatasetDetailsLayout
      icon={<FontAwesomeIcon icon={faFlask} />}
      content={
        <Row>
          <p className="mb-0">
            <strong>Sequencing experiments</strong>
          </p>
          <p className="mb-0">
            Experiments: <strong>{props.experiments?.count}</strong>{" "}
          </p>
          <div className="mb-0">
            Platforms:&nbsp;
            {props.experiments?.stats.sequencing_protocols ? (
              <strong>
                {
                  Object.keys(props.experiments?.stats.sequencing_protocols)
                    .length
                }
              </strong>
            ) : (
              ""
            )}
            <ul>
              {props.experiments?.stats.sequencing_protocols.map((x) => {
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
