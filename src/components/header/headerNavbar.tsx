import React from "react";
import { useEffect, useState } from "react";
import logo from "../../assets/GHGA_logo_clean.png";
import { Navbar, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import HeaderSearchbar from "./headerSearchbar";
import authService, { User } from "../../services/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

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
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-center">
          <Nav
            className="justify-content-center"
            style={{ height: "36px" }}
          >
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
      <div className="w-25 justify-content-center d-flex">
        <HeaderSearchbar />
        <Nav
            className=""
            style={{ height: "36px" }}
          >
            {user ? (
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? activePageStyle : inactivePageStyle
                }
              >
                <FontAwesomeIcon icon={faUser} className="ms-1" /> {user.name}
              </NavLink>
            ) : (
              <NavLink to="/login">
                <Button variant="secondary" className="text-white"
                  onClick={onLogin}>
                  Login <FontAwesomeIcon icon={faUser} className="ms-1" />
                </Button>
              </NavLink>
            )}
          </Nav>
      </div>
    </Navbar>
  );
};

export default HeaderNavbar;
