import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Browse from "./components/browse/browse";
import PageNotFound from "./components/pageNotFound/pageNotFound";
import "./App.scss";
import {
  Outlet,
  Route,
  RouterProvider,
  useLocation,
  useNavigate,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./components/home/home";
import AboutUs from "./components/aboutUs/aboutUs";
import SingleDatasetView from "./components/browse/singleDatasetView/singleDatasetView";
import Download from "./components/download/download";
import Upload from "./components/upload/upload";
import MetadataModel from "./components/metadataModel/metadataModel";
import WorkPackage from "./components/workPackage/workPackage";
import Callback from "./components/login/callback";
import Register from "./components/register/register";
import Profile from "./components/login/profile";
import { MessageContainer } from "./components/messages/container";
import { useMessages } from "./components/messages/usage";
import { authService } from "./services/auth";
import { useLayoutEffect } from "react";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/browse">
        <Route index element={<Browse />} />
        <Route path="?p=:page" element={<Browse />} />
        <Route path="?q=:search&p=:page" element={<Browse />} />
        <Route path="?f=:filter&p=:page" element={<Browse />} />
        <Route path="?q=:search&f=:filter&p=:page" element={<Browse />} />
      </Route>
      <Route path="/browse/:id" element={<SingleDatasetView />} />
      <Route path="/download" element={<Download />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/metadata-model" element={<MetadataModel />} />
      <Route path="/work-package" element={<WorkPackage />} />
      <Route path="/oauth/callback" element={<Callback />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

function Layout() {
  let location = useLocation();
  const navigate = useNavigate();
  const { showMessage } = useMessages();

  useLayoutEffect(() => {
    authService
      .getUser()
      .then((user) => {
        if (
          user &&
          (!user.id || user.changed) &&
          location.pathname !== "/register"
        ) {
          // user is new (needs to register)
          // or her data changed (needs to confirm)
          navigate("/register");
        }
      })
      .catch((error) => {
        showMessage({ type: "error", title: "Cannot login" });
        console.error(error);
      });
  }, [location, navigate, showMessage]);

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
        <MessageContainer />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
