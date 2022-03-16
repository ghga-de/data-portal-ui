import React, { Dispatch, SetStateAction } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { searchResponseModel } from "../../../models/dataset";
import { facetFilterModel } from "../../../models/facets";
import { getDatasetsSearchResp } from "../../../api/browse";
import { useNavigate } from 'react-router-dom'

interface searchbarProps {
  setSearchResp: Dispatch<SetStateAction<searchResponseModel | null>>;
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

  const getFilterString = () => {
    let filterString = ''
    for (var item of props.filterDict) {
      filterString += (item.key + ":" + item.value + ";")
    }
    return filterString.slice(0, -1)
  }

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    getDatasetsSearchResp(props.setSearchResp, props.filterDict, props.searchKeyword, skip, props.limit);
    if (props.searchParams.q === undefined) {
      props.setSearchParams({ q: props.searchKeyword })
      props.setSearchParams({ p: 1 })
      props.setSearchParams({ f: getFilterString() })
      props.setPage(0)
      if (getFilterString() === '') {
        if (props.searchKeyword === '') {
          navigate(`?p=1`)
        } else {
          navigate(`?q=${props.searchKeyword}&p=1`)
        }
      } else {
        if (props.searchKeyword === '') {
          navigate(`?f=${getFilterString()}&p=1`)
        } else {
          navigate(`?q=${props.searchKeyword}&f=${getFilterString()}&p=1`)
        }
      }
    } else {
      if (getFilterString() === '') {
        if (props.searchParams.q === null) {
          navigate(`?p=${props.searchParams.p}`)
        } else {
          navigate(`?q=${props.searchParams.q}&p=${props.searchParams.p}`)
        }
      } else {
        if (props.searchParams.q === null) {
          navigate(`?f=${getFilterString()}&p=${props.searchParams.p}`)
        } else {
          navigate(`?q=${props.searchParams.q}&f=${getFilterString()}&p=${props.searchParams.p}`)
        }
      }
    }
  };

  return (
    <Container className="mb-3">
      <Form onSubmit={(event) => { handleSearch(event) }}>
        <Form.Group>
          <div className="input-group p-1">
            <Button type="submit" className="bg-primary">
              <Search />
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
