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
import { Button, Collapse, Row, Badge } from "react-bootstrap";
import DatasetDetailsLayout from "./datasetDetailsLayout/datasetDetailsLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVial } from "@fortawesome/free-solid-svg-icons";
import { SampleSummaryModel } from "../../../../../models/dataset";
import BoldenedSummaryDetails from "./boldenedSummaryDetails/boldenedSummaryDetails";

interface DataSetSamplesProps {
  samples: SampleSummaryModel | null;
}

/** Dataset summary section displays the sample information. */
const DatasetSamples = (props: DataSetSamplesProps) => {
  const [openPhenotypesList, setOpenPhenotypesList] = React.useState(false);

  const stats = props.samples?.stats;

  return (
    <DatasetDetailsLayout
      icon={<FontAwesomeIcon icon={faVial} />}
      content={
        <Row>
          <p className="mb-0">
            <strong>Sample info</strong>
          </p>
          {props.samples && stats ? (
            <div>
              <div className="mb-0">
                <strong>{props.samples.count}</strong>&nbsp;Samples{" "}
                {stats.sex.length > 0 ? (
                  <>
                    (Sex:&nbsp;
                    {stats.sex.map((x, idx) => {
                      const sex = x.value.toLowerCase();
                      return (
                        <span title={sex} key={sex}>
                          {`${idx ? ", " : ""} ${x.count} ${sex}`}
                        </span>
                      );
                    })}
                    )
                  </>
                ) : (
                  <></>
                )}
                <div className="my-0">
                  <p className="mb-0">
                    <strong>{stats.tissues.length}</strong>
                    &nbsp;Tissues
                  </p>
                  {stats.tissues.map((x) => {
                    return (
                      <Badge
                        key={x.value}
                        className="bg-success text-capitalize fw-normal py-1 fs-8 mb-0 ms-4 mb-1"
                      >
                        {<BoldenedSummaryDetails x={x} />}
                      </Badge>
                    );
                  })}
                </div>
                <div className="mb-0">
                  <strong>{stats.phenotypic_features.length}</strong>
                  &nbsp;Phenotypic Features
                  <div className="mb-0">
                    {stats.phenotypic_features.slice(0, 3).map((x) => {
                      return (
                        <Badge
                          key={x.value}
                          className="bg-primary py-1 text-capitalize fw-normal fs-8 mb-0 ms-4 d-table mb-1 text-break text-wrap text-start"
                        >
                          {<BoldenedSummaryDetails x={x} />}
                        </Badge>
                      );
                    })}
                  </div>
                  {stats.phenotypic_features.length > 3 ? (
                    <>
                      <Collapse in={openPhenotypesList}>
                        <span id="extended-phenotypes">
                          {stats.phenotypic_features.slice(3).map((x) => {
                            return (
                              <Badge
                                key={x.value}
                                className="bg-primary py-1 text-capitalize fw-normal fs-8 mb-0 ms-4 d-table mb-1 text-break text-wrap text-start"
                              >
                                {<BoldenedSummaryDetails x={x} />}
                              </Badge>
                            );
                          })}
                        </span>
                      </Collapse>
                      <Button
                        onClick={() => {
                          setOpenPhenotypesList(!openPhenotypesList);
                        }}
                        aria-controls="example-collapse-text"
                        aria-expanded={openPhenotypesList}
                        variant="link"
                        className="p-0 fs-7 d-block"
                      >
                        {openPhenotypesList ? (
                          <>See less ...</>
                        ) : (
                          <>See full list ...</>
                        )}
                      </Button>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p className="mb-0">No Samples</p>
          )}
        </Row>
      }
    />
  );
};

export default DatasetSamples;
