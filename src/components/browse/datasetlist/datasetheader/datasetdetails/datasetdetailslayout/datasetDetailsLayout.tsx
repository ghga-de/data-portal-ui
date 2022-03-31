import React from "react";
import { Row, Col } from "react-bootstrap";

interface dataSetDetailsLayoutProps {
  icon: JSX.Element;
  content: any;
}

const DatasetDetailsLayout = (props: dataSetDetailsLayoutProps) => {
  return (
    <Col>
    <Row>
      <Col lg="auto" md="auto" sm="auto" xl="auto" xs="auto" xxl="auto" className="pe-0 pt-2 text-muted fs-2">
        {props.icon}
      </Col>
      <Col className="text-dark">
        {props.content}
      </Col>
    </Row>
    </Col>
  );
};

export default DatasetDetailsLayout
