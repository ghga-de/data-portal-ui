import {
  accessRequests,
  datasets,
  datasetSummary,
  embeddedDataset,
  metadataSummary,
  user,
  workPackageToken,
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
  "GET http://127.0.0.1:8002/datasets/*?embedded=true": embeddedDataset,

  // Get summary data from a single dataset
  "GET http://127.0.0.1:8002/dataset_summary/*": datasetSummary,

  // Get summary data from entire metadata database
  "GET http://127.0.0.1:8092/metadata_summary/": metadataSummary,

  // Metadata Search Service
  "GET http://127.0.0.1:8001/*": undefined,

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