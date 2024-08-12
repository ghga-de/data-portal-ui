import { Col, Row } from "react-bootstrap";
import "react-perfect-scrollbar/dist/css/styles.css";
import logo from "../../../assets/GHGA_full_Logo_orange.png";

/**
 * Section on the home page where an "About us" section is displayed.
 */
const HomeBottomSection = () => {
  const PARAGRAPH_CLASS = "fs-5 text-md-justify";
  const LINK_CLASS = "text-secondary";
  return (
    <Col className="px-2">
      <h4 className="fw-bold fs-3 p-3 px-4 mx-2 pb-1">About GHGA</h4>
      <hr className="mx-lg-3 border-tertiary opacity-100" />
      <h5 className="fs-4 px-4 mx-2 mb-0">
        GHGA &ndash; The German Human Genome-Phenome Archive
      </h5>
      <Row className="p-2 p-lg-4 align-items-center">
        <Col md={5} lg={4} xl={3}>
          <img alt="GHGA Logo" src={logo} className="w-100" />
        </Col>
        <Col>
          <p className={PARAGRAPH_CLASS}>
            <a className={LINK_CLASS} href="https://www.ghga.de/">
              GHGA
            </a>{" "}
            is a national infrastructure to enable the FAIR and secure sharing
            of genetic and other human omics data. It is embedded into European
            activities such as the federated European Genome-Phenome Archive (
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
            </a>{" "}
            (NFDI 1/1)) as part of the National Research Data Infrastructure
            initiative (
            <a className={LINK_CLASS} href="https://www.nfdi.de/">
              NFDI
            </a>
            ) and by the contributing institutions.
          </p>
          <p className={PARAGRAPH_CLASS}>
            Further Information can be found at{" "}
            <a className={LINK_CLASS} href="https://www.ghga.de">
              www.ghga.de
            </a>
            .
          </p>
        </Col>
      </Row>
    </Col>
  );
};

export default HomeBottomSection;
