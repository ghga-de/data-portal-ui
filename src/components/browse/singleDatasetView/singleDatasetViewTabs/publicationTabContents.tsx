import {
  faBookOpen,
  faCircleInfo,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tab, Button, Row, Col } from "react-bootstrap";
import { DatasetEmbeddedModel } from "../../../../models/dataset";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";

interface PublicationTabContentsProps {
  details: DatasetEmbeddedModel;
}

const PublicationTabContents = (props: PublicationTabContentsProps) => {
  let num_publications: number = 0;
  return (
    <Tab.Pane eventKey="2" className="h-100">
      <PerfectScrollbar>
        {props.details.studies?.map((y) => {
          if (y.publications?.length > 0) {
            return y.publications?.map((x) => {
              num_publications += 1;
              return (
                <div key={x.accession} className="text-break">
                  <Row className="flex-row-reverse w-100">
                    {x.doi !== null ? (
                      <Col xs={12} sm={"auto"} className="mb-2 mb-sm-0">
                        <Button
                          href={"https://doi.org/" + x.doi}
                          target="_blank"
                          variant="white"
                          className="fs-7 py-2 mb-2 text-secondary shadow-md-dark border-secondary"
                        >
                          <Row className="p-0 m-0 align-items-center text-start">
                            <Col className="p-0 m-0 col-3 ">
                              <FontAwesomeIcon icon={faLink} />
                            </Col>
                            <Col className="p-0 m-0 lh-1">
                              <strong>Visit Publication</strong>
                            </Col>
                          </Row>
                        </Button>
                      </Col>
                    ) : (
                      <></>
                    )}
                    <Col className="pe-0">
                      <h5 className="mb-4 d-flex align-items-center">
                        <FontAwesomeIcon
                          icon={faBookOpen}
                          pull="left"
                          style={{
                            width: "30px",
                            height: "30px",
                            backgroundColor: "rgba(214,95,48,0.2)",
                            padding: "8px",
                          }}
                          className="text-secondary me-3 fs-4 rounded"
                        />
                        <strong>Publication</strong>
                      </h5>
                    </Col>
                  </Row>
                  <p>
                    <strong>Title: </strong>
                    {x.title}
                  </p>
                  <p>
                    <strong>Author: </strong>
                    {x.author}
                    &nbsp;
                    <strong>Journal: </strong>
                    {x.journal}
                    &nbsp;
                    <strong>Year: </strong>
                    {x.year}
                  </p>
                  <p>
                    <strong>Abstract: </strong>
                    {(x.abstract || "").split("\n").map((x, idx) => (
                      <span key={"pub_abstract_" + idx}>
                        {x}
                        <br />
                      </span>
                    ))}
                  </p>
                </div>
              );
            });
          } else {
            return <span key={y.accession}></span>;
          }
        })}
        {num_publications === 0 ? (
          <div className="p-2 fs-5 fw-bold">
            <FontAwesomeIcon icon={faCircleInfo} className="text-info" />
            &nbsp; No publications found.
          </div>
        ) : (
          <></>
        )}
      </PerfectScrollbar>
    </Tab.Pane>
  );
};

export default PublicationTabContents;
