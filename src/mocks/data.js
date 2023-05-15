// Static fake data for mocking the backend

export const user = {
  id: "j.doe@ghga.de",
  ext_id: "aacaffeecaffeecaffeecaffeecaffeecaffeeaad@lifescience-ri.eu",
  name: "John Doe",
  title: "Dr.",
  email: "j.jdoe@home.org",
  role: "data_steward",
};

const datasets = [
  {
    id: "TEST00001000001",
    title: "Some dataset for testing",
    description:
      "This is just a dataset with five dummy files that can be used" +
      " for testing the work package functionality of the Data Portal." +
      " Note that the description can be longer than the title.",
    workType: "download",
  },
  {
    id: "TEST00002000001",
    title: "Another dataset for testing",
    description:
      "This is another a dataset with three dummy files" +
      " and a shorter description.",
    workType: "download",
  },
  {
    id: "TEST00003000001",
    title: "A third dataset for testing",
    description:
      "This is another a dataset that is awaiting upload." +
      " Note that currently uploading data is not yet supported in the portal",
    workType: "upload",
  },
];

const workPackageToken = {
  id: "WPKG00000000001",
  token: "MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0",
};

const accessRequests = [
  {
    id: "TEST00004000001",
    user_id: "j.doe@ghga.de",
    dataset_id: "TEST00003000001",
    full_user_name: "Dr. John Doe",
    email: "j.jdoe@home.org",
    request_text: "This is a test request for dataset TEST00003000001.",
    access_starts: "2023-05-11T15:00:00",
    access_ends: "2024-05-11T14:59:59",
    request_created: "2023-05-09T12:04:02",
    status: "pending",
    status_changed: null,
    changed_by: null,
  },

  {
    id: "TEST00005000001",
    user_id: "j.doe@ghga.de",
    dataset_id: "TEST00002000001",
    full_user_name: "Dr. John Doe",
    email: "j.jdoe@home.org",
    request_text: "This is a test request for dataset TEST00003000001.",
    access_starts: "2023-05-12T15:00:00",
    access_ends: "2024-05-12T14:59:59",
    request_created: "2023-05-11T12:04:02",
    status: "pending",
    status_changed: null,
    changed_by: null,
  },
];
// Static data to be returned for various endpoints.

// The names must contain a method and a URL separated by a space
// the values can be undefined (do not mock this endpoint)
// a number (use it as response status), or an object (return it as JSON).

export const data = {
  // User registry
  [`GET /api/auth/users/${user.ext_id}`]: user,

  // Datasets requested by j.doe@ghga.de user
  "GET /api/wps/users/j.doe@ghga.de/datasets": datasets,

  // All access requests
  "GET /api/access-requests": accessRequests,

  // Change access request status
  [accessRequests.map((x) => `GET /api/access-requests/${x.id}`)]: true,

  // Work packages
  // example key for input: MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI
  "POST /api/wps/work-packages": workPackageToken,

  // Static assets
  "GET /static/*": undefined,

  // Metadata Repository Service
  "GET http://127.0.0.1:8001/*": undefined,

  // Metadata Search Service
  "GET http://127.0.0.1:8002/*": undefined,
};
