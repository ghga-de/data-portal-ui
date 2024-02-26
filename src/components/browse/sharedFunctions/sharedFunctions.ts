// Copyright 2021 - 2023 Universität Tübingen, DKFZ, EMBL, and Universität zu Köln
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
//
import { Dispatch, SetStateAction } from "react";
import { FacetFilterModel } from "../../../models/facets";
import { SearchResponseModel } from "../../../models/dataset";
import { querySearchService } from "../../../api/browse";

/**
 * Convert a string representation of filter into an array of objects
 * that conform to the facetFilterModel.
 * @param filterString - Semicolon-separated string of key-value pairs
 * @returns facetFilterModelList
 */
export const getFilterParams = (filterString: string | null) => {
  let facetFilterModelList: FacetFilterModel[] = [];
  if (filterString != null) {
    let filterStringList = filterString.split(";");
    for (var item of filterStringList) {
      let filterItem: FacetFilterModel = {
        key: item.split(":")[0],
        value: item.split(":")[1],
      };
      facetFilterModelList.push(filterItem);
    }
  }
  return facetFilterModelList;
};

/**
 * Convert an array of filter objects into string representation.
 * @param filterDict - Array of objects that conform to the facetFilterModel.
 * @returns Semicolon-separated string of key-value pairs.
 */
export const getFilterString = (filterDict: FacetFilterModel[]) => {
  let filterString = "";
  for (var item of filterDict) {
    filterString += item.key + ":" + item.value + ";";
  }
  return filterString.slice(0, -1);
};

/**
 * Handle filters and call querySearchService to get search results from API
 * and set the search results, applied filters and page states of a component
 *
 * @remarks
 * If appliedFilterDict is specified (not null) these filters are used,
 * otherwise filterDict is used and the appliedFilterDict is updated accordingly.
 *
 * @param setSearchResults - SetState function that sets search results state conforms to the searchResponseModel or null
 * @param filterDict - Array of objects that conform to the facetFilterModel.
 * @param searchKeyword - String representing the search keyword.
 * @param skip - Number of results to skip in the search results.
 * @param limit - Maximum number of results to be returned by the search.
 * @param page - Page number
 * @param setPage - SetState function that sets page state in number
 * @param setFilterDict - SetState function that sets filter state conforms to the facetFilterModel[]
 * @param appliedFilterDict - Array of objects that conform to the facetFilterModel.
 * @returns Applied filters in query string format.
 */
export const handleFilterAndSearch = (
  setSearchResults: Dispatch<SetStateAction<SearchResponseModel | null>>,
  filterDict: FacetFilterModel[],
  searchKeyword: string,
  limit: number,
  skip: number,
  page: number,
  setPage: Dispatch<SetStateAction<number>>,
  setFilterDict: Dispatch<SetStateAction<FacetFilterModel[]>> | null,
  appliedFilterDict: FacetFilterModel[] | null
) => {
  if (appliedFilterDict === null) {
    appliedFilterDict = filterDict;
  }
  if (setFilterDict) {
    filterDict = appliedFilterDict;
    setFilterDict(appliedFilterDict);
  }
  page = page + 1;
  setPage(page);
  querySearchService(
    setSearchResults,
    filterDict,
    searchKeyword,
    skip,
    limit,
    "EmbeddedDataset"
  );
  if (searchKeyword === "" || searchKeyword === null) {
    if (
      getFilterString(appliedFilterDict) === "" ||
      getFilterString(appliedFilterDict) === null
    ) {
      return `?p=` + page;
    } else {
      return `?f=${getFilterString(appliedFilterDict)}&p=` + page;
    }
  } else {
    if (
      getFilterString(appliedFilterDict) === "" ||
      getFilterString(appliedFilterDict) === null
    ) {
      return `?q=${searchKeyword}&p=` + page;
    } else {
      return (
        `?q=${searchKeyword}&f=${getFilterString(appliedFilterDict)}&p=` + page
      );
    }
  }
};
