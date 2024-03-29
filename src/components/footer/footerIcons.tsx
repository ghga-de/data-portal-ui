import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faTwitter,
  faGithub,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { Container } from "react-bootstrap";

const FooterIcons = () => {
  const year = new Date().getFullYear();
  return (
    <Container className="mb-2 text-center fs-2">
      <a
        target="_blank"
        data-testid="twitter"
        rel="noreferrer"
        className="mx-2 text-black"
        href="https://twitter.com/GHGA_DE"
      >
        <FontAwesomeIcon icon={faTwitter} />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        className="mx-2 text-black"
        href="https://github.com/ghga-de"
      >
        <FontAwesomeIcon icon={faGithub} />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        className="mx-2 text-black"
        href="https://www.youtube.com/channel/UC7Yqi4gBl86drcUxwwEe6EA"
      >
        <FontAwesomeIcon icon={faYoutube} />
      </a>
      <p className="mt-2 fs-7 text-muted mb-4">
        &#169;{year} GHGA. All Rights Reserved.<br/>
        <a href="https://www.ghga.de/imprint" target="_blank" rel="noreferrer">Imprint</a>
        {" | "}
        <a href="https://www.ghga.de/data-protection" target="_blank" rel="noreferrer">Data Protection</a>
        {" | "}
        <Link to="/terms-of-use">Terms of Use</Link>
      </p>
    </Container>
  );
};

export default FooterIcons;
