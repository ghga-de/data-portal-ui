import React from "react";
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
  return (
    <DatasetDetailsLayout
      icon={<FontAwesomeIcon icon={faFileLines} />}
      content={
        <Row>
          <p className="mb-0">
            <strong>File summary</strong>
          </p>
          {props.files !== null ? (
            <div>
              <p className="mb-0">
                <strong>{props.files.count}</strong> Files
              </p>
              <ul className="mb-0">
                {props.files.stats?.format.map((x) => {
                  return (
                    <li key={x.value} className="text-uppercase">
                      {<BoldenedSummaryDetails x={x} />}
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <p className="mb-0">0 Files</p>
          )}
        </Row>
      }
    />
  );
};

export default DatasetFiles;
