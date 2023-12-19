import {
  SearchResponseModel,
  DatasetEmbeddedModel,
  DatasetDetailsSummaryModel,
  MetadataSummaryModel,
} from "../models/dataset";
import { FacetFilterModel } from "../models/facets";
import { fetchJson } from "../utils/utils";
import { showMessage } from "../components/messages/usage";

const CLIENT_URL = process.env.REACT_APP_CLIENT_URL
const MASS_URL = (CLIENT_URL || "") + process.env.REACT_APP_MASS_URL;
const METLDATA_URL = (CLIENT_URL || "") + process.env.REACT_APP_METLDATA_URL;

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
 * @param searchKeyword - String representing the search keyword. Default: "*".
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
  let url = `${MASS_URL}/rpc/search`;
  const payload = {
    class_name: documentType,
    query: searchKeyword,
    filters: filterQuery,
    skip: skip,
    limit: limit,
  };
  try {
    const response = await fetchJson(url, "POST", payload);
    const data = await response.json();
    callbackFunc(data);
  } catch (error) {
    showFetchDataError();
    console.log(error);
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
  let url = `${METLDATA_URL}/artifacts/embedded_public/classes/EmbeddedDataset/resources/${datasetAccession}`;
  try {
    const response = await fetchJson(url);
    const data = await response.json();
    callbackFunc(data);
  } catch (error) {
    showFetchDataError();
    console.log(error);
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
  const url = `${METLDATA_URL}/artifacts/stats_public/classes/DatasetStats/resources/${datasetAccession}`;
  try {
    const response = await fetchJson(url);
    const data = await response.json();
    callbackFunc(data);
  } catch (error) {
    showFetchDataError();
    console.log(error);
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
  fetch(`${METLDATA_URL}/stats`, {
    method: "get",
  })
    .then((response) => response.json())
    .then(
      (data) => {
        callbackFunc(data);
      },
      (error) => {
        showFetchDataError();
        console.log(error);
      }
    );
};
