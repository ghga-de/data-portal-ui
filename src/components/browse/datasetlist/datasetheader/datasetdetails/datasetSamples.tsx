import React from "react";
import { Row } from "react-bootstrap";
import DatasetDetailsLayout from "./datasetdetailslayout/datasetDetailsLayout";
import { DropletHalf } from "react-bootstrap-icons";
import { sampleModel } from "../../../../../models/dataset";

interface dataSetSamplesProps {
  samplesList: sampleModel[];
}

const DatasetSamples = (props: dataSetSamplesProps) => {
  return (
    <DatasetDetailsLayout
      icon={<DropletHalf size={32} />}
      content={
        <Row>
          <p className="mb-0">
            <strong>Sample info</strong>
            <br />
          </p>
          {props.samplesList !== null ? (
            <div>
              <p className="mb-0">
                Samples: {props.samplesList.length} total (X male / Y female / Z
                unknown)
                <br />
                Tissues: PLACEHOLDER, PLACEHOLDER
                <br />
                Phenotypes: PLACEHOLDER, PLACEHOLDER
              </p>
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
