import { searchResponseModel, datasetModel } from '../models/dataset'
import { facetFilterModel } from '../models/facets'

type getDatasetsSearchRespType = (
    callbackFunc: (hits: searchResponseModel) => void,
    filterQuery: facetFilterModel[],
    searchKeyword: string
) => void;

const postHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Origin': 'http://localhost:8000/',
}

export const getDatasetsSearchResp: getDatasetsSearchRespType = (callbackFunc, filterQuery, searchKeyword = "*") => {
    fetch(
        `${process.env.REACT_APP_SVC_SEARCH_URL}/rpc/search?document_type=Dataset&return_facets=true&skip=0&limit=1000`,
        {
            method: 'POST',
            headers: postHeaders,
            body: JSON.stringify({ query: searchKeyword, filters: filterQuery })
        }
    )
        .then(response => response.json())
        .then(
            (data) => {
                callbackFunc(data);
            },
            (error) => {
                alert("An error occured while fetching the data.");
            }
        );
};

type getDatasetDetailsType = (
    datasetId: string,
    callbackFunc: (dataset: datasetModel) => void
) => void;

export const getDatasetDetails: getDatasetDetailsType = (datasetId, callbackFunc) => {
    fetch(
        `${process.env.REACT_APP_SVC_REPOSITORY_URL}/datasets/${datasetId}?embedded=true`,
        {
            method: 'get'
        }
    )
        .then(response => response.json())
        .then(
            (data) => {
                callbackFunc(data);
            },
            (error) => {
                alert("An error occured while fetching the data.");
            }
        );
};
