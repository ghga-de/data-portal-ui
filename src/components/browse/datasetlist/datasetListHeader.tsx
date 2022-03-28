import React from "react";
import { Badge, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTurnDown } from "@fortawesome/free-solid-svg-icons";

interface dataSetListHeaderProps {
  dsCount: number;
  searchParams: any;
}

const DatasetListHeader = (props: dataSetListHeaderProps) => {
  const getFilterParamsList = () => {
    let filterParamsList = [];
    if (
      props.searchParams.get("f") !== undefined &&
      props.searchParams.get("f") !== null
    ) {
      let searchParamsList = props.searchParams.get("f").split(";");
      for (var item of searchParamsList) {
        filterParamsList.push(item.replace(":", " | "));
      }
    }
    return filterParamsList;
  };

  return (
    <Row className="mt-3 pe-4">
      <Col lg md sm xl xs xxl="2" className="pe-0">
        <Badge className="p-2 bg-secondary">
          Datasets Found: {props.dsCount}
        </Badge>
      </Col>
      <Col lg md sm xl xs xxl="8" className="pe-0">
        {getFilterParamsList().map((item) => (
          <Badge key={item} className="p-2 bg-primary me-2">
            {item}
          </Badge>
        ))}
      </Col>
      <Col className="text-end ps-0">
        <a href="/browse" className="text-reset fs-7 mt-2">
          Back to all datasets&nbsp;
          <FontAwesomeIcon
            icon={faArrowTurnDown}
            transform="rotate-90 flip-v"
          />
        </a>
      </Col>
    </Row>
  );
};

export default DatasetListHeader;
