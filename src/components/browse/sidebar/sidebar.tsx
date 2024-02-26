import React, { Dispatch, SetStateAction } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { URLSearchParamsInit, useNavigate } from "react-router-dom";
import { querySearchService } from "../../../api/browse";
import { SearchResponseModel } from "../../../models/dataset";
import { FacetFilterModel, FacetModel } from "../../../models/facets";
import { scrollUp } from "../../../utils/utils";
import Filter from "./filter";
import Searchbar from "./searchbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { handleFilterAndSearch } from "../sharedFunctions/sharedFunctions";

interface SidebarProps {
  facetList: FacetModel[] | null;
  setSearchResults: Dispatch<SetStateAction<SearchResponseModel | null>>;
  searchKeyword: string;
  limit: number;
  setSearchKeyword: Dispatch<SetStateAction<string>>;
  setFilterDict: Dispatch<SetStateAction<FacetFilterModel[]>>;
  filterDict: FacetFilterModel[];
  searchParams: URLSearchParams;
  setSearchParams: (
    nextInit: URLSearchParamsInit,
    navigateOptions?: { replace?: boolean | undefined; state?: any } | undefined
  ) => void;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  setAppliedFilterDict: Dispatch<SetStateAction<FacetFilterModel[]>>;
  appliedFilterDict: FacetFilterModel[];
  setCheck: Dispatch<SetStateAction<Map<string, boolean>>>;
  check: Map<string, boolean>;
  setOpenFilter: any;
}

/** Section at the side of Browse page. It contains searchbar and filters form. */
const Sidebar = (props: SidebarProps) => {
  let navigate = useNavigate();
  const skip = 0;

  React.useEffect(() => {
    const displayFilters = () => {
      if (props.check.size === 0) {
        for (var item of props.filterDict) {
          props.setCheck(props.check.set(item.key + ":" + item.value, true));
          props.setAppliedFilterDict(props.appliedFilterDict.concat(item));
        }
      }
    };
    displayFilters();
  });

  const handleClear = () => {
    querySearchService(
      props.setSearchResults,
      [],
      "*",
      skip,
      props.limit,
      "EmbeddedDataset"
    );
    props.check.forEach((value: boolean, key: string) => {
      props.setCheck(props.check.set(key, false));
    });
    props.setFilterDict([]);
    props.setAppliedFilterDict([]);
    props.setSearchKeyword("");
    props.setPage(0);
    navigate(`?p=1`);
  };

  return (
    <div className="border rounded border-light p-2 mt-3 shadow">
      <Row>
        <Searchbar
          searchKeyword={props.searchKeyword}
          setSearchKeyword={props.setSearchKeyword}
          setSearchResults={props.setSearchResults}
          limit={props.limit}
          searchParams={props.searchParams}
          filterDict={props.filterDict}
          setFilterDict={props.setFilterDict}
          setPage={props.setPage}
        />
      </Row>
      {props.facetList === null || props.facetList.length === 0 ? null : (
        <Row className="position-relative w-100 px-1 mx-0">
          {props.facetList
            .sort((a, b) => (b.key < a.key ? 1 : -1))
            .map((facet, index) => (
              <Filter
                facet={facet}
                key={index}
                check={props.check}
                setCheck={props.setCheck}
                searchKeyword={props.searchKeyword}
                appliedFilterDict={props.appliedFilterDict}
                setAppliedFilterDict={props.setAppliedFilterDict}
              />
            ))}
        </Row>
      )}
      <Row className="mb-2 mt-lg-3 justify-content-end">
        <Col>
          <Button
            className="w-100 rounded border-2 shadow-md-dark"
            variant="outline-secondary"
            onClick={() => {
              props.setOpenFilter(false);
              handleClear();
              scrollUp();
            }}
          >
            Clear
          </Button>
        </Col>
        <Col>
          <Button
            variant="secondary"
            className="w-100 rounded text-white border-2 shadow-md-dark"
            onClick={() => {
              props.setOpenFilter(false);
              navigate(
                handleFilterAndSearch(
                  props.setSearchResults,
                  props.filterDict,
                  props.searchKeyword,
                  props.limit,
                  0,
                  0,
                  props.setPage,
                  props.setFilterDict,
                  props.appliedFilterDict
                )
              );
              scrollUp();
            }}
          >
            Filter
          </Button>
        </Col>
        <Col xs={12} className="d-flex d-lg-none">
          <Button
            variant="outline-gray"
            className="w-100 rounded mt-3"
            onClick={() => {
              props.setOpenFilter(false);
              scrollUp();
            }}
          >
            <FontAwesomeIcon icon={faBars} />
            &nbsp;Close Filters
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Sidebar;
