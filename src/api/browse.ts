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

import {
  SearchResponseModel,
  DatasetEmbeddedModel,
  DatasetDetailsSummaryModel,
  MetadataSummaryModel,
} from "../models/dataset";
import { FacetFilterModel } from "../models/facets";
import { MASS_URL, METLDATA_URL, fetchJson } from "../utils/utils";
import { showMessage } from "../components/messages/usage";

const showFetchDataError = () => {
  showMessage({
    type: "error",
    title: "An error occurred while fetching the data.",
  });
};

type getDatasetsSearchRespType = (
  callbackFunc: (hits: SearchResponseModel) => void,
  filterQuery: FacetFilterModel[],
  searchKeyword: string,
  skip: number,
  limit: number,
  documentType: string
) => void;

/**
 * Async function to retrieve the search results from API, calls the callbackFunc
 * function with search results, returns nothing.
 * @param callbackFunc - Function takes an argument conforms to the searchResponseModel.
 * @param filterQuery - Filters to be applied, array of objects that conform to the facetFilterModel.
 * @param searchKeyword - String representing the search keyword. Default: "".
 * @param skip - Number of results to skip in the search results. Default: 0.
 * @param limit - Maximum number of results to be returned by the search. Default: 20.
 * @param documentType - String representing the document type to search. Default: "Dataset".
 * @returns Nothing
 */
export const querySearchService: getDatasetsSearchRespType = async (
  callbackFunc: (hits: SearchResponseModel) => void,
  filterQuery: FacetFilterModel[],
  searchKeyword = "",
  skip = 0,
  limit = 20,
  documentType = "EmbeddedDataset"
) => {
  let url = new URL("search", MASS_URL);
  const params = url.searchParams;
  params.append("class_name", documentType);
  if (searchKeyword) params.append("query", searchKeyword);
  filterQuery.forEach((filter) => {
    params.append("filter_by", filter.key);
    params.append("value", filter.value);
  });
  if (skip) params.append("skip", skip.toString());
  params.append("limit", limit.toString());
  try {
    const response = await fetchJson(url, "GET");
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(`Status code ${response.status} in search response`);
    }
    callbackFunc(data);
  } catch (error) {
    showFetchDataError();
    console.error(error);
    const errorData: SearchResponseModel = {
      count: -1,
      hits: [],
      facets: [],
    };
    callbackFunc(errorData);
  }
};

type getDatasetDetailsType = (
  datasetAccession: string,
  callbackFunc: (dataset: DatasetEmbeddedModel) => void
) => void;

/**
 * Async function to retrieve the details of specified dataset from API,
 * calls the callbackFunc function with the response data, returns nothing.
 * @param datasetAccession - ID of the dataset of interest.
 * @param callbackFunc - Function used to process response data.
 * @returns Nothing
 */
export const getDatasetDetails: getDatasetDetailsType = async (
  datasetAccession,
  callbackFunc
) => {
  let url = new URL(
    `artifacts/embedded_public/classes/EmbeddedDataset/resources/${datasetAccession}`,
    METLDATA_URL
  );
  try {
    const response = await fetchJson(url);
    const data = await response.json();
    callbackFunc(data);
  } catch (error) {
    showFetchDataError();
    console.error(error);
  }
};

type getDatasetSummaryType = (
  datasetAccession: string,
  callbackFunc: (dataset: DatasetDetailsSummaryModel) => void
) => void;

/**
 * Async function to retrieve the summary of specified dataset from API,
 * calls the callbackFunc function with the response data, returns nothing.
 * @param datasetAccession - ID of the dataset of interest.
 * @param callbackFunc - Function used to process response data.
 * @returns Nothing
 */
export const getDatasetSummary: getDatasetSummaryType = async (
  datasetAccession,
  callbackFunc
) => {
  const url = new URL(
    `artifacts/stats_public/classes/DatasetStats/resources/${datasetAccession}`,
    METLDATA_URL
  );
  try {
    const response = await fetchJson(url);
    const data = await response.json();
    callbackFunc(data);
  } catch (error) {
    showFetchDataError();
    console.error(error);
  }
};

type getMetadataSummaryType = (
  callbackFunc: (summary: MetadataSummaryModel) => void
) => void;

/**
 * Async function to retrieve the metadata summary from API,
 * calls the callbackFunc function with the response data, returns nothing.
 * @param callbackFunc - Function used to process response data.
 * @returns Nothing
 */
export const getMetadataSummary: getMetadataSummaryType = (callbackFunc) => {
  fetch(new URL("stats", METLDATA_URL), {
    method: "get",
  })
    .then((response) => response.json())
    .then(
      (data) => {
        callbackFunc(data);
      },
      (error) => {
        showFetchDataError();
        console.error(error);
      }
    );
};
