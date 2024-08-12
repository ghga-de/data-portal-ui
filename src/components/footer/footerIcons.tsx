import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faBluesky,
  faGithub,
  faLinkedinIn,
  faMastodon,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { Container } from "react-bootstrap";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const FooterIcons = () => {
  const year = new Date().getFullYear();
  return (
    <Container className="mb-2 text-center fs-2">
      <a
        rel="noreferrer"
        className="mx-2 text-muted"
        href="https://genomic.social/@ghga"
        title="Mastodon"
      >
        <FontAwesomeIcon icon={faMastodon} />
      </a>
      <a
        rel="noreferrer"
        className="mx-2 text-muted"
        href="https://www.linkedin.com/company/the-german-human-genome-phenome-archive/"
        title="LinkedIn"
      >
        <FontAwesomeIcon icon={faLinkedinIn} />
      </a>
      <a
        rel="noreferrer"
        className="mx-2 text-muted"
        href="https://bsky.app/profile/ghga.bsky.social"
        title="Bluesky"
      >
        <FontAwesomeIcon icon={faBluesky} />
      </a>
      <a
        rel="noreferrer"
        className="mx-2 text-muted"
        href="https://github.com/ghga-de"
        title="GitHub"
      >
        <FontAwesomeIcon icon={faGithub} />
      </a>
      <a
        rel="noreferrer"
        className="mx-2 text-muted"
        href="https://www.youtube.com/channel/UC7Yqi4gBl86drcUxwwEe6EA"
        title="YouTube"
      >
        <FontAwesomeIcon icon={faYoutube} />
      </a>
      <a
        rel="noreferrer"
        className="mx-2 text-muted"
        href="https://www.ghga.de/about-us/contact"
        title="Contact"
      >
        <FontAwesomeIcon icon={faEnvelope} />
      </a>
      <p className="mt-2 fs-7 text-muted mb-4">
        &#169;{year} GHGA. All Rights Reserved.
        <br />
        <a href="https://www.ghga.de/imprint" target="_blank" rel="noreferrer">
          Imprint
        </a>
        {" | "}
        <a href="https://www.ghga.de/data-protection" rel="noreferrer">
          Data Protection
        </a>
        {" | "}
        <Link
          to="https://www.ghga.de/Downloads/Terms_of_Use_-_GHGA_Data_Infrastructure_V1.0.pdf"
          rel="noreferrer"
        >
          Terms of Use
        </Link>
      </p>
    </Container>
  );
};

export default FooterIcons;
