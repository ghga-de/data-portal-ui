import React from "react";
import { Badge, Row, Col } from "react-bootstrap";
import { facetModel } from "../../../models/facets";

interface dataSetListHeaderProps {
  dsCount: number;
  searchParams: any;
  facets: facetModel[] | null;
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
        const itemKey = item.split(":")[0];
        var itemPretty = item.replace(":", ": ");
        if (props.facets !== null) {
          const findResult: facetModel | undefined = props.facets.find(
            (x) => x.key === itemKey
          );
          if (findResult !== undefined) {
            var facetName = findResult.name;
            if (facetName !== undefined) {
              itemPretty = facetName + ": " + item.split(":")[1];
            }
          }
        }
        filterParamsList.push(itemPretty);
      }
    }
    return filterParamsList;
  };

  return (
    <Row className="mt-1">
      <Col lg={7} md={7} sm={7} xl={7} xs={7} xxl={7} className="ps-3 offset-3">
        <div className="ps-3 pe-0">
        {getFilterParamsList().map((item) => (
          <Badge
            key={item}
            className="py-2 m-0 me-2 overflow-hidden fs-9 text-white border"
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
        </div>
      </Col>
      <Col lg={2} md={2} sm={2} xl={2} xs={2} xxl={2} className="text-end pe-2">
        <Badge className="py-2 px-2 bg-secondary me-1">
          {props.searchParams.get("f") !== undefined &&
          props.searchParams.get("f") !== null
            ? "Datasets Found:"
            : "Total Datasets:"}
          &nbsp;{props.dsCount !== -1 ? props.dsCount : 0}
        </Badge>
      </Col>
    </Row>
  );
};

export default DatasetListHeader;
