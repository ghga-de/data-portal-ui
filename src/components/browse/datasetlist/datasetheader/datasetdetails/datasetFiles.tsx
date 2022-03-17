import React from "react";
import { Row } from "react-bootstrap";
import DatasetDetailsLayout from "./datasetdetailslayout/datasetDetailsLayout";
import { FileEarmark } from "react-bootstrap-icons";
import { fileModel } from "../../../../../models/dataset";

interface dataSetFilesProps {
  filesList: fileModel[];
}

const DatasetFiles = (props: dataSetFilesProps) => {
  return (
    <DatasetDetailsLayout
      icon={<FileEarmark size={32} />}
      content={
        <Row>
          <p className="mb-0">
            <strong>File summary</strong>
            <br />
          </p>
          {props.filesList !== null ? (
            <div>
              <p className="mb-0">{props.filesList.length} Files</p>
              <ul className="mb-1 ps-4 ms-3">
                <li>PLACEHOLDER files (PLACEHOLDER TB)</li>
                <li>PLACEHOLDER FILES (PLACEHOLDER TB)</li>
              </ul>
              <p className="mb-0">PLACEHOLDER TB total size</p>
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
