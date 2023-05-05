import { Dispatch, SetStateAction } from "react";
import {
  dataAccessCommitteeModel,
  dataAccessPolicyModel,
  datasetEmbeddedModel,
  searchResponseModel,
} from "../models/dataset";
import { facetFilterModel } from "../models/facets";
import { querySearchService } from "../api/browse";
import { authService } from "../services/auth";

const CLIENT_URL = process.env.REACT_APP_CLIENT_URL;

/**
 * Convert an array of filter objects into string representation.
 * @param filterDict - Array of objects that conform to the facetFilterModel.
 * @returns Semicolon-separated string of key-value pairs.
 */
export const getFilterString = (filterDict: facetFilterModel[]) => {
  let filterString = "";
  for (var item of filterDict) {
    filterString += item.key + ":" + item.value + ";";
  }
  return filterString.slice(0, -1);
};

/**
 * Scroll page smoothly to 60 pixels below the top
 * @returns Nothing
 */
export const scrollUp = () => {
  window.scrollTo({
    top: 60,
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
  let facetFilterModelList: facetFilterModel[] = [];
  if (filterString != null) {
    let filterStringList = filterString.split(";");
    for (var item of filterStringList) {
      let filterItem: facetFilterModel = {
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
  setSearchResults: Dispatch<SetStateAction<searchResponseModel | null>>,
  filterDict: facetFilterModel[],
  searchKeyword: string,
  limit: number,
  skip: number,
  page: number,
  setPage: Dispatch<SetStateAction<number>>,
  setFilterDict: Dispatch<SetStateAction<facetFilterModel[]>> | null,
  appliedFilterDict: facetFilterModel[] | null
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
    "Dataset"
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
 * Decide email contact according to dataset details
 * @param details - Dataset details object conforms to the datasetEmbeddedModel.
 * @returns Email contact as string. Default: helpdesk@ghga.de
 */
export const getDACEmailId = (
  details: datasetEmbeddedModel | null | undefined
) => {
  let mailId: string = "helpdesk@ghga.de";
  if (details !== null && details !== undefined) {
    const dataAccessPolicy: dataAccessPolicyModel =
      details.has_data_access_policy;
    const dataAccessCommittee: dataAccessCommitteeModel =
      dataAccessPolicy.has_data_access_committee;
    const main_contact = dataAccessCommittee.main_contact;
    if (main_contact === null) {
      for (var item of dataAccessCommittee.has_member) {
        if (main_contact === null) {
          mailId =
            item.email === null || item.email === undefined
              ? mailId
              : item.email;
        }
        if (
          item.id === main_contact &&
          item.email !== null &&
          item.email !== undefined
        ) {
          mailId = item.email;
        }
      }
    } else {
      mailId = main_contact;
    }
  }
  return mailId;
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
  method = "GET",
  payload?: any
): Promise<Response> => {
  const headers: HeadersInit = {
    Accept: "application/json",
  };
  if (payload) {
    headers["Content-Type"] = "application/json";
  }
  if (CLIENT_URL) {
    headers["Origin"] = CLIENT_URL;
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
 * Summarize the items in an object and return an array of string representations.
 * @param item - Object containing items in "{[key: string]: number}" type.
 * @returns Array of strings formatted as "<key>: <value>".
 */
export const getItemsForSummary = (
  item: { [key: string]: number } | undefined
) => {
  let items: string[] = [];
  for (let key in item) {
    let value = item[key];
    items.push(key + ": " + value);
  }
  return items;
};

/**
 * Transpose a table of data for HTML display.
 * @param data - Two arrays of strings representing rows and columns.
 * @returns Transposed version of data.
 */
export const transposeTableForHTML = (data: string[]) => {
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
};
