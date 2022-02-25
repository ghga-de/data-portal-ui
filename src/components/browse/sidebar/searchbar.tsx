import React, { Dispatch, SetStateAction } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { searchResponseModel } from "../../../models/dataset";
import { facetFilterModel } from "../../../models/facets";
import { getDatasetsSearchResp } from "../../../api/browse";
import { useSearchParams } from "react-router-dom";

interface searchbarProps {
  setSearchResp: Dispatch<SetStateAction<searchResponseModel | null>>;
  setSearchKeyword: Dispatch<SetStateAction<string>>;
  searchKeyword: string;
  limit: number;
  filterDict: facetFilterModel[];
}

const Searchbar = (props: searchbarProps) => {

  let [searchParam, setSearchParam] = useSearchParams();
  const skip = 0;
  const handleSearch = () => {
    getDatasetsSearchResp(props.setSearchResp, props.filterDict, props.searchKeyword, skip, props.limit);
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
              value={searchParam.get('query') || ""}
              id="searchInput"
              type="text"
              placeholder="Search datasets"
              onChange={(event) => {
                let query = event.target.value;
                if (query) {
                  setSearchParam({ query });
                } else {
                  setSearchParam({});
                }
                props.setSearchKeyword(query)
              }}
            />
          </div>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default Searchbar;
