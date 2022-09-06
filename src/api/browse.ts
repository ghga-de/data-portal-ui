import { searchResponseModel, datasetEmbeddedModel, datasetSummaryModel } from "../models/dataset";
import { facetFilterModel } from "../models/facets";
import authService from "../components/auth/authService";

type getDatasetsSearchRespType = (
  callbackFunc: (hits: searchResponseModel) => void,
  filterQuery: facetFilterModel[],
  searchKeyword: string,
  skip: number,
  limit: number,
  documentType: string
) => void;

const getHeaders = async () => {
  const user = await authService.getUser();
  const headers: HeadersInit = {
    "Accept": "application/json",
    "Content-Type": "application/json"
  };
  const origin = process.env.REACT_APP_CLIENT_URL;
  if (origin) {
    headers["Origin"] = origin;
  }
  const authorization = user?.access_token;
  if (authorization) {
    // the Authorization header is already used for Basic auth,
    // therefore we use the X-Authorization header for the OIDC token
    headers["X-Authorization"] = authorization;
  }
  return headers;
}

export const querySearchService: getDatasetsSearchRespType = async (
  callbackFunc: (hits: searchResponseModel) => void,
  filterQuery: facetFilterModel[],
  searchKeyword = "*",
  skip: number,
  limit: number,
  documentType = "Dataset"
) => {
  let url = `${process.env.REACT_APP_SVC_SEARCH_URL}/rpc/search`;
  url += `?document_type=${documentType}&return_facets=true&skip=${skip}&limit=${limit}`;
  const headers = await getHeaders();
  const body = JSON.stringify({ query: searchKeyword, filters: filterQuery });
  try {
    const response = await fetch(url, { method: "POST", headers, body});
    const data = await response.json();
    callbackFunc(data);
  } catch(error) {
    console.error(error);
    alert("An error occured while fetching the data.");
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
  let url = `${process.env.REACT_APP_SVC_REPOSITORY_URL}/datasets/${datasetId}`;
  url += `?embedded=${embedded}`;
  const headers = await getHeaders();
  try {
    const response = await fetch(url, { method: "get", headers});
    const data = await response.json();
    callbackFunc(data);
  } catch(error) {
    console.error(error);
    alert("An error occured while fetching the data.");
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
  const url = `${process.env.REACT_APP_SVC_REPOSITORY_URL}/dataset_summary/${datasetId}`;
  const headers = await getHeaders();
  try {
    const response = await fetch(url, {method: "get", headers});
    const data = await response.json()
    callbackFunc(data);
  } catch(error) {
    console.error(error);
    alert("An error occured while fetching the data.");
  };
};
