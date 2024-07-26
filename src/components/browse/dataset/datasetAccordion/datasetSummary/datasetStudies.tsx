import React from "react";
import { StudySummaryModel } from "../../../../../models/dataset";
import DatasetDetailsLayout from "./datasetDetailsLayout/datasetDetailsLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

interface DataSetStudiesProps {
  studies: StudySummaryModel | null;
}

/** Dataset summary section displays the studies of which the dataset is a part. */
const DatasetStudies = (props: DataSetStudiesProps) => {
  const stats = props.studies?.stats || { title: [], accession: [] };
  return (
    <DatasetDetailsLayout
      icon={<FontAwesomeIcon icon={faBook} />}
      content={
        stats ? (
          <div>
            <p className="mb-0">
              <strong>Part of study:&nbsp;</strong>
              {stats.title
                ? stats.title.map((x) => <span key={x}>{x}.&nbsp;</span>)
                : stats.accession.map((x) => <span key={x}>{x}.&nbsp;</span>)}
            </p>
            <p className="mb-0">
              <strong>
                Accession ID
                {stats.accession.length > 1 ? "s" : ""}:
              </strong>
              {stats.accession.map((x) => (
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
