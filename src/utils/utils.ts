import { Dispatch, SetStateAction } from "react";
import { querySearchService } from "../api/browse";
import { SearchResponseModel } from "../models/dataset";
import { FacetFilterModel } from "../models/facets";
import { authService } from "../services/auth";

const CLIENT_URL : URL = new URL (String(process.env.REACT_APP_CLIENT_URL))

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
 * Scroll page smoothly to 0 pixels below the top
 * @returns Nothing
 */
export const scrollUp = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

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
 * Convert byte size into a human-readable format
 * @param bytes - Bytes as number
 * @returns Human readable size string, e.g. 5 kB
 */
export const parseBytes = (bytes: number) => {
  const prefixes = [
    " B",
    " kB",
    " MB",
    " GB",
    " TB",
    " PB",
    " EB",
    " ZB",
    " YB",
  ];
  let parsedBytes = prefixes.flatMap((prefix, index) => {
    let calculatedVal = bytes / Math.pow(1000, index);
    if (calculatedVal < 1000 && calculatedVal >= 0.1) {
      return String(Math.round(calculatedVal * 100) / 100) + prefix;
    } else return null;
  });
  var returnValue = parsedBytes.find((parsing) => parsing !== null);
  if (returnValue === undefined) returnValue = String(bytes) + prefixes[0];
  return returnValue;
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

/**
 * Import all files in a given folder.
 * @param r - Is expected to be a webpack require.context function.
 * @returns An array containing the exported content of each file in the folder.
 */
export const importAllFilesFromFolder = (r: any) => {
  return r.keys().map(r);
};

/**
 * Perform an HTTP request using fetch().
 * @param url - URL string to send the request
 * @param method - HTTP method for request
 * @param payload - Request body, if any.
 * @returns Promise resolves to the response of the HTTP request.
 */
/** Fetch JSON data with proper headers */
export const fetchJson = async (
  url: string,
  method: string = "GET",
  payload?: any
): Promise<Response> => {
  const headers: HeadersInit = {
    Accept: "application/json",
  };
  if (payload) {
    headers["Content-Type"] = "application/json";
  }
  if (CLIENT_URL) {
    headers["Origin"] = CLIENT_URL.hostname;
  }
  const token = await authService.getAccessToken();
  if (token) {
    // the Authorization header is already used for Basic auth,
    // therefore we use the X-Authorization header for the OIDC token
    headers["X-Authorization"] = "Bearer " + token;
  }
  const body = payload ? JSON.stringify(payload) : undefined;
  return await fetch(url, { method, headers, body });
};

/**
 * Transpose a table of data for HTML display.
 * @param data - Two arrays of strings representing rows and columns.
 * @returns Transposed version of data.
 */
export const transposeTableForHTML = (data: any[]) => {
  if (data.length > 0 && data[0]) {
    const rows = data.length,
      cols = data[0].length;
    const grid = [];
    for (let j = 0; j < cols; j++) {
      grid[j] = Array(rows);
    }
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[j][i] = data[i][j];
      }
    }
    return grid;
  }
  return [];
};

export const STATIC_PAGE_MAIN_DIV_CLASSES = "mx-auto px-2 px-md-5 my-5";
export const STATIC_PAGE_IMG_ROW_CLASSES =
  "text-center w-100 mx-0 px-0 mb-4 mb-sm-5 justify-content-center";
export const STATIC_PAGE_IMG_COL_CLASSES =
  "mx-0 px-0 col-md-11 col-lg-10 col-xl-8 col-xxl-6";
