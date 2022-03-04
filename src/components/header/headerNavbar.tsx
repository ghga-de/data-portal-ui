import React from 'react';
import logo from "../../assets/ghga.png"
import HeaderIcons from './headerIcons';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const HeaderNavbar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="white">
      <Container className="align-items-start">
        <Navbar.Brand>
          <Link to="/"><img src={logo} alt='GHGA logo' height="70px" /></Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-2" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown className="fw-bold" title="ABOUT US" id="collasible-nav-dropdown">
              <NavDropdown.Item href="">Mission</NavDropdown.Item>
              <NavDropdown.Item href="">Workstreams</NavDropdown.Item>
              <NavDropdown.Item href="">Team</NavDropdown.Item>
              <NavDropdown.Item href="https://ghga.dkfz.de/">Institutions</NavDropdown.Item>
              <NavDropdown.Item href="">Partners</NavDropdown.Item>
              <NavDropdown.Item href="">Jobs</NavDropdown.Item>
              <NavDropdown.Item href="">Contact</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown className="fw-bold" title="COMMUNITY" id="collasible-nav-dropdown">
              <NavDropdown.Item href="">Cancer</NavDropdown.Item>
              <NavDropdown.Item href="">Rare Disease</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown className="fw-bold" title="NEWS & EVENTS" id="collasible-nav-dropdown">
              <NavDropdown.Item href="">News</NavDropdown.Item>
              <NavDropdown.Item href="">Events</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown className="fw-bold" title="RESOURCES" id="collasible-nav-dropdown">
              <NavDropdown.Item href="https://ghga.dkfz.de/">GHGA Website</NavDropdown.Item>
              <NavDropdown.Item href="">Publications</NavDropdown.Item>
              <NavDropdown.Item href="">Bioinformatics</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <HeaderIcons />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default HeaderNavbar;
