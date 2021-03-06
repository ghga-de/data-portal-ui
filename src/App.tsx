import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Browse from "./components/browse/browse";
import PageNotFound from "./components/pageNotFound/pageNotFound";
import "./App.scss";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Home from "./components/home/home";
import AboutUs from "./components/aboutUs/aboutUs";
import SingleDatasetView from "./components/browse/singleDatasetView/singleDatasetView";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
        </Route>
        <Route path="/about-us">
          <Route index element={<AboutUs />} />
        </Route>
        <Route path="/browse">
          <Route index element={<Browse />} />
          <Route path="?p=:page" element={<Browse />} />
          <Route path="?q=:search&p=:page" element={<Browse />} />
          <Route path="?f=:filter&p=:page" element={<Browse />} />
          <Route path="?q=:search&f=:filter&p=:page" element={<Browse />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/browse/:id">
          <Route index element={<SingleDatasetView />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
