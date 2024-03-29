import React from "react";
import { Row, Col } from "react-bootstrap";

interface DataSetDetailsLayoutProps {
  icon: JSX.Element;
  content: any;
}

/** Standard layout component for the information displayed in the Dataset summary. */
const DatasetDetailsLayout = (props: DataSetDetailsLayoutProps) => {
  return (
    <Col className="me-2 pb-4 mt-2" style={{ minHeight: "100px" }}>
      <Row className="w-100 flex-nowrap">
        <Col xs={"auto"} className="pe-2 pt-2 fs-1 text-muted">
          {props.icon}
        </Col>
        <Col className="">{props.content}</Col>
      </Row>
    </Col>
  );
};

export default DatasetDetailsLayout;
