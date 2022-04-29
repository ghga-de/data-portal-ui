import React, { Dispatch, SetStateAction } from "react";
import { Badge, Row, Col, CloseButton } from "react-bootstrap";
import { facetModel } from "../../../models/facets";
import { getDatasetsSearchResp } from "../../../api/browse";
import { searchResponseModel } from "../../../models/dataset";

interface dataSetListHeaderProps {
  dsCount: number;
  searchParams: any;
  facets: facetModel[] | null;
  setSearchResults: Dispatch<SetStateAction<searchResponseModel | null>>;
  limit: number;
  skip: number;
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

  const closeSearch = () => {
    getDatasetsSearchResp(props.setSearchResults, [], "*", props.skip, props.limit);
    console.log("clear search")
  }

  const clearFilter = (item: string) => {
    console.log(item)
  }

  return (
    <Row className="mt-1 pe-3 offset-3 ps-3">
      <Col lg={7} md={7} sm={7} xl={7} xs={7} xxl={7}>
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
            <CloseButton variant="white" onClick={() => clearFilter(item)} />
          </Badge>
        ))}
        {props.searchParams.get("q") !== undefined &&
          props.searchParams.get("q") !== null
          ? <Badge
            key={props.searchParams.get("q")}
            className="py-2 m-0 me-2 overflow-hidden fs-9 text-white border"
            style={{
              maxWidth: "200px",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {props.searchParams.get("q")}
            <CloseButton variant="white" onClick={() => closeSearch()} />
          </Badge>
          : <div />}
      </Col>
      <Col lg={2} md={2} sm={2} xl={2} xs={2} xxl={2} className="text-end pe-4">
        <Badge className="py-2 px-2 bg-secondary me-1">
          {props.searchParams.get("f") !== undefined &&
            props.searchParams.get("f") !== null
            ? "Datasets Found:"
            : "Total Datasets:"}
          &nbsp;{props.dsCount}
        </Badge>
      </Col>
    </Row>
  );
};

export default DatasetListHeader;
