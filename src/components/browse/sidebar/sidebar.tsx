import React, { Dispatch, SetStateAction, useState } from "react";
import Search from "./searchbar";
import Filter from "./filter";
import { Row, Col, Button } from "react-bootstrap";
import { facetModel, facetFilterModel } from "../../../models/facets";
import { searchResponseModel } from "../../../models/dataset";
import { getDatasetsSearchResp } from "../../../api/browse";

interface sidebarProps {
  facetList: facetModel[] | null;
  setSearchResp: Dispatch<SetStateAction<searchResponseModel | null>>;
  searchKeyword: string;
  limit: number;
  setSearchKeyword: Dispatch<SetStateAction<string>>;
  setFilterDict: Dispatch<SetStateAction<facetFilterModel[]>>;
  filterDict: facetFilterModel[];
}

const Sidebar = (props: sidebarProps) => {
  const [check, setCheck] = useState<Map<string, boolean>>(
    new Map<string, boolean>()
  );
  const skip = 0;
  const handleClear = () => {
    getDatasetsSearchResp(props.setSearchResp, [], "*", skip, props.limit);
    check.forEach((value: boolean, key: string) => {
      setCheck(check.set(key, false));
    });
    props.setFilterDict([]);
    props.setSearchKeyword("")
  };

  const handleFilter = () => {
    getDatasetsSearchResp(
      props.setSearchResp,
      props.filterDict,
      props.searchKeyword,
      skip,
      props.limit
    );
  };

  return (
    <div>
      <Row>
        <Search
          searchKeyword={props.searchKeyword}
          setSearchKeyword={props.setSearchKeyword}
          setSearchResp={props.setSearchResp}
          limit={props.limit}
        />
      </Row>
      {props.facetList === null || props.facetList.length < 1 ? null : (
        <div className="bg-light border p-2 rounded-3 pt-3">
          <Row className="position-relative w-100 px-0 mx-0">
            {props.facetList.sort((a, b) => b.key < a.key ? 1 : -1).map((facet, index) => (
              <Filter
                facet={facet}
                key={index}
                check={check}
                setCheck={setCheck}
                setFilterDict={props.setFilterDict}
                searchKeyword={props.searchKeyword}
                filterDict={props.filterDict}
              />
            ))}
          </Row>
          <Row className="mb-2 mt-3">
            <Col className="offset-2" xs md lg={4}>
              <Button className="btn-warning w-100" onClick={handleClear}>
                Clear
              </Button>
            </Col>
            <Col xs md lg={6} className="">
              <Button className="btn-success w-100" onClick={handleFilter}>
                Filter
              </Button>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
