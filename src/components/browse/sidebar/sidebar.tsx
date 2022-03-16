import React, { Dispatch, SetStateAction, useState } from "react";
import Search from "./searchbar";
import Filter from "./filter";
import { Row, Col, Button } from "react-bootstrap";
import { facetModel, facetFilterModel } from "../../../models/facets";
import { searchResponseModel } from "../../../models/dataset";
import { getDatasetsSearchResp } from "../../../api/browse";
import { useNavigate } from 'react-router-dom'

interface sidebarProps {
  facetList: facetModel[] | null;
  setSearchResp: Dispatch<SetStateAction<searchResponseModel | null>>;
  searchKeyword: string;
  limit: number;
  setSearchKeyword: Dispatch<SetStateAction<string>>;
  setFilterDict: Dispatch<SetStateAction<facetFilterModel[]>>;
  filterDict: facetFilterModel[];
  searchParams: any
  setSearchParams: any
  page: number
  setPage: Dispatch<SetStateAction<number>>;
}

const Sidebar = (props: sidebarProps) => {
  let navigate = useNavigate();
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
    props.setPage(0)
    navigate(`?p=1`)
  };

  const getFilterString = () => {
    let filterString = ''
    for (var item of props.filterDict) {
      filterString += (item.key + ":" + item.value + ";")
    }
    return filterString.slice(0, -1)
  }

  const handleFilter = () => {
    getDatasetsSearchResp(
      props.setSearchResp,
      props.filterDict,
      props.searchKeyword,
      skip,
      props.limit
    );
    if (props.searchParams.f === undefined) {
      props.setSearchParams({ f: getFilterString() })
      props.setSearchParams({ p: 1 })
      props.setPage(0)
      if (props.searchKeyword === '') {
        if (getFilterString() === '') {
          navigate(`?p=1`)
        } else {
          navigate(`?f=${getFilterString()}&p=1`)
        }
      } else {
        if (getFilterString() === '') {
          navigate(`?q=${props.searchKeyword}&p=1`)
        } else {
          navigate(`?q=${props.searchKeyword}&f=${getFilterString()}&p=1`)
        }
      }
    } else {
      if (props.searchParams.q === '') {
        if (getFilterString() === '') {
          navigate(`?p=${props.searchParams.p}`)
        } else {
          navigate(`?f=${getFilterString()}&p=${props.searchParams.p}`)
        }
      } else {
        if (getFilterString() === '') {
          navigate(`?q=${props.searchParams.q}&p=${props.searchParams.p}`)
        } else {
          navigate(`?q=${props.searchParams.q}&f=${getFilterString()}&p=${props.searchParams.p}`)
        }

      }
    }
  };

  return (
    <div>
      <Row>
        <Search
          searchKeyword={props.searchKeyword}
          setSearchKeyword={props.setSearchKeyword}
          setSearchResp={props.setSearchResp}
          limit={props.limit}
          searchParams={props.searchParams}
          setSearchParams={props.setSearchParams}
          setPage={props.setPage}
          filterDict={props.filterDict}
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
