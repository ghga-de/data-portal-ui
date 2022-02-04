import React, { Dispatch, SetStateAction } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { searchResponseModel } from "../../../models/dataset";
import { getDatasetsSearchResp } from "../../../api/browse";

interface searchbarProps {
  setSearchResp: Dispatch<SetStateAction<searchResponseModel | null>>;
  setSearchKeyword: any;
  searchKeyword: string;
}

const Searchbar = (props: searchbarProps) => {

  const handleSearch = () => {
    getDatasetsSearchResp(props.setSearchResp, [], props.searchKeyword, 0, 0);
  };

  return (
    <Container className="mb-3">
      <Form>
        <Form.Group>
          <div className="input-group p-1">
            <Button onClick={handleSearch} className="bg-primary">
              <Search />
            </Button>
            <Form.Control
              id="searchInput"
              type="text"
              placeholder="search datasets"
              onChange={(event) => props.setSearchKeyword(event.target.value)}
            />
          </div>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default Searchbar;
