import React from "react";
import logo from "../../assets/data-portal.png";
import { Navbar, Container, Nav } from "react-bootstrap";

const HeaderNavbar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand className="p-0" >
          <a href="/">
            <img src={logo} alt="GHGA logo" height="50px"/>
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-2 text-light" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="justify-content-center flex-fill">
            <Nav.Link href="/" className="text-light mx-2">Home</Nav.Link>
            <Nav.Link href="https://www.ghga.de/data/data-download" className="mx-2">Download</Nav.Link>
            <Nav.Link href="https://www.ghga.de/data/data-upload" className="mx-2">Upload</Nav.Link>
            <Nav.Link href="https://www.ghga.de/data/metadata-model" className="mx-2">Metadata Model</Nav.Link>
            <Nav.Link href="https://www.ghga.de/data/about-ghga-beta" className="mx-2">About / FAQ</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderNavbar;
