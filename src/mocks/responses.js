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

// Responses for local testing without backend

export const responses = {
  // User registry
  [`POST /api/auth/rpc/login`]: user,

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
  "GET /api/metldata/artifacts/embedded_public/classes/EmbeddedDataset/resources/*": embeddedDataset,

  // Get summary data from a single dataset
  "GET /api/metldata/artifacts/stats_public/classes/DatasetStats/resources/*": datasetSummary,

  // Get summary data from entire metadata database
  "GET /api/metldata/stats": metadataSummary,

  // Metadata Search Service
  "POST /api/mass/rpc/search*": {
    facets: searchResults.facets,
    count: searchResults.count,
    hits: searchResults.hits,
  },

  // Metadata Search Service single result
  "POST /api/mass/rpc/search?limit=1": {
    facets: searchResults.facets,
    count: searchResults.count,
    hits: searchResults.hits.slice(0, 1),
  },

  // webpack-hot-replace
  "GET http://127.0.0.1:8080/main.*": undefined,
};
