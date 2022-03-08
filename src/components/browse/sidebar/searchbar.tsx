import React, { Dispatch, SetStateAction } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { searchResponseModel } from "../../../models/dataset";
import { getDatasetsSearchResp } from "../../../api/browse";
import { useNavigate } from 'react-router-dom'

interface searchbarProps {
  setSearchResp: Dispatch<SetStateAction<searchResponseModel | null>>;
  setSearchKeyword: Dispatch<SetStateAction<string>>;
  searchKeyword: string;
  limit: number;
  searchParams: any
  setSearchParams: any
}

const Searchbar = (props: searchbarProps) => {
  let navigate = useNavigate();
  const skip = 0;
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    getDatasetsSearchResp(props.setSearchResp, [], props.searchKeyword, skip, props.limit);
    if (props.searchParams.q === undefined) {
      props.setSearchParams({ q: props.searchKeyword })
      navigate(`?q=${props.searchKeyword}`)
    } else {
      navigate(`?p=${props.searchParams.q}`)
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
