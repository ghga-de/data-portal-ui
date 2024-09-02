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

import { StudySummaryModel } from "../../../../../models/dataset";
import DatasetDetailsLayout from "./datasetDetailsLayout/datasetDetailsLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

interface DataSetStudiesProps {
  studies: StudySummaryModel | null;
}

/** Dataset summary section displays the studies of which the dataset is a part. */
const DatasetStudies = (props: DataSetStudiesProps) => {
  const stats = props.studies?.stats || { title: [], accession: [] };
  return (
    <DatasetDetailsLayout
      icon={<FontAwesomeIcon icon={faBook} />}
      content={
        stats ? (
          <div>
            <p className="mb-0">
              <strong>Part of study:&nbsp;</strong>
              {stats.title
                ? stats.title.map((x) => <span key={x}>{x}.&nbsp;</span>)
                : stats.accession.map((x) => <span key={x}>{x}.&nbsp;</span>)}
            </p>
            <p className="mb-0">
              <strong>
                Accession ID
                {stats.accession.length > 1 ? "s" : ""}:
              </strong>
              {stats.accession.map((x) => (
                <span className="mb-0 d-block" key={x}>
                  {x}
                </span>
              ))}
            </p>
          </div>
        ) : (
          <p className="mb-0">
            <strong>No studies available.</strong>
          </p>
        )
      }
    />
  );
};

export default DatasetStudies;
