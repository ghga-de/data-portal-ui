import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Browse from "./components/browse/browse";
import PageNotFound from "./components/pageNotFound/pageNotFound";
import "./App.scss";
import { Routes, BrowserRouter, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./components/home/home";
import AboutUs from "./components/aboutUs/aboutUs";
import SingleDatasetView from "./components/browse/singleDatasetView/singleDatasetView";
import Download from "./components/download/download"
import Upload from "./components/upload/upload"
import MetadataModel from "./components/metadataModel/metadataModel";
import Login from "./components/login/login";
import Callback from "./components/login/callback";
import Register from "./components/register/register";
import Profile from "./components/login/profile";
import authService from "./services/auth";
import { useLayoutEffect } from "react";


function RouterWrapper() {
  
  let location = useLocation();
  const navigate = useNavigate()

  useLayoutEffect(() => {
    authService.getUser().then((user) => {
      if ((!user?.id || user.changed) && location.pathname !== "/register" && user !== null) {
        // user is new (needs to register)
        // or her data changed (needs to confirm)
        navigate("/register");
      }
    }).catch(error => {
      console.error(error);
    });
  }, [location, navigate])

  // window.onbeforeunload = function (event) {
  //   const e = event || window.event;

  //   if (location.pathname === "/register") {
  //     // Cancel the event
  //     e.preventDefault();
  //     if (e) {
  //       e.returnValue =
  //         "If you leave without registering to the GHGA Data Portal, you will be logged out.\nAre you sure you want to leave?"; // Legacy method for cross browser support
  //     }
  //     return ""; // Legacy method for cross browser support
  //   }
  // };

  const logout = async () => {
    await authService.logout();
    const lastUrl = sessionStorage.getItem("lastUrl");
    lastUrl ? window.location.href = lastUrl : navigate("/");
  };

  window.onunload = () => {
    if (location.pathname === "/register") {
      logout();
    }
  };

  return(
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
        <Route path="/download">
          <Route index element={<Download />} />
        </Route>
        <Route path="/upload">
          <Route index element={<Upload />} />
        </Route>
        <Route path="/metadata-model">
          <Route index element={<MetadataModel />} />
        </Route>
        <Route path="/login">
          <Route index element={<Login />} />
        </Route>
        <Route path="/oauth/callback">
          <Route index element={<Callback />} />
        </Route>
        <Route path="/register">
          <Route index element={<Register />} />
        </Route>
        <Route path="/profile">
          <Route index element={<Profile />} />
        </Route>
      </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Header />
        <RouterWrapper/>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
