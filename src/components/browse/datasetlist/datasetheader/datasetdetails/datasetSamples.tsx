import React from "react";
import { Row } from "react-bootstrap";
import DatasetDetailsLayout from "./datasetdetailslayout/datasetDetailsLayout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVial } from '@fortawesome/free-solid-svg-icons';
import { sampleModel } from "../../../../../models/dataset";

interface dataSetSamplesProps {
  samplesList: sampleModel[] | null;
}

const DatasetSamples = (props: dataSetSamplesProps) => {
  return (
    <DatasetDetailsLayout
      icon={<FontAwesomeIcon icon={faVial}/>}
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
