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

import { Row } from "react-bootstrap";
import DatasetDetailsLayout from "./datasetDetailsLayout/datasetDetailsLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { FileSummaryModel } from "../../../../../models/dataset";
import BoldenedSummaryDetails from "./boldenedSummaryDetails/boldenedSummaryDetails";

interface DataSetFilesProps {
  files: FileSummaryModel | null;
}

/** Dataset summary section displays the summary of files. */
const DatasetFiles = (props: DataSetFilesProps) => {
  const files = props.files || { count: 0, stats: { format: [] } };
  return (
    <DatasetDetailsLayout
      icon={<FontAwesomeIcon icon={faFileLines} />}
      content={
        <Row>
          <p className="mb-0">
            <strong>File summary</strong>
          </p>
          <div>
            <p className="mb-0">
              <strong>{files.count}</strong> Files
            </p>
            <ul className="mb-0">
              {files.stats.format.map((x) => {
                return (
                  <li key={x.value} className="text-uppercase">
                    {<BoldenedSummaryDetails x={x} />}
                  </li>
                );
              })}
            </ul>
          </div>
        </Row>
      }
    />
  );
};

export default DatasetFiles;
