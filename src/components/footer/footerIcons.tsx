// Copyright 2021 - 2024 Universität Tübingen, DKFZ and EMBL
// for the German Human Genome-Phenome Archive (GHGA)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
