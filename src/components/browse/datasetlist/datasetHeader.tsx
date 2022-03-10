import React from "react";
import { Accordion} from "react-bootstrap";
import { hitModel } from "../../../models/dataset";
import DatasetDetails from "./datasetDetails"

interface dataSetListProps {
  dsList: hitModel[];
}

const DatasetHeader = (props: dataSetListProps) => {
  return (
    <div>
      <Accordion alwaysOpen className="mt-1 fs-7 me-3">
        {props.dsList.map((hit, index) => (
          <Accordion.Item
            key={index}
            eventKey={hit.id}
            className="mb-3 border border-1 rounded"
          >
            <Accordion.Button className="bg-light align-items-start fs-7">
              <p className="my-0">
                <span className="fw-bold">Dataset ID:&nbsp;</span>
                {hit.content.accession}

                <br />
                <span className="fw-bold">Title: </span>
                {hit.content.title}
              </p>
            </Accordion.Button>
            <Accordion.Body>
                <DatasetDetails 
                hit={hit}
                />
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default DatasetHeader;
