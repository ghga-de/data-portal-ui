import {
  accessRequests,
  datasets,
  datasetSummary,
  embeddedDataset,
  metadataSummary,
  user,
  workPackageToken,
  searchResults,
} from "./data";

// Responses to be returned for various endpoints.

// The names must contain a method and a URL separated by a space
// the values can be undefined (do not mock this endpoint)
// a number (use it as response status), or an object (return it as JSON).

// Responses for local testing

const localResponses = {
  // User registry
  [`GET /api/auth/users/${user.ext_id}`]: user,

  // Datasets requested by j.doe@ghga.de user
  "GET /api/wps/users/j.doe@ghga.de/datasets": datasets,

  // Work packages
  // example key for input: MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI
  "POST /api/wps/work-packages": workPackageToken,

  // All access requests
  "GET /api/ars/access-requests": accessRequests,

  // All access requests
  "POST /api/ars/access-requests": 204,

  // Patch an access request
  "PATCH /api/ars/access-requests/*": 204,

  // Static assets
  "GET /static/*": undefined,

  // Get Dataset details (embedded) Metadata Repository Service
  "GET http://127.0.0.1:8002/artifacts/embedded_public/classes/EmbeddedDataset/resources/*": embeddedDataset,

  // Get summary data from a single dataset
  "GET http://127.0.0.1:8002/artifacts/stats_public/classes/DatasetStats/resources/*": datasetSummary,

  // Get summary data from entire metadata database
  "GET http://127.0.0.1:8002/artifacts/stats_public/classes/GlobalStats/resources/*": metadataSummary,

  // Metadata Search Service
  "POST http://127.0.0.1:8001/rpc/search?skip=0&limit=10": {
    facets: searchResults.facets,
    count: searchResults.count,
    hits: searchResults.hits.slice(0, 10),
  },

  // Metadata Search Service (display 25)
  "POST http://127.0.0.1:8001/rpc/search?skip=0&limit=25": {
    facets: searchResults.facets,
    count: searchResults.count,
    hits: searchResults.hits.slice(0, 25),
  },

  // Metadata Search Service (display 50)
  "POST http://127.0.0.1:8001/rpc/search?skip=0&limit=50": {
    facets: searchResults.facets,
    count: searchResults.count,
    hits: searchResults.hits.slice(0, 50),
  },

  // Metadata Search Service no facets found
  "POST http://127.0.0.1:8001/rpc/search?skip=10&limit=10": {
    facets: [],
    count: searchResults.count,
    hits: searchResults.hits.slice(9, 20),
  },

  // Metadata Search Service no hits found
  "POST http://127.0.0.1:8001/rpc/search?skip=20&limit=10": {
    facets: searchResults.facets,
    count: searchResults.count,
    hits: [],
  },

  // Metadata Search Service single result
  "POST http://127.0.0.1:8001/rpc/search?limit=1": {
    facets: searchResults.facets,
    count: searchResults.count,
    hits: searchResults.hits.slice(0, 1),
  },

  // webpack-hot-replace
  "GET http://127.0.0.1:8080/main.*": undefined,
};

// Responses for remote testing

const remoteResponses = {
  "GET /main*": undefined,
  "GET /static/*": undefined,

  "GET /api/auth/*": undefined,

  "GET /api/ars/*": undefined,

  "GET /api/wps/*": undefined,

  "GET /api/search/*": undefined,
  "GET /api/repository/*": undefined,

  // LS AAI
  "GET https://proxy.aai.lifescience-ri.eu/*": undefined,
  "POST https://proxy.aai.lifescience-ri.eu/*": undefined,
  "GET https://ds.aai.lifescience-ri.eu/*": undefined,
  "GET https://idhub.aai.lifescience-ri.eu/logos/*": undefined,

  // Provider
  "GET https://dkfzshib.inet.dkfz-heidelberg.de/*": undefined,
};

// Select responses for local or remote testing depending on env

const isLocal = !process.env.HTTPS;

export const responses = isLocal ? localResponses : remoteResponses;
