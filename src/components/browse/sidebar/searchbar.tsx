import React, { Dispatch, SetStateAction } from "react";
import { Form, Container } from "react-bootstrap";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { searchResponseModel } from "../../../models/dataset";
import { facetFilterModel } from "../../../models/facets";
import { getDatasetsSearchResp } from "../../../api/browse";
import { getFilterString } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";
import { scrollUp } from "../../../utils/utils";
import { icon, toHtml } from "@fortawesome/fontawesome-svg-core";

interface searchbarProps {
  setSearchResults: Dispatch<SetStateAction<searchResponseModel | null>>;
  setSearchKeyword: Dispatch<SetStateAction<string>>;
  searchKeyword: string;
  limit: number;
  searchParams: any;
  setSearchParams: any;
  setPage: Dispatch<SetStateAction<number>>;
  filterDict: facetFilterModel[];
}

const Searchbar = (props: searchbarProps) => {
  let navigate = useNavigate();
  const skip = 0;

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getDatasetsSearchResp(
      props.setSearchResults,
      props.filterDict,
      props.searchKeyword,
      skip,
      props.limit
    );
    props.setSearchParams({ p: 1 });
    props.setPage(0);
    if (props.searchKeyword === "" || props.searchKeyword === null) {
      if (getFilterString(props.filterDict) === "") {
        navigate(`?p=1`);
      } else {
        navigate(`?f=${getFilterString(props.filterDict)}&p=1`);
      }
    } else {
      if (getFilterString(props.filterDict) === "") {
        navigate(`?q=${props.searchKeyword}&p=1`);
      } else {
        navigate(
          `?q=${props.searchKeyword}&f=${getFilterString(props.filterDict)}&p=1`
        );
      }
    }
  };

  var iconAbstract = icon(faMagnifyingGlass).abstract[0];
  if (iconAbstract.children) {
    iconAbstract.children[0].attributes.fill = "#000";
  }

  return (
    <Container className="mb-4">
      <Form
        onSubmit={(event) => {
          scrollUp();
          handleSearch(event);
        }}
      >
        <Form.Control
          value={props.searchKeyword}
          id="searchInput"
          type="text"
          placeholder="Search datasets"
          className="shadow-lg ps-5"
          onChange={(event) => props.setSearchKeyword(event.target.value)}
          style={{
            background:
              'url("data:image/svg+xml;base64,' + btoa(toHtml(iconAbstract)) + '")',
              // 'url("/static/media/data-portal.2b5a4708.png")',
            backgroundSize: "20px 20px",
            backgroundRepeat: "no-repeat no-repeat",
            backgroundPosition: "15px center",
          }}
        />
      </Form>
    </Container>
  );
};

export default Searchbar;
