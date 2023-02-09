import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Nav,
  Navbar,
  Overlay,
  OverlayTrigger,
  Popover,
  Tooltip,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../../assets/GHGA_logo_clean.png";
import authService, { User } from "../../services/auth";
import lsLogin from "../../assets/loginLS/ls-login.png";

const HeaderNavbar = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    authService.getUser().then(setUser);
    document.addEventListener("auth", (e) =>
      setUser((e as CustomEvent).detail)
    );
  }, []);

  function onLogin() {
    // memorize the last URL when the login button was clicked
    sessionStorage.setItem("lastUrl", window.location.href);
  }

  const activePageStyle =
    "btn btn-secondary p-0 h-100 m-0 mx-2 px-2 pt-1 text-white";
  const inactivePageStyle =
    "btn btn-primary p-0 h-100 m-0 mx-2 px-2 pt-1 text-white";

  const [show, setShow] = useState(false);
  const target = useRef(null);

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="primary"
      variant="dark"
      className="p-0 d-flex justify-content-between"
    >
      <NavLink to="/" end={true} className="ps-5 w-25">
        <Button className="p-1 m-0 ps-3">
          <div className="d-flex align-items-center">
            <div
              style={{ width: "80%" }}
              className="flex-fill pe-2 me-2 border-end border-tertiary"
            >
              <img src={logo} alt="GHGA logo" height="35px" />
            </div>
            <div
              className="text-tertiary h-100"
              style={{ fontFamily: "Lexend" }}
            >
              <span
                className="position-relative"
                style={{ fontSize: "18px", top: "5px" }}
              >
                DATA
              </span>
              <br />
              <span className="fs-5 position-relative" style={{ top: "-5px" }}>
                PORTAL
              </span>
            </div>
          </div>
        </Button>
      </NavLink>
      <div className="container px-5 mx-auto w-50 d-flex">
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="border-2 text-white"
        />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-center"
        >
          <Nav className="justify-content-center" style={{ height: "36px" }}>
            <NavLink
              to="/"
              end={true}
              className={({ isActive }) =>
                isActive ? activePageStyle : inactivePageStyle
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/browse"
              className={({ isActive }) =>
                isActive ? activePageStyle : inactivePageStyle
              }
            >
              Browse
            </NavLink>
            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                isActive ? activePageStyle : inactivePageStyle
              }
            >
              About
            </NavLink>
            <NavLink
              to="/download"
              className={({ isActive }) =>
                isActive ? activePageStyle : inactivePageStyle
              }
            >
              Download
            </NavLink>
            <NavLink
              to="/upload"
              className={({ isActive }) =>
                isActive ? activePageStyle : inactivePageStyle
              }
            >
              Upload
            </NavLink>
            <NavLink
              to="/metadata-model"
              className={({ isActive }) =>
                isActive ? activePageStyle : inactivePageStyle
              }
            >
              Metadata Model
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </div>
      <div className="w-25 justify-content-end d-flex pe-5">
        <Nav className="" style={{ height: "36px" }}>
          {user ? (
            <>
              <OverlayTrigger
                trigger="click"
                key="profile"
                placement="bottom-end"
                overlay={
                  <Popover
                    id={"ProfilePopover"}
                    className="border border-2 border-tertiary"
                  >
                    <Popover.Body className="text-center fs-6 px-4">
                      <p>
                        <NavLink to="/profile">View profile</NavLink>
                      </p>
                      <p className="mt-3">
                        <a
                          href="https://profile.aai.lifescience-ri.eu/profile"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Manage your<br/>LS Login Account
                        </a>
                        .
                      </p>
                      <Button
                        variant="secondary"
                        className="text-white mt-4"
                        onClick={logout}
                      >
                        Logout
                      </Button>
                    </Popover.Body>
                  </Popover>
                }
              >
                <button
                  className="bg-tertiary justify-content-center align-items-center d-flex p-0 border-0"
                  style={{
                    borderRadius: "50%",
                    width: "46px",
                    height: "46px",
                    marginTop: "-4px",
                  }}
                  title="Login"
                  ref={target}
                  onMouseEnter={() => setShow(true)}
                  onMouseLeave={() => setShow(false)}
                  onMouseDown={() => setShow(!show)}
                  onClick={onLogin}
                >
                  <div
                    className="bg-quinary justify-content-center align-items-center d-flex text-tertiary"
                    style={{
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    {user.name.split(" ").map((x) => x[0])}
                  </div>
                </button>
              </OverlayTrigger>
              <Overlay target={target.current} show={show} placement="left">
                {(props) => (
                  <Tooltip id="overlay-example" {...props}>
                    You are signed in!
                  </Tooltip>
                )}
              </Overlay>
            </>
          ) : (
            <>
              <OverlayTrigger
                trigger="click"
                key="login"
                placement="bottom-end"
                overlay={
                  <Popover
                    id={"LoginPopover"}
                    className="border border-2 border-tertiary"
                  >
                    <Popover.Body className="fs-8 text-center">
                      <p>
                        You do not need an account to browse our datasets, but
                        if you wish to request or upload data, you must log in
                        via Life Science Login (LS Login)
                      </p>
                      <p>
                        LS Login lets you authenticate using your existing
                        accounts at third parties (your home university,
                        research institute or a commercial service) and link it
                        to your LS ID. Alternatively, you can also activate an
                        LS account with username and password.
                      </p>
                      <button className="p-0 border-0">
                        <img
                          src={lsLogin}
                          alt="LS Login"
                          width="200px"
                          onClick={() => authService.login()}
                        />
                      </button>
                    </Popover.Body>
                  </Popover>
                }
              >
                <button
                  className="bg-tertiary justify-content-center align-items-center d-flex p-0 border-0"
                  style={{
                    borderRadius: "50%",
                    width: "44px",
                    height: "44px",
                    marginTop: "-3px",
                  }}
                  title="Login"
                  ref={target}
                  onMouseEnter={() => setShow(true)}
                  onMouseLeave={() => setShow(false)}
                  onMouseDown={() => setShow(!show)}
                >
                  <div
                    className="bg-primary justify-content-center align-items-center d-flex text-tertiary"
                    style={{
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
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
              <Overlay target={target.current} show={show} placement="left">
                {(props) => (
                  <Tooltip id="overlay-example" {...props}>
                    Log In
                  </Tooltip>
                )}
              </Overlay>
            </>
          )}
        </Nav>
      </div>
    </Navbar>
  );
};

export default HeaderNavbar;
