import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { Nav, Navbar, } from 'react-bootstrap'

const HeaderIcons = () => {
  return (
    <Nav className="d-inline-block mb-3 mt-2 mx-lg-3">
      <Navbar.Brand target="_blank" href="https://twitter.com/GHGA_DE">
        <FontAwesomeIcon icon={faTwitter} className="fs-4 text-black-50" />
      </Navbar.Brand>
      <Navbar.Brand target="_blank" href="https://github.com/ghga-de">
        <FontAwesomeIcon icon={faGithub} className="fs-4 text-black-50" />
      </Navbar.Brand>
      <Navbar.Brand target="_blank" href="https://www.youtube.com/channel/UC7Yqi4gBl86drcUxwwEe6EA">
        <FontAwesomeIcon icon={faYoutube} className="fs-4 text-black-50" />
      </Navbar.Brand>
    </Nav>
  )
}

export default HeaderIcons;
