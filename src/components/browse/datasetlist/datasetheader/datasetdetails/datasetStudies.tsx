import React from "react";
import { Row } from "react-bootstrap";
import { studyModel } from "../../../../../models/dataset";
import DatasetDetailsLayout from "./datasetdetailslayout/datasetDetailsLayout";
import { JournalMedical } from "react-bootstrap-icons";

interface dataSetStudiesProps {
  studiesList: studyModel[];
}

const DatasetStudies = (props: dataSetStudiesProps) => {
  return (
    <DatasetDetailsLayout
      icon={<JournalMedical size={32} />}
      content={
        props.studiesList !== undefined ? (
          <div>
            {props.studiesList.map((study, index) => {
              return (
                <Row key={index}>
                  <p className="mb-0">
                    <strong>
                      Part of study:&nbsp;
                      {study.accession}
                    </strong>
                    <br />
                    {study.title}
                    <br />
                    Publication: PLACEHOLDER
                  </p>
                </Row>
              );
            })}
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
