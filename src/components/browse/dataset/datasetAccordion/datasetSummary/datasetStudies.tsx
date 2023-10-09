import React from "react";
import { studySummaryModel } from "../../../../../models/dataset";
import DatasetDetailsLayout from "./datasetDetailsLayout/datasetDetailsLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

interface dataSetStudiesProps {
  study: studySummaryModel | null;
}

/** Dataset summary section displays the studies of which the dataset is a part. */
const DatasetStudies = (props: dataSetStudiesProps) => {
  return (
    <DatasetDetailsLayout
      icon={<FontAwesomeIcon icon={faBook} />}
      content={
        props.study !== null ? (
          <div>
            <p className="mb-0">
              <strong>Part of studies:&nbsp;</strong>
              {props.study.stats.title !== null
                ? props.study.stats.title.map((x) => (
                    <span key={x}>{x}.&nbsp;</span>
                  ))
                : props.study.stats.accession.map((x) => (
                    <span key={x}>{x}.&nbsp;</span>
                  ))}
            </p>
            <p className="mb-0">
              <strong>
                Accession ID
                {props.study.stats?.accession?.length > 1 ? "s" : ""}:
              </strong>
              {props.study.stats?.accession?.map((x) => (
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
