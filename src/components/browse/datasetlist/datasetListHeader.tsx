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
        const itemKey = item.split(":")[0]
        var itemPretty = item.replace(":", ": ");
        if (props.facets !== null) {
          const findResult: facetModel | undefined = props.facets.find(
            x => x.key === itemKey
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
