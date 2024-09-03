// Copyright 2021 - 2024 Universität Tübingen, DKFZ and EMBL
// for the German Human Genome-Phenome Archive (GHGA)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
