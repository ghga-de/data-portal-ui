import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGithub,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { Container } from "react-bootstrap";

const FooterIcons = () => {
  const year = new Date().getFullYear()
  return (
      <Container className="mb-2 text-center fs-3">
        <a target="_blank" rel="noreferrer" className="mx-2" href="https://twitter.com/GHGA_DE">
          <FontAwesomeIcon icon={faTwitter}/>
        </a>
        <a target="_blank" rel="noreferrer" className="mx-2" href="https://github.com/ghga-de">
          <FontAwesomeIcon icon={faGithub}/>
        </a>
        <a
          target="_blank"
          rel="noreferrer" className="mx-2"
          href="https://www.youtube.com/channel/UC7Yqi4gBl86drcUxwwEe6EA"
        >
          <FontAwesomeIcon icon={faYoutube}/>
        </a>
        <p className="mt-2 fs-8 text-black-50 mb-4">&#169;{year} GHGA. All Rights Reserved.</p>
      </Container>
  );
};

export default FooterIcons;
