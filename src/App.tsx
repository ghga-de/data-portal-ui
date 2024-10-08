// Copyright 2021 - 2024 Universität Tübingen, DKFZ and EMBL
// for the German Human Genome-Phenome Archive (GHGA)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
import SingleDatasetView from "./components/browse/singleDatasetView/singleDatasetView";
import WorkPackage from "./components/workPackage/workPackage";
import Callback from "./components/account/callback";
import Register from "./components/register/register";
import Account from "./components/account/account";
import { MessageContainer } from "./components/messages/container";
import { useMessages } from "./components/messages/usage";
import { authService } from "./services/auth";
import { useLayoutEffect } from "react";
import AccessRequests from "./components/accessRequests/accessRequests";
import Setup2FA from "./components/register/setup2FA/setup2FA";
import Confirm2FA from "./components/confirm2FA/confirm2FA";
import IvaManager from "./components/ivaManager/ivaManager";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/browse">
        <Route index element={<Browse />} />
        <Route path="?p=:page" element={<Browse />} />
        <Route path="?q=:search&p=:page" element={<Browse />} />
        <Route path="?f=:filter&p=:page" element={<Browse />} />
        <Route path="?q=:search&f=:filter&p=:page" element={<Browse />} />
      </Route>
      <Route path="/browse/:id" element={<SingleDatasetView />} />
      <Route path="/work-package" element={<WorkPackage />} />
      <Route path="/oauth/callback" element={<Callback />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Account />} />
      <Route path="/setup-2fa" element={<Setup2FA />} />
      <Route path="/access-requests" element={<AccessRequests />} />
      <Route path="/ivas" element={<IvaManager />} />
      <Route path="/confirm-2fa" element={<Confirm2FA />} />
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
        if (user && !user.timeout) {
          // user is logged in, but session has expired
          authService.logout().then(() => {
            console.info("You have been logged out.");
            showMessage({
              type: "error",
              title: "Your user session has expired",
              detail:
                "You need to log in again if you want" +
                " to continue your authenticated user session.",
              callback1: () => {},
              label1: "Continue unauthenticated",
              callback2: () => {
                if (
                  !location.pathname.match("/(register|confirm-2fa|setup-2fa)")
                ) {
                  sessionStorage.setItem("lastPath", location.pathname);
                }
                authService.login();
              },
              label2: "Log in again",
              modal: true,
            });
          });
          user = null;
        }
        if (
          user &&
          /Registered|(Needs|Lost|New)TotpToken/.test(user.state) &&
          !/^\/(setup|confirm)-2fa/.test(location.pathname)
        ) {
          navigate("/setup-2fa");
        }
        if (
          user &&
          user.state === "HasTotpToken" &&
          location.pathname !== "/confirm-2fa"
        ) {
          navigate("/confirm-2fa");
        }
        if (
          user &&
          /NeedsRegistration|NeedsReRegistration/.test(user.state) &&
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
