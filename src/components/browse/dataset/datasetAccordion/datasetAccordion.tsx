import React, { useState } from "react";
import { Accordion, Col, Row } from "react-bootstrap";
import { getDatasetSummary } from "../../../../api/browse";
import {
  DatasetDetailsSummaryModel,
  HitModel,
} from "../../../../models/dataset";
import DatasetSummary from "./datasetSummary/datasetSummary";

interface DataSetListProps {
  dsList: HitModel[];
}

/** Accordion component where datasets are listed. It also contains summary information of the datasets. */
const DatasetAccordion = (props: DataSetListProps) => {
  const [summary, setSummary] = useState<
    DatasetDetailsSummaryModel | null | undefined
  >(null);
  const [summaryMap, setSummaryMap] = useState<
    Map<string, DatasetDetailsSummaryModel | null | undefined>
  >(new Map<string, DatasetDetailsSummaryModel | null>());
  const getDetails = (datasetAccession: string) => {
    if (summaryMap.get(datasetAccession) === undefined) {
      getDatasetSummary(datasetAccession, setSummary);
      setSummaryMap(summaryMap.set(datasetAccession, null));
    }
  };

  if (summary && summaryMap.get(summary.accession) === null) {
    setSummaryMap(summaryMap.set(summary.accession, summary));
  }

  return (
    <Row>
      <Accordion
        alwaysOpen
        className="mt-1 me-lg-3 px-0 ps-lg-2 pe-lg-3 ms-lg-1"
      >
        {props.dsList.map((hit, index) => (
          <Accordion.Item
            key={index}
            eventKey={hit.content.accession}
            className="mb-3 border border-1 rounded-0"
            title={hit.content.title}
          >
            <Accordion.Button
              className="bg-light align-items-start text-break py-2 px-1 px-lg-2 text-black"
              onClick={() => getDetails(hit.content.accession)}
            >
              <Col xs={5} sm={4} xl={3}>
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
                  {hit.content.title}
                </div>
              </Col>
            </Accordion.Button>
            <Accordion.Body className="p-2">
              <DatasetSummary
                hit={hit}
                summary={summaryMap.get(hit.content.accession)}
              />
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Row>
  );
};

export default DatasetAccordion;
