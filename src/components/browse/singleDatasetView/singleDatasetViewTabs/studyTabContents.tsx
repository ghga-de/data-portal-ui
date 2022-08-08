import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tab } from "react-bootstrap";
import { datasetEmbeddedModel } from "../../../../models/dataset";

interface StudyTabContentsProps {
  details: datasetEmbeddedModel;
}

const StudyTabContents = (props: StudyTabContentsProps) => {
  return (
    <Tab.Pane eventKey="0">
      {props.details.has_study.map((x) => {
        return (
          <div key={x.id}>
            <h5 className="mb-4">
              <FontAwesomeIcon
                icon={faBook}
                pull="left"
                style={{
                  width: "25px",
                  height: "25px",
                  backgroundColor: "rgba(214,95,48,0.2)",
                  padding: "4px",
                }}
                className="text-secondary me-3 fs-4 rounded"
              />
              <strong>Study</strong>
            </h5>
            <p className="mb-4">
              <strong>ID: </strong>
              {x.accession}
            </p>
            <p className="mb-4">
              <strong>Title: </strong>
              {x.title}
            </p>
            <p className="mb-4">
              <strong>Type: </strong>
              <span className="text-capitalize">{x.type}</span>
            </p>
            <p className="mb-4">
              <strong>Affiliation: </strong>
              {x.has_attribute.length > 0 ? (
                x.has_attribute.find((y) => y.key === "centerName") ? (
                  <>
                    {x.has_attribute.find((y) => y.key === "centerName")?.value}
                  </>
                ) : (
                  <>N/A</>
                )
              ) : (
                <>N/A</>
              )}
            </p>
            <p>
              <strong>Description: </strong>
              {props.details.description}
            </p>
          </div>
        );
      })}
    </Tab.Pane>
  );
};

export default StudyTabContents;
