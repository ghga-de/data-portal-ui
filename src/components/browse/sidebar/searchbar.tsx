import React, { Dispatch, SetStateAction } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { searchResponseModel } from "../../../models/dataset";
import { getDatasetsSearchResp } from "../../../api/browse";

interface searchbarProps {
  setSearchResp: Dispatch<SetStateAction<searchResponseModel | null>>;
  setSearchKeyword: Dispatch<SetStateAction<string>>;
  searchKeyword: string;
  limit: number;
}

const Searchbar = (props: searchbarProps) => {

  const skip = 0;
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    getDatasetsSearchResp(props.setSearchResp, [], props.searchKeyword, skip, props.limit);
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
