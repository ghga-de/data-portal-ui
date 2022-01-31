import React from 'react';
import logo from "../../assets/ghga.png"
import HeaderIcons from './headerIcons';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

const HeaderNavbar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="white">
      <Container className="align-items-start">
        <Navbar.Brand>
          <img src={logo} alt='GHGA logo' height="70px" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-2" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown className="fw-bold" title="ABOUT US" id="collasible-nav-dropdown">
              <NavDropdown.Item href="">MISSION</NavDropdown.Item>
              <NavDropdown.Item href="">WORKSTREAMS</NavDropdown.Item>
              <NavDropdown.Item href="">TEAM</NavDropdown.Item>
              <NavDropdown.Item href="https://ghga.dkfz.de/">INSTITUTIONS</NavDropdown.Item>
              <NavDropdown.Item href="">PARTNERS</NavDropdown.Item>
              <NavDropdown.Item href="">JOBS</NavDropdown.Item>
              <NavDropdown.Item href="">CONTACT</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown className="fw-bold" title="COMMUNITY" id="collasible-nav-dropdown">
              <NavDropdown.Item href="">CANCER</NavDropdown.Item>
              <NavDropdown.Item href="">RARE DISEASE</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown className="fw-bold" title="NEWS & EVENTS" id="collasible-nav-dropdown">
              <NavDropdown.Item href="">NEWS</NavDropdown.Item>
              <NavDropdown.Item href="">EVENTS</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown className="fw-bold" title="RESOURCES" id="collasible-nav-dropdown">
              <NavDropdown.Item href="https://ghga.dkfz.de/">GHGA WEBSITE</NavDropdown.Item>
              <NavDropdown.Item href="">PUBLICATIONS</NavDropdown.Item>
              <NavDropdown.Item href="">BIOINFORMATICS</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <HeaderIcons />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default HeaderNavbar;
