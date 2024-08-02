import {
  getAccessRequests,
  datasets,
  getDatasetSummary,
  getEmbeddedDataset,
  metadataSummary,
  workPackageToken,
  searchResults,
  allIVAs,
} from "./data";

// Responses to be returned for various endpoints.

// The names must contain a method and a URL separated by a space
// the values can be undefined (do not mock this endpoint)
// a number (use it as response status), or an object (return it as JSON).

// Responses for local testing without backend

export const responses = {
  // Change context information
  "POST /api/auth/totp-token": {
    uri: "otpauth://totp/GHGA:John%20Doe?secret=TESTTOTPTOKEN&issuer=GHGA",
  },

  // Datasets requested by j.doe@ghga.de user
  "GET /api/wps/users/j.doe@ghga.de/datasets": datasets,

  // User IVAs
  "GET /api/auth/users/*/ivas": allIVAs.slice(1, 4),

  // New IVA
  "POST /api/auth/users/*/ivas": { id: "TEST1234566789" },

  // Delete IVA
  "DELETE /api/auth/users/*/ivas/*": 204,

  // Request IVA verification
  "POST /api/auth/rpc/ivas/*/request-code": 204,

  // Create IVA verification code
  "POST /api/auth/rpc/ivas/*/create-code": {
    verification_code: "TEST1234566789",
  },

  // Request IVA verification
  "POST /api/auth/rpc/ivas/*/code-transmitted": 204,

  // Request IVA verification with correct code
  "POST /api/auth/rpc/ivas/*/validate-code?verification_code=ABC123": 204,

  // Request IVA verification with others codes
  "POST /api/auth/rpc/ivas/*/validate-code": 401,

  // Get all IVAs
  "GET /api/auth/ivas": allIVAs,

  // Invalidate an access request
  "POST /api/auth/rpc/ivas/*/unverify": 204,

  // Work packages
  // example key for input: MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI
  "POST /api/wps/work-packages": workPackageToken,

  // Specific dataset and user access requests
  "GET /api/ars/access-requests?dataset_id=GHGAD588887987&*": getAccessRequests(
    "j.doe@ghga.de",
    "GHGAD588887987"
  ),

  // Specific dataset and user access requests
  "GET /api/ars/access-requests?*": getAccessRequests("j.doe@ghga.de"),

  // All access requests
  "GET /api/ars/access-requests": getAccessRequests(),

  // All access requests
  "POST /api/ars/access-requests": 204,

  // Patch an access request
  "PATCH /api/ars/access-requests/*": 204,

  // Static assets
  "GET /static/*": undefined,

  // Get Dataset details (embedded) Metadata Repository Service
  "GET /api/metldata/artifacts/embedded_public/classes/EmbeddedDataset/resources/GHGAD588887987":
    getEmbeddedDataset("GHGAD588887987"),
  "GET /api/metldata/artifacts/embedded_public/classes/EmbeddedDataset/resources/GHGAD588887988":
    getEmbeddedDataset("GHGAD588887988"),
  "GET /api/metldata/artifacts/embedded_public/classes/EmbeddedDataset/resources/GHGAD588887989":
    getEmbeddedDataset("GHGAD588887989"),

  // Get summary data from a single dataset
  "GET /api/metldata/artifacts/stats_public/classes/DatasetStats/resources/GHGAD588887987":
    getDatasetSummary("GHGAD588887987"),
  // Get summary data from a single dataset
  "GET /api/metldata/artifacts/stats_public/classes/DatasetStats/resources/GHGAD588887988":
    getDatasetSummary("GHGAD588887988"),
  // Get summary data from a single dataset
  "GET /api/metldata/artifacts/stats_public/classes/DatasetStats/resources/GHGAD588887989":
    getDatasetSummary("GHGAD588887989"),

  // Get summary data from entire metadata database
  "GET /api/metldata/stats": metadataSummary,

  // Metadata Search Service
  "POST /api/mass/rpc/search*": {
    facets: searchResults.facets,
    count: searchResults.count,
    hits: searchResults.hits,
  },

  // webpack-hot-replace
  "GET http://127.0.0.1:8080/main.*": undefined,
  "GET http://localhost:8080/main.*": undefined,
};
