import React from "react";
import { Button, Collapse, Row, Badge } from "react-bootstrap";
import DatasetDetailsLayout from "./datasetDetailsLayout/datasetDetailsLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVial } from "@fortawesome/free-solid-svg-icons";
import { sampleSummaryModel } from "../../../../../models/dataset";
import BoldenedSummaryDetails from "./boldenedSummaryDetails/boldenedSummaryDetails";

interface dataSetSamplesProps {
  samples: sampleSummaryModel | null;
}

/** Dataset summary section displays the sample information. */
const DatasetSamples = (props: dataSetSamplesProps) => {
  const [openPhenotypesList, setOpenPhenotypesList] = React.useState(false);

  return (
    <DatasetDetailsLayout
      icon={<FontAwesomeIcon icon={faVial} />}
      content={
        <Row>
          <p className="mb-0">
            <strong>Sample info</strong>
          </p>
          {props.samples !== null ? (
            <div>
              <div className="mb-0">
                <strong>{props.samples.count}</strong>&nbsp;Samples{" "}
                {props.samples.stats?.sex.length > 0 ? (
                  <>
                    (Sex:&nbsp;
                    {props.samples.stats?.sex?.map((x, idx, arr) => {
                      let sex: string = "";
                      if (x.value === "FEMALE_SEX_FOR_CLINICAL_USE") {
                        sex = "Female";
                      } else sex = "Male";
                      let sep = ". ";
                      if (idx === arr.length - 1) {
                        sep = "";
                      }
                      return (
                        <span title={sex} key={sex}>
                          {x.count + " " + sex}
                          {sep}
                        </span>
                      );
                    })}
                    )
                  </>
                ) : (
                  <></>
                )}
                <div className="my-0">
                  <p className="mb-0">
                    <strong>{props.samples.stats?.tissues.length}</strong>
                    &nbsp;Tissues
                  </p>
                  {props.samples.stats?.tissues.map((x) => {
                    return (
                      <Badge
                        key={x.value}
                        className="bg-success text-capitalize fw-normal py-1 fs-8 mb-0 ms-4 mb-1"
                      >
                        {<BoldenedSummaryDetails x={x} />}
                      </Badge>
                    );
                  })}
                </div>
                <div className="mb-0">
                  <strong>
                    {props.samples.stats?.phenotypic_features.length}
                  </strong>
                  &nbsp;Phenotypic Features
                  <div className="mb-0">
                    {props.samples.stats?.phenotypic_features
                      .slice(0, 3)
                      .map((x) => {
                        return (
                          <Badge
                            key={x.value}
                            className="bg-primary py-1 text-capitalize fw-normal fs-8 mb-0 ms-4 d-table mb-1 text-break text-wrap text-start"
                          >
                            {<BoldenedSummaryDetails x={x} />}
                          </Badge>
                        );
                      })}
                  </div>
                  {props.samples.stats?.phenotypic_features.length > 3 ? (
                    <>
                      <Collapse in={openPhenotypesList}>
                        <span id="extended-phenotypes">
                          {props.samples.stats?.phenotypic_features
                            .slice(3)
                            .map((x) => {
                              return (
                                <Badge
                                  key={x.value}
                                  className="bg-primary py-1 text-capitalize fw-normal fs-8 mb-0 ms-4 d-table mb-1 text-break text-wrap text-start"
                                >
                                  {<BoldenedSummaryDetails x={x} />}
                                </Badge>
                              );
                            })}
                        </span>
                      </Collapse>
                      <Button
                        onClick={() => {
                          setOpenPhenotypesList(!openPhenotypesList);
                        }}
                        aria-controls="example-collapse-text"
                        aria-expanded={openPhenotypesList}
                        variant="link"
                        className="p-0 fs-7 d-block"
                      >
                        {openPhenotypesList ? (
                          <>See less ...</>
                        ) : (
                          <>See full list ...</>
                        )}
                      </Button>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
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
