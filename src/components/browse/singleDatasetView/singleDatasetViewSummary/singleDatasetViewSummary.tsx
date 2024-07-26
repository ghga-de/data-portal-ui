import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Col, Row } from "react-bootstrap";
import { DatasetEmbeddedModel } from "../../../../models/dataset";

interface SingleDatasetViewSummaryProps {
  details: DatasetEmbeddedModel;
}

/** Section at the top of dataset details page where the summary of dataset displayed. */
const SingleDatasetViewSummary = (props: SingleDatasetViewSummaryProps) => {
  const study = props.details.study;
  return (
    <div>
      <h5>
        <strong>{props.details.title}</strong>
      </h5>
      <p className="mb-0">Dataset ID | {props.details.accession}</p>
      {props.details.ega_accession ? (
        <p className="mb-0">EGA ID | {props.details.ega_accession}</p>
      ) : (
        <></>
      )}
      <div className="fs-7 mt-3">
        <Row className="me-0 mb-2 w-100 mx-0">
          <Col xs={"auto"} className="px-0">
            Study Type |{" "}
          </Col>
          <Col className="ps-1 pe-0">
            {study.types
              ? study.types.map((x) => (
                  <Badge
                    key={x}
                    className="py-1 px-2 fw-normal text-capitalize me-2"
                  >
                    {x.toLowerCase().replace(/_/g, " ")}
                  </Badge>
                ))
              : ""}
          </Col>
        </Row>
        <Row className="me-0 mb-3 w-100 mx-0">
          <Col xs={"auto"} className="px-0">
            Dataset Type |{" "}
          </Col>
          <Col className="ps-1 pe-0">
            {props.details.types?.map((x) => (
              <Badge
                key={x}
                className="py-1 px-2 fw-normal text-capitalize me-0 text-wrap text-start me-2"
              >
                {x}
              </Badge>
            ))}
          </Col>
        </Row>
      </div>
      <Row className="fs-7 w-100 mx-0">
        <Col>
          <strong>
            <FontAwesomeIcon
              icon={faFileLines}
              className="text-secondary me-2"
            />
            Description
          </strong>
        </Col>
      </Row>
      <Row className="fs-7 my-2 border border-1 border-dark border-end-0 border-start-0 pt-2 pb-3 w-100 mx-0 mb-4">
        <Col className="">{props.details.description}</Col>
      </Row>
    </div>
  );
};

export default SingleDatasetViewSummary;
