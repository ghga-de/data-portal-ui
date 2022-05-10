import React from "react";
import logo from "../../assets/data-portal.png";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

const HeaderNavbar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" className="p-0">
      <Container>
        <Navbar.Brand className="p-0" >
          <Button href="/" className="p-1 m-0">
            <img src={logo} alt="GHGA logo" height="50px"/>
          </Button>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-2 text-white" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="justify-content-center flex-fill" style={{height: '36px'}}>
            <Nav.Link href="/" className="mx-2 p-0"><Button variant="secondary" className="p-0 w-100 h-100 m-0 px-2 text-white">Home</Button></Nav.Link>
            <Nav.Link href="/browse" className="mx-2 p-0"><Button variant="primary" className="p-0 w-100 h-100 m-0 px-2 text-white">Browse</Button></Nav.Link>
            <Nav.Link href="https://www.ghga.de/data/about-ghga-beta" target="_blank" className="mx-2 p-0"><Button variant="primary" className="p-0 w-100 h-100 m-0 px-2 text-white">About</Button></Nav.Link>
            <Nav.Link href="https://www.ghga.de/data/data-download" target="_blank" className="mx-2 p-0"><Button variant="primary" className="p-0 w-100 h-100 m-0 px-2 text-white">Download</Button></Nav.Link>
            <Nav.Link href="https://www.ghga.de/data/data-upload" target="_blank" className="mx-2 p-0"><Button variant="primary" className="p-0 w-100 h-100 m-0 px-2 text-white">Upload</Button></Nav.Link>
            <Nav.Link href="https://www.ghga.de/data/metadata-model" target="_blank" className="mx-2 p-0"><Button variant="primary" className="p-0 w-100 h-100 m-0 px-2 text-white">Metadata Model</Button></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderNavbar;
