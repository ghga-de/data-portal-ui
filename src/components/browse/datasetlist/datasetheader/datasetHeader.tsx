import React from "react";
import { Accordion, Col } from "react-bootstrap";
import { hitModel } from "../../../../models/dataset";
import DatasetDetails from "./datasetdetails/datasetDetails";

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
            title={hit.content.title}
          >
            <Accordion.Button className="bg-light align-items-start fs-7">
              <Col lg md sm xl xs xxl="3">
                <span className="fw-bold">Dataset ID:&nbsp;</span>
                {hit.content.accession}
              </Col>
              <Col className="overflow-hidden pe-2" style={{whiteSpace: "nowrap", textOverflow: "ellipsis"}}>
                  <span className="fw-bold">Title:&nbsp;</span>
                  {hit.content.title}
              </Col>
            </Accordion.Button>
            <Accordion.Body>
              <DatasetDetails hit={hit} />
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default DatasetHeader;
