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

import logo from "../../assets/GHGA_logo_clean.png";
import {
  Navbar,
  Nav,
  Button,
  Row,
  Col,
  Offcanvas,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import LoginButton from "./loginButton";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faUsersGear,
} from "@fortawesome/free-solid-svg-icons";
import {
  faAddressBook,
  faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";
import { useAuth } from "../../services/auth";

/** Navigation bar in the main header */
const HeaderNavbar = () => {
  const navLinkClasses =
    "h-100 m-0 py-2 pt-lg-1 pb-lg-1 px-lg-0 px-xl-2 w-100 w-lg-auto text-white btn";

  const activePageStyle = navLinkClasses + " btn-secondary ";
  const inactivePageStyle = navLinkClasses + " btn-primary";

  const navColsSpanXS = "auto";
  const navColsClasses = "text-center mb-2 mb-lg-0 mx-lg-1 mx-xl-2 ";

  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const handleCloseOffCanvas = () => setShowOffCanvas(false);
  const handleShowOffCanvas = () => setShowOffCanvas(true);

  const { user } = useAuth();

  return (
    <Navbar expand="lg" bg="primary" variant="dark" className="p-0">
      <Row className="w-100 mx-0 justify-content-between">
        <Col xs={12} sm={10} lg={3} className="text-center text-md-start px-0">
          <Navbar.Brand className="ps-xxl-5 me-0">
            <NavLink to="/" end>
              <Button className="p-1 m-0 ps-xl-3">
                <div className="d-flex align-items-center">
                  <div
                    style={{ width: "80%" }}
                    className="flex-fill pe-1 me-1 border-end border-tertiary"
                  >
                    <img src={logo} alt="GHGA logo" height="35px" />
                  </div>
                  <div
                    className="text-tertiary text-start h-100"
                    style={{ fontFamily: "Lexend" }}
                  >
                    <span
                      className="position-relative"
                      style={{ fontSize: "23px", top: "4px" }}
                    >
                      DATA
                    </span>
                    <br />
                    <span
                      className="fs-6 position-relative"
                      style={{ top: "-6px" }}
                    >
                      PORTAL
                    </span>
                  </div>
                </div>
              </Button>
            </NavLink>
          </Navbar.Brand>
        </Col>
        <Col className="px-0 d-flex justify-content-end" xs={12} sm={2} lg={9}>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="border border-2 border-tertiary text-white mb-1 w-100 w-md-auto"
            onClick={() => handleShowOffCanvas()}
          />
          <Navbar.Offcanvas
            id="responsive-navbar-nav"
            className="justify-content-center bg-primary border-0"
            placement="end"
            show={showOffCanvas}
            onHide={handleCloseOffCanvas}
          >
            <Offcanvas.Header
              closeButton
              closeVariant="white"
              className="text-white"
            >
              Navigation
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Row className="justify-content-between w-100 mx-0">
                <Col
                  xs={12}
                  lg={showOffCanvas ? 12 : 9}
                  className="mb-2 mb-lg-0 px-0"
                >
                  <Nav
                    className="justify-content-center h-100 h-lg-auto"
                    style={{ height: "36px", whiteSpace: "nowrap" }}
                  >
                    <Col
                      xs={navColsSpanXS}
                      className={navColsClasses}
                      onClick={() => handleCloseOffCanvas()}
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
                    </Col>
                    <Col
                      xs={navColsSpanXS}
                      className={navColsClasses}
                      onClick={() => handleCloseOffCanvas()}
                    >
                      <NavLink
                        to="/browse"
                        className={({ isActive }) =>
                          isActive ? activePageStyle : inactivePageStyle
                        }
                      >
                        Browse Data
                      </NavLink>
                    </Col>
                    <Col
                      xs={navColsSpanXS}
                      className={navColsClasses}
                      onClick={() => handleCloseOffCanvas()}
                    >
                      <NavLink
                        to="https://docs.ghga.de/faq"
                        target="_blank"
                        className={inactivePageStyle}
                      >
                        FAQ
                        <FontAwesomeIcon
                          icon={faArrowUpRightFromSquare}
                          transform={"shrink-6"}
                          className="ms-1"
                        />
                      </NavLink>
                    </Col>
                    <Col
                      xs={navColsSpanXS}
                      className={navColsClasses}
                      onClick={() => handleCloseOffCanvas()}
                    >
                      <NavLink
                        to="https://docs.ghga.de/"
                        target="_blank"
                        className={inactivePageStyle}
                      >
                        Docs
                        <FontAwesomeIcon
                          icon={faArrowUpRightFromSquare}
                          transform={"shrink-6"}
                          className="ms-1"
                        />
                      </NavLink>
                    </Col>
                    {user && user.role === "data_steward" ? (
                      <>
                        <Dropdown>
                          <DropdownButton
                            title={
                              <>
                                <FontAwesomeIcon
                                  icon={faUsersGear}
                                  transform={"up-1"}
                                />{" "}
                                Admin
                              </>
                            }
                            className={navColsClasses + " col-" + navColsSpanXS}
                          >
                            <NavLink
                              to="/ivas"
                              className={({ isActive }) =>
                                isActive ? "text-secondary" : ""
                              }
                            >
                              <Dropdown.Item
                                as={"span"}
                                style={{ color: "inherit" }}
                              >
                                <FontAwesomeIcon icon={faAddressBook} /> IVA
                                Manager
                              </Dropdown.Item>
                            </NavLink>
                            <NavLink
                              to="/access-requests"
                              className={({ isActive }) =>
                                isActive ? "text-secondary" : ""
                              }
                            >
                              <Dropdown.Item
                                as={"span"}
                                style={{ color: "inherit" }}
                              >
                                <FontAwesomeIcon icon={faPenToSquare} /> Access
                                Requests Manager
                              </Dropdown.Item>
                            </NavLink>
                          </DropdownButton>
                        </Dropdown>
                      </>
                    ) : (
                      <></>
                    )}
                  </Nav>
                </Col>
                <Col
                  className={
                    "justify-content-end d-flex px-0" +
                    (showOffCanvas ? " pt-sm-3" : " pe-xl-2 pe-xxl-5")
                  }
                  xs={12}
                  lg={showOffCanvas ? 12 : 3}
                >
                  <LoginButton />
                </Col>
              </Row>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Col>
      </Row>
    </Navbar>
  );
};

export default HeaderNavbar;
