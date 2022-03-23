import React from 'react';
import { Nav, Navbar, } from 'react-bootstrap'
import { Twitter, Github, Youtube, } from 'react-bootstrap-icons'

const HeaderIcons = () => {
  return (
    <Nav className="d-inline-block mb-3 mt-2 mx-lg-3">
      <Navbar.Brand target="_blank" href="https://twitter.com/GHGA_DE">
        <Twitter color="grey" size={25} />
      </Navbar.Brand>
      <Navbar.Brand target="_blank" href="https://github.com/ghga-de">
        <Github color="grey" size={25} />
      </Navbar.Brand>
      <Navbar.Brand target="_blank" href="https://www.youtube.com/channel/UC7Yqi4gBl86drcUxwwEe6EA">
        <Youtube color="grey" size={25} />
      </Navbar.Brand>
    </Nav>
  )
}

export default HeaderIcons;
