// Copyright 2021 - 2024 Universität Tübingen, DKFZ and EMBL
// for the German Human Genome-Phenome Archive (GHGA)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React, { Dispatch, SetStateAction } from "react";
import { Form, Container } from "react-bootstrap";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { SearchResponseModel } from "../../../models/dataset";
import { FacetFilterModel } from "../../../models/facets";
import { scrollUp } from "../../../utils/utils";
import { icon, toHtml } from "@fortawesome/fontawesome-svg-core";
import { useNavigate } from "react-router-dom";
import { handleFilterAndSearch } from "../shared";

interface SearchbarProps {
  setSearchResults: Dispatch<SetStateAction<SearchResponseModel | null>>;
  setSearchKeyword: Dispatch<SetStateAction<string>>;
  searchKeyword: string;
  limit: number;
  searchParams: URLSearchParams;
  filterDict: FacetFilterModel[];
  setFilterDict: Dispatch<SetStateAction<FacetFilterModel[]>>;
  setPage: Dispatch<SetStateAction<number>>;
}

/** Searh bar component in the Browse sidebar */
const Searchbar = (props: SearchbarProps) => {
  let navigate = useNavigate();
  var iconAbstract = icon(faMagnifyingGlass).abstract[0];
  if (iconAbstract.children) {
    iconAbstract.children[0].attributes.fill = "#000";
  }

  return (
    <Container className="mb-4">
      <Form
        onSubmit={(event) => {
          scrollUp();
          event.preventDefault();
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
              null
            )
          );
        }}
      >
        <Form.Control
          value={props.searchKeyword}
          id="searchInput"
          type="text"
          placeholder="Search datasets"
          className="shadow ps-5"
          onChange={(event) => props.setSearchKeyword(event.target.value)}
          style={{
            background:
              'url("data:image/svg+xml;base64,' +
              btoa(toHtml(iconAbstract)) +
              '")',
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
