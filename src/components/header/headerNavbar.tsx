import React from "react";
import logo from "../../assets/ghga.png";
import { Navbar, Container, Nav } from "react-bootstrap";

const HeaderNavbar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand className="p-0" >
          <a href="/">
            <img src={logo} alt="GHGA logo" height="40px"/>
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-2 text-light" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="justify-content-center flex-fill">
            <Nav.Link className="text-light mx-2">Home</Nav.Link>
            <Nav.Link className="mx-2">Download</Nav.Link>
            <Nav.Link className="mx-2">Upload</Nav.Link>
            <Nav.Link className="mx-2">Metadata Model</Nav.Link>
            <Nav.Link className="mx-2">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderNavbar;
