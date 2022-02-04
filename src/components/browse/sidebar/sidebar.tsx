import React, { Dispatch, SetStateAction, useState } from "react";
import Search from "./searchbar";
import Filter from "./filter";
import { Row, Col, Button } from "react-bootstrap";
import { facetModel } from "../../../models/facets";
import { searchResponseModel } from "../../../models/dataset";

interface sidebarProps {
  facetList: facetModel[] | null;
  setSearchResp: Dispatch<SetStateAction<searchResponseModel | null>>;
  searchKeyword: string
  setSearchKeyword: any
  setFilterDict: any
}

const Sidebar = (props: sidebarProps) => {
  const [check, setCheck] = useState(false)
  const handleClear = () => {
    setCheck(false)
  };

  const handleFilter = () => {
    console.log("get filtered datasets");
  };

  return (
    <div>
      <Row>
        <Search searchKeyword={props.searchKeyword}
          setSearchKeyword={props.setSearchKeyword}
          setSearchResp={props.setSearchResp} />
      </Row>
      {props.facetList === null || props.facetList.length < 1 ? null : (
        <div className="bg-light border p-2 rounded-3">
          <Row>
            {props.facetList.map((facet, index) => (
              <Filter key={index}
                facet={facet}
                check={check}
                setCheck={setCheck}
              />
            ))}
          </Row>
          <Row className="mb-2">
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
