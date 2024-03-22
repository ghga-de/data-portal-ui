import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

if (process.env.NODE_ENV === "development") {
  const host = document.location.host
  const useBackend = /ghga/.test(host);
  if (useBackend) {
    console.info("Using real backend");
    main();
  } else {
    // use mock API in development mode
    console.info("Using mock backend");
    const { worker } = require("./mocks/browser");
    worker.start().then(main);
  }
} else {
  main();
}

function main() {
  const root = ReactDOM.createRoot(document.getElementById("root")!);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
}
