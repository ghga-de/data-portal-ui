import React, { Dispatch, SetStateAction } from "react";
import { Badge, Row, Col, CloseButton } from "react-bootstrap";
import { facetFilterModel, facetModel } from "../../../models/facets";
import { searchResponseModel } from "../../../models/dataset";
import { useNavigate } from "react-router-dom";
import { handleSearch, handleFilter } from "../../../utils/utils";

interface dataSetListHeaderProps {
  dsCount: number;
  searchParams: URLSearchParams;
  facets: facetModel[] | null;
  setSearchResults: Dispatch<SetStateAction<searchResponseModel | null>>;
  filterDict: facetFilterModel[];
  setSearchKeyword: Dispatch<SetStateAction<string>>;
  limit: number;
  skip: number;
  setSearchParams: any;
  setPage: Dispatch<SetStateAction<number>>;
  setFilterDict: any;
  searchKeyword: string;
  setAppliedFilterDict: any;
  appliedFilterDict: any;
}

const DatasetListHeader = (props: dataSetListHeaderProps) => {
  const navigate = useNavigate();
  const getFilterParamsList = () => {
    let filterParamsList = [];
    let searchParams = props.searchParams.get("f");
    if (searchParams !== undefined && searchParams !== null) {
      let searchParamsList = searchParams.split(";");
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

  const clearFilter = (item: number) => {
    props.filterDict.splice(item, 1);
    navigate(
      handleFilter(
        props.filterDict,
        props.searchKeyword,
        props.limit,
        props.setSearchParams,
        props.setPage,
        props.setSearchResults,
        props.filterDict,
        props.setFilterDict
      )
    );
    console.log(props.filterDict);
  };

  return (
    <Row className="mt-1">
      <Col lg={7} md={7} sm={7} xl={7} xs={7} xxl={7} className="ps-3 offset-3">
        <div className="ps-3 pe-0">
          {props.searchParams.get("q") !== undefined &&
          props.searchParams.get("q") !== null ? (
            <Badge
              key={props.searchParams.get("q")}
              className="py-1 m-0 me-2 overflow-hidden fs-9 text-white border"
              style={{
                maxWidth: "200px",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              <span>
              <CloseButton
                variant="white"
                className="pt-2"
                onClick={() => {
                  props.setSearchKeyword("");
                  navigate(
                    handleSearch(
                      props.setSearchResults,
                      props.filterDict,
                      "",
                      props.limit,
                      props.setSearchParams,
                      props.setPage
                    )
                  );
                }}
              />
              <span className="px-1 mb-0">Keyword: {props.searchParams.get("q")}</span>
              </span>
            </Badge>
          ) : (
            <></>
          )}
          {getFilterParamsList().map((item, idx) => (
            <Badge
              key={item}
              className="py-1 m-0 me-2 overflow-hidden fs-9 text-white border text-capitalize"
              style={{
                maxWidth: "200px",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
              title={item}
            >
              <span>
                <CloseButton
                  variant="white"
                  onClick={() => clearFilter(idx)}
                  className="pt-2"
                />
                <span className="px-1 mb-0">{item}</span>
              </span>
            </Badge>
          ))}
        </div>
      </Col>
      <Col lg={2} md={2} sm={2} xl={2} xs={2} xxl={2} className="text-end pe-4">
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
