import React, { Dispatch, SetStateAction } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { searchResponseModel } from "../../../models/dataset";
import { facetFilterModel } from "../../../models/facets";
import { getDatasetsSearchResp } from "../../../api/browse";
import { getFilterString } from "../../../utils/utils";
import { useNavigate } from 'react-router-dom'
import { scrollUp } from "../../../utils/utils";

interface searchbarProps {
  setSearchResults: Dispatch<SetStateAction<searchResponseModel | null>>;
  setSearchKeyword: Dispatch<SetStateAction<string>>;
  searchKeyword: string;
  limit: number;
  searchParams: any
  setSearchParams: any
  setPage: Dispatch<SetStateAction<number>>;
  filterDict: facetFilterModel[];
}

const Searchbar = (props: searchbarProps) => {
  let navigate = useNavigate();
  const skip = 0;

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    getDatasetsSearchResp(props.setSearchResults, props.filterDict, props.searchKeyword, skip, props.limit);
    props.setSearchParams({ p: 1 })
    props.setPage(0)
    if (props.searchKeyword === '' || props.searchKeyword === null) {
      if (getFilterString(props.filterDict) === '') {
        navigate(`?p=1`)
      } else {
        navigate(`?f=${getFilterString(props.filterDict)}&p=1`)
      }
    } else {
      if (getFilterString(props.filterDict) === '') {
        navigate(`?q=${props.searchKeyword}&p=1`)
      } else {
        navigate(`?q=${props.searchKeyword}&f=${getFilterString(props.filterDict)}&p=1`)
      }
    }
  };

  return (
    <Container className="mb-3">
      <Form onSubmit={(event) => { scrollUp(); handleSearch(event); }}>
        <Form.Group>
          <div className="input-group p-1">
            <Button type="submit" className="bg-primary">
              <FontAwesomeIcon icon={faMagnifyingGlass} transform="grow-4" className="text-white" />
            </Button>
            <Form.Control
              value={props.searchKeyword}
              id="searchInput"
              type="text"
              placeholder="Search datasets"
              onChange={(event) => props.setSearchKeyword(event.target.value)}
            />
          </div>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default Searchbar;
