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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import {
  Button,
  Overlay,
  OverlayTrigger,
  Popover,
  Tooltip,
} from "react-bootstrap";
import lsLogin from "../../assets/loginLS/ls-login.png";
import {
  faArrowRightFromBracket,
  faArrowRightToBracket,
  faArrowUpRightFromSquare,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../services/auth";

const LoginButton = () => {
  const navigate = useNavigate();
  const { user, loginUser, logoutUser } = useAuth();

  let location = useLocation();

  const login = async () => {
    // memorize the last URL when the login button was clicked
    if (location.pathname !== "/register") {
      sessionStorage.setItem("lastPath", location.pathname);
    }
    await loginUser();
  };

  const [showTooltip, setShowTooltip] = useState(false);
  const target = useRef(null);

  const [showPopover, setShowPopover] = useState(false);

  const logout = async () => {
    await logoutUser();
    window.location.reload();
  };

  const getStatusString = () => {
    switch (user?.state) {
      case "NeedsRegistration":
        return "Registration";
      case "NeedsReRegistration":
        return "Re-registration";
      default:
        return "2FA setup";
    }
  };

  const getPageNavigation = () => {
    switch (user?.state) {
      case "NeedsRegistration":
        return "/register";
      case "NeedsReRegistration":
        return "/register";
      default:
        return "/setup-2fa";
    }
  };

  const [show, setShow] = useState(false);

  return (
    <div className="me-3 me-xxl-0">
      {user ? (
        user.state !== "Authenticated" ? (
          <>
            <OverlayTrigger
              trigger="click"
              key="account"
              placement="bottom-end"
              rootClose
              overlay={
                <Popover
                  id={"LoginPopover"}
                  className="border border-2 border-tertiary"
                >
                  <Popover.Body className="text-center fs-6 px-4">
                    <p>
                      You need to complete your {getStatusString()} with the
                      GHGA Data Portal before you can start using your LS Login
                      account.
                    </p>
                    <Button
                      variant="quinary"
                      className="text-white fs-7"
                      onClick={() => {
                        navigate(getPageNavigation());
                        // setShowPopover(false);
                        // document.body.click();
                      }}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} className="me-2" />
                      Complete {getStatusString()}
                    </Button>
                    <Button
                      variant="danger"
                      className="text-white mt-3 fs-7"
                      onClick={() => logout()}
                    >
                      <FontAwesomeIcon
                        icon={faArrowRightFromBracket}
                        className="me-2"
                      />
                      Cancel and log out
                    </Button>
                  </Popover.Body>
                </Popover>
              }
            >
              <button
                className="bg-tertiary justify-content-center align-items-center d-flex p-0 border-0"
                style={{
                  borderRadius: "50%",
                  width: "43px",
                  height: "43px",
                  marginTop: "-4px",
                }}
                title={"Complete " + getStatusString().toLowerCase()}
                ref={target}
                onMouseEnter={() => {
                  setShowTooltip(true && !showPopover);
                }}
                onMouseLeave={() => setShowTooltip(false)}
                onMouseDown={() => {
                  setShowTooltip(!showTooltip);
                  setShowPopover(!showPopover);
                }}
              >
                <div
                  className="bg-quinary justify-content-center align-items-center d-flex text-tertiary"
                  style={{
                    borderRadius: "50%",
                    width: "37px",
                    height: "37px",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faArrowRightToBracket}
                    className="m-0"
                    transform="grow-3"
                  />
                </div>
              </button>
            </OverlayTrigger>
            <Overlay
              target={target.current}
              show={showTooltip}
              placement="left"
            >
              {(props) => (
                <Tooltip id="registertooltip" {...props}>
                  {getStatusString()} required
                </Tooltip>
              )}
            </Overlay>
          </>
        ) : (
          <>
            <OverlayTrigger
              trigger="click"
              key="account"
              placement="bottom-end"
              rootClose
              onToggle={() => setShow(!show)}
              show={show}
              overlay={
                <Popover
                  id={"LoginPopover"}
                  className="border border-2 border-tertiary"
                >
                  <Popover.Body className="text-center fs-6 px-4">
                    <p>
                      You are logged in as:
                      <br />
                      {user.title} {user.name}
                    </p>
                    <p className="mt-4">
                      <Link to={"/profile"}>
                        <Button
                          variant="quinary"
                          onClick={() => {
                            setShow(false);
                          }}
                        >
                          View account page
                        </Button>
                      </Link>
                    </p>
                    <p className="mt-3">
                      <Link
                        to="https://profile.aai.lifescience-ri.eu/profile"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Button
                          variant="outline-tertiary"
                          className="text-quinary border-quinary"
                        >
                          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />{" "}
                          Manage your
                          <br />
                          LS Login account
                        </Button>
                      </Link>
                    </p>
                    <Button
                      variant="danger"
                      className="text-white mt-4"
                      onClick={logout}
                    >
                      Log out
                    </Button>
                  </Popover.Body>
                </Popover>
              }
            >
              <button
                className="bg-tertiary justify-content-center align-items-center d-flex p-0 border-0"
                style={{
                  borderRadius: "50%",
                  width: "43px",
                  height: "43px",
                  marginTop: "-4px",
                }}
                title="Login"
                ref={target}
                onMouseEnter={() => {
                  setShowTooltip(true && !showPopover);
                }}
                onMouseLeave={() => setShowTooltip(false)}
                onMouseDown={() => {
                  setShowTooltip(!showTooltip);
                  setShowPopover(!showPopover);
                }}
              >
                <div
                  className="bg-quinary justify-content-center align-items-center d-flex text-tertiary"
                  style={{
                    borderRadius: "50%",
                    width: "37px",
                    height: "37px",
                  }}
                >
                  {user.name.split(" ").map((x) => x[0])}
                </div>
              </button>
            </OverlayTrigger>
            <Overlay
              target={target.current}
              show={showTooltip}
              placement="left"
            >
              {(props) => (
                <Tooltip id="loggedintooltip" {...props}>
                  Logged in!
                </Tooltip>
              )}
            </Overlay>
          </>
        )
      ) : (
        <>
          <OverlayTrigger
            trigger="click"
            key="login"
            placement="bottom-end"
            rootClose
            overlay={
              <Popover
                id={"LoginPopover"}
                className="border border-2 border-tertiary"
                show={showPopover}
              >
                <Popover.Body className="fs-8 text-center">
                  <p>
                    You do not need an account to browse our datasets, but if
                    you wish to request or upload data, you must log in via Life
                    Science Login (LS Login).
                  </p>
                  <p>
                    LS Login lets you authenticate using your existing accounts
                    at third parties (your home university, research institute
                    or a commercial service) and link it to your LS ID.
                    Alternatively, you can also activate an LS account with
                    username and password.
                  </p>
                  <button className="p-0 border-0" onClick={() => login()}>
                    <img src={lsLogin} alt="LS Login" width="200px" />
                  </button>
                </Popover.Body>
              </Popover>
            }
          >
            <button
              className="bg-tertiary justify-content-center align-items-center d-flex p-0 border-0"
              style={{
                borderRadius: "50%",
                width: "41px",
                height: "41px",
                marginTop: "-3px",
              }}
              title="Login"
              ref={target}
              onMouseEnter={() => {
                setShowTooltip(true && !showPopover);
              }}
              onMouseLeave={() => setShowTooltip(false)}
              onMouseDown={() => {
                setShowTooltip(!showTooltip);
                setShowPopover(!showPopover);
              }}
            >
              <div
                className="bg-primary justify-content-center align-items-center d-flex text-tertiary"
                style={{
                  borderRadius: "50%",
                  width: "37px",
                  height: "37px",
                }}
              >
                <FontAwesomeIcon
                  icon={faArrowRightToBracket}
                  className="m-0"
                  transform="grow-3"
                />
              </div>
            </button>
          </OverlayTrigger>
          <Overlay target={target.current} show={showTooltip} placement="left">
            {(props) => (
              <Tooltip id="overlay-example" {...props}>
                Log in
              </Tooltip>
            )}
          </Overlay>
        </>
      )}
    </div>
  );
};

export default LoginButton;
