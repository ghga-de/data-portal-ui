import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tab, Row, Col } from "react-bootstrap";
import { DatasetEmbeddedModel } from "../../../../models/dataset";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";

interface StudyTabContentsProps {
  details: DatasetEmbeddedModel;
}

const StudyTabContents = (props: StudyTabContentsProps) => {
  return (
    <Tab.Pane eventKey="0" className="h-100">
      <PerfectScrollbar>
        {props.details.studies ? (
          props.details.studies.map((x) => {
            return (
              <div key={x.accession} className="text-break pb-4">
                <Row className="flex-row-reverse w-100">
                  <Col className="pe-0">
                    <h5 className="mb-4 d-flex align-items-center clear-end">
                      <FontAwesomeIcon
                        icon={faBook}
                        pull="left"
                        style={{
                          width: "30px",
                          height: "30px",
                          backgroundColor: "rgba(214,95,48,0.2)",
                          padding: "8px",
                        }}
                        className="text-secondary me-3 fs-4 rounded"
                      />
                      <strong>Study</strong>
                    </h5>
                  </Col>
                </Row>
                <p className="mb-4">
                  <strong>ID: </strong>
                  {x.accession}
                </p>
                <p className="mb-4">
                  <strong>Title: </strong>
                  {x.title}
                </p>
                <p>
                  <strong>Description: </strong>
                  {x.description}
                </p>
                <p className="mb-4">
                  <strong>Type: </strong>
                  <span className="text-capitalize">{x.type}</span>
                </p>
              </div>
            );
          })
        ) : (
          <>
            <h5 className="mb-4 d-flex align-items-center">
              <FontAwesomeIcon
                icon={faBook}
                pull="left"
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: "rgba(214,95,48,0.2)",
                  padding: "8px",
                }}
                className="text-secondary me-3 fs-4 rounded"
              />
              <strong>Study</strong>
            </h5>
            <p className="mb-4">No study found.</p>
          </>
        )}
      </PerfectScrollbar>
    </Tab.Pane>
  );
};

export default StudyTabContents;
