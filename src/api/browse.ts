import { searchResponseModel, datasetEmbeddedModel, datasetSummaryModel, metadataSummaryModel } from "../models/dataset";
import { facetFilterModel } from "../models/facets";
import { fetchJson } from "../utils/utils";


const SEARCH_URL = process.env.REACT_APP_SVC_SEARCH_URL;
const REPOSITORY_URL = process.env.REACT_APP_SVC_REPOSITORY_URL;

type getDatasetsSearchRespType = (
  callbackFunc: (hits: searchResponseModel) => void,
  filterQuery: facetFilterModel[],
  searchKeyword: string,
  skip: number,
  limit: number,
  documentType: string
) => void;

export const querySearchService: getDatasetsSearchRespType = async (
  callbackFunc: (hits: searchResponseModel) => void,
  filterQuery: facetFilterModel[],
  searchKeyword = "*",
  skip: number,
  limit: number,
  documentType = "Dataset"
) => {
  let url = `${SEARCH_URL}/rpc/search`;
  url += `?document_type=${documentType}&return_facets=true&skip=${skip}&limit=${limit}`;
  const payload = { query: searchKeyword, filters: filterQuery };
  try {
    const response = await fetchJson(url, "POST", payload);
    const data = await response.json();
    callbackFunc(data);
  } catch {
    alert("An error occurred while fetching the data.");
    const errorData: searchResponseModel = {
      count: -1,
      hits: [],
      facets: [],
    };
    callbackFunc(errorData);
  };
};

type getDatasetDetailsType = (
  datasetId: string,
  embedded: boolean,
  callbackFunc: (dataset: datasetEmbeddedModel) => void
) => void;

export const getDatasetDetails: getDatasetDetailsType = async (
  datasetId,
  embedded = false,
  callbackFunc
) => {
  let url = `${REPOSITORY_URL}/datasets/${datasetId}`;
  url += `?embedded=${embedded}`;
  try {
    const response = await fetchJson(url);
    const data = await response.json();
    callbackFunc(data);
  } catch {
    alert("An error occurred while fetching the data.");
  }
};

type getDatasetSummaryType = (
  datasetId: string,
  callbackFunc: (dataset: datasetSummaryModel) => void
) => void;

export const getDatasetSummary: getDatasetSummaryType = async (
  datasetId,
  callbackFunc
) => {
  const url = `${REPOSITORY_URL}/dataset_summary/${datasetId}`;
  try {
    const response = await fetchJson(url);
    const data = await response.json();
    callbackFunc(data);
  } catch {
    alert("An error occurred while fetching the data.");
  };
};

type getMetadataSummaryType = (
  callbackFunc: (summary: metadataSummaryModel) => void
) => void;

export const getMetadataSummary: getMetadataSummaryType = (
  callbackFunc
) => {
  fetch(
    `${process.env.REACT_APP_SVC_REPOSITORY_URL}/metadata_summary/`,
    {
      method: "get",
    }
  )
    .then((response) => response.json())
    .then(
      (data) => {
        callbackFunc(data);
      },
      (error) => {
        alert("An error occured while fetching the data.");
      }
    );
};
