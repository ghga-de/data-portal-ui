import { useEffect, useState } from "react";
import logo from "../../assets/data-portal.png";
import { Navbar, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
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
      className="p-0"
    >
      <div className="container px-5 d-flex justify-content-between">
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="border-2 text-white"
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Navbar.Brand className="p-0 col-2">
            <Button href="/" className="p-1 m-0">
              <img src={logo} alt="GHGA logo" className="w-100" />
            </Button>
          </Navbar.Brand>
          <Nav
            className="justify-content-center flex-fill"
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
            <Nav.Link
              href="https://www.ghga.de/data/data-download"
              target="_blank"
              className="mx-2 p-0"
            >
              <Button
                variant="primary"
                className="p-0 w-100 h-100 m-0 px-2 text-white"
              >
                Download
              </Button>
            </Nav.Link>
            <Nav.Link
              href="https://www.ghga.de/data/data-upload"
              target="_blank"
              className="mx-2 p-0"
            >
              <Button
                variant="primary"
                className="p-0 w-100 h-100 m-0 px-2 text-white"
              >
                Upload
              </Button>
            </Nav.Link>
            <NavLink
              to="/metadata-model"
              className={({ isActive }) =>
                isActive ? activePageStyle : inactivePageStyle
              }
            >
              Metadata Model
            </NavLink>
          </Nav>
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
                <Button variant="secondary" className="text-white">
                  Login <FontAwesomeIcon icon={faUser} className="ms-1" />
                </Button>
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default HeaderNavbar;
