import { Col, Row } from "react-bootstrap";
import "react-perfect-scrollbar/dist/css/styles.css";
import logo from "../../../assets/GHGA_full_Logo_orange.png";

/**
 * Section on the home page where an "About us" section is displayed.
 */
const HomeBottomSection = () => {
  const PARAGRAPH_CLASS = "fs-lg-5 text-md-justify";
  const LINK_CLASS = "text-secondary";
  return (
    <div className="pt-4 px-lg-2">
      <h3 className="fw-bold px-lg-4 pb-2 text-center text-lg-start">
        About GHGA
      </h3>
      <h4 className="mb-0 px-lg-4 text-center text-lg-start">
        GHGA &ndash; The German Human Genome&#8209;Phenome Archive
      </h4>
      <Row className="p-2 p-lg-4 align-items-center">
        <Col md={5} lg={4} xl={3}>
          <img alt="GHGA Logo" src={logo} className="w-100" />
        </Col>
        <Col>
          <p className={PARAGRAPH_CLASS}>
            GHGA is a national infrastructure to enable the FAIR and secure
            sharing of genetic and other human omics data. It is embedded in
            European activities such as the federated European Genome-Phenome
            Archive (
            <a
              className={LINK_CLASS}
              href="https://ega-archive.org/about/projects-and-funders/federated-ega/"
            >
              FEGA
            </a>
            ) and the European Genomic Data Infrastructure (
            <a className={LINK_CLASS} href="https://gdi.onemilliongenomes.eu/">
              GDI
            </a>
            ).
          </p>
          <p className={PARAGRAPH_CLASS}>
            GHGA is funded by the Deutsche Forschungsgemeinschaft (DFG, German
            Research Foundation, Grant Number{" "}
            <a
              className={LINK_CLASS}
              href="https://gepris.dfg.de/gepris/projekt/441914366?context=projekt&task=showDetail&id=441914366&"
            >
              441914366
            </a>
            ) as part of the National Research Data Infrastructure initiative (
            <a className={LINK_CLASS} href="https://www.nfdi.de/?lang=en">
              NFDI
            </a>
            ) and by the contributing institutions.
          </p>
          <p className={PARAGRAPH_CLASS}>
            More at{" "}
            <a className={LINK_CLASS} href="https://www.ghga.de">
              www.ghga.de
            </a>
            .
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default HomeBottomSection;
