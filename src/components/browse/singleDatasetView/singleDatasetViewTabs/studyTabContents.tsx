import {
  faArrowUpRightFromSquare,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tab, Row, Col, Button } from "react-bootstrap";
import { DatasetEmbeddedModel } from "../../../../models/dataset";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";

interface StudyTabContentsProps {
  details: DatasetEmbeddedModel;
}

const StudyTabContents = (props: StudyTabContentsProps) => {
  const study = props.details.study;

  return (
    <Tab.Pane eventKey="0" className="h-100">
      <PerfectScrollbar>
        {study ? (
          <div className="text-break pb-4">
            <Row className="flex-row-reverse w-100">
              <Col className="pe-0">
                {study.ega_accession ? (
                  <Button
                    href={
                      "https://ega-archive.org/studies/" + study.ega_accession
                    }
                    target="_blank"
                    variant="quinary"
                    className="float-end fs-7 py-2 mb-2 ms-4 shadow-md-dark"
                  >
                    <Row className="p-0 m-0 align-items-center text-start">
                      <Col xs={"auto"} className="ps-0 pe-1 m-0">
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                      </Col>
                      <Col className="px-0 m-0 lh-1">
                        <strong>Visit EGA Study Page</strong>
                      </Col>
                    </Row>
                  </Button>
                ) : (
                  <></>
                )}
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
              {study.accession}
            </p>
            <p className="mb-4">
              <strong>Title: </strong>
              {study.title}
            </p>
            <p>
              <strong>Description: </strong>
              {study.description}
            </p>
            <p className="mb-4">
              <strong>Types: </strong>
              <span className="text-capitalize">
                {(study.types || [])
                  .map((x) => x.toLowerCase().replace(/_/g, " "))
                  .join(", ")}
              </span>
            </p>
          </div>
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
