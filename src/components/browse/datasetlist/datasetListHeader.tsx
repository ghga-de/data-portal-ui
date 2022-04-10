import React from "react";
import { Badge, Row, Col, } from "react-bootstrap";

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
      <Col lg={10} md={10} sm={10} xl={10} xs={10} xxl={10} className="pe-0">
        {getFilterParamsList().map((item) => (
          <Badge
            key={item}
            className="p-2 me-2 mb-1 overflow-hidden fs-9 rounded-0 bg-white text-dark border"
            style={{
              maxWidth: "200px",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
            title={item}
          >
            {item}
          </Badge>
        ))}
      </Col>
      <Col lg={2} md={2} sm={2} xl={2} xs={2} xxl={2} className="text-end">
        <Badge className="py-3 px-3 bg-secondary rounded-0">
          Datasets Found: {props.dsCount}
        </Badge>
      </Col>
    </Row>
  );
};

export default DatasetListHeader;
