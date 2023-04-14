// Static fake data for mocking the backend

export const user = {
  id: "j.doe@ghga.de",
  ext_id: "aacaffeecaffeecaffeecaffeecaffeecaffeeaad@lifescience-ri.eu",
  name: "John Doe",
  title: "Dr.",
  email: "j.jdoe@home.org",
};

// Static data to be returned for various endpoints.

// The names must contain a method and a URL separated by a space
// the values can be undefined (do not mock this endpoint)
// a number (use it as response status), or an object (return it as JSON).

export const data = {
  // User registry
  "GET /api/auth/users/*": user,

  // Static assets
  "GET /static/*": undefined,

  // Metadata Repository Service
  "GET http://127.0.0.1:8001/*": undefined,

  // Metadata Search Service
  "GET http://127.0.0.1:8002/*": undefined,
};
