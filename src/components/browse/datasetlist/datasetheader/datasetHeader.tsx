import React, { useState } from "react";
import { Accordion, Col } from "react-bootstrap";
import { getDatasetDetails } from "../../../../api/browse";
import { datasetEmbeddedModel, hitModel } from "../../../../models/dataset";
import DatasetDetails from "./datasetdetails/datasetDetails";

interface dataSetListProps {
  dsList: hitModel[];
}

const DatasetHeader = (props: dataSetListProps) => {
  const [details, setDetails] = useState<datasetEmbeddedModel | null | undefined>(null)
  const [detailsMap, setDetailsMap] = useState<Map<string, datasetEmbeddedModel | null | undefined>>(
    new Map<string, datasetEmbeddedModel | null>())
  const getDetails = (datasetId: string) => {
    if(detailsMap.get(datasetId) === undefined){
      getDatasetDetails(datasetId, setDetails);
      setDetailsMap(detailsMap.set(datasetId, null))
    }
  };

  if(details !== null && details !== undefined && detailsMap.get(details.id) === null) {
    setDetailsMap(detailsMap.set(details.id, details))
  }

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
            <Accordion.Button
              className="bg-light align-items-start fs-7"
              onClick={() => getDetails(hit.id)}
            >
              <Col lg md sm xl xs xxl="3">
                <span className="fw-bold">Dataset ID:&nbsp;</span>
                {hit.content.accession}
              </Col>
              <Col className="pe-2" style={{ height: "42px" }}>
                <div
                  className="overflow-hidden"
                  style={{
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    lineClamp: "2",
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  <span className="fw-bold">Title:&nbsp;</span>
                  {hit.content.title}
                </div>
              </Col>
            </Accordion.Button>
            <Accordion.Body>
                <DatasetDetails hit={hit} details={detailsMap.get(hit.id)} />
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default DatasetHeader;
