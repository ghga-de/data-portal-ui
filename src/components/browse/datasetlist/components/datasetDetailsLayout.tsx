import React from "react";
import { Row, Col } from "react-bootstrap";

interface dataSetDetailsLayoutProps {
  icon: JSX.Element;
  content: any;
}

const DatasetDetailsLayout = (props: dataSetDetailsLayoutProps) => {
  return (
    <Col>
    <Row className="text-dark">
      <Col lg md sm xl xs xxl="auto" className="text-dark pe-0 pt-2">
        {props.icon}
      </Col>
      <Col>
        {props.content}
      </Col>
    </Row>
    </Col>
  );
};

export default DatasetDetailsLayout
