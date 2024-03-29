import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { STATIC_PAGE_MAIN_DIV_CLASSES } from "../../utils/utils";

const FAQ = () => {
  return (
    <div className={STATIC_PAGE_MAIN_DIV_CLASSES}>
      <Row className="bg-tertiary m-0 mb-4 py-4 px-3">
        <Col className="col-11">
          <p className="fs-5 mb-2 text-secondary">About GHGA</p>
          <div
            className="border border-1 border-primary mb-2"
            style={{ width: "60px" }}
          ></div>
          <ul className="text-primary">
            <li>
              GHGA is a research consortium developing a national infrastructure
              to enable the FAIR sharing of genetic and other human omics data.
            </li>
            <li>
              This is embedded into European activities such as the federated
              European Genome-Phenome Archive (fEGA) and the European Genomic
              Data Infrastructure (GDI).
            </li>
            <li>
              Further Information on the GHGA Project can be found at&nbsp;
              <a
                href="https://www.ghga.de/"
                className="text-primary"
                target="_blank"
                rel="noreferrer"
              >
                www.ghga.de
              </a>
            </li>
          </ul>
        </Col>
      </Row>
      <Row className="m-0 ps-4">
        <Col>
          <Row className="my-4">
            <div className="mx-auto">
              <h5 className="d-flex align-items-center text-secondary fw-bold">
                <FontAwesomeIcon
                  icon={faCircleQuestion}
                  pull="left"
                  style={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "rgba(214,95,48,0.2)",
                    padding: "8px",
                  }}
                  className="me-3 fs-4 rounded"
                />
                Frequently Asked Questions (FAQ)
              </h5>
              <hr className="border-secondary mb-4" />
            </div>
          </Row>
          <Row className="mb-4 ps-4">
            <ul>
              <li className="fw-bold">
                What are the functions of the GHGA Data Portal?
              </li>
              <sub className="fs-6">
                The GHGA Data Portal allows users to browse, search, and filter
                omics datasets submitted to the GHGA. It uses the GHGA Metadata
                Model and conforms with the&nbsp;
                <a
                  href="https://ega-archive.org/submission/programmatic_submissions/submitting-metadata"
                  target="_blank"
                  rel="noreferrer"
                >
                  EGA Metadata Model
                </a>
              </sub>
              <li className="fw-bold mt-5">
                What data can be found on GHGA Data Portal?
              </li>
              <sub className="fs-6">
                Please visit the GHGA Data Portal&nbsp;
                <Link to="/browse" target="_blank" rel="noreferrer">
                  browse page
                </Link>
                &nbsp;and find your data of interest either by a keyword search
                or by using the selectors on the left side. Currently, we are
                only displaying datasets from partner institutions. If you would
                like to contribute your own data, please visit&nbsp;
                <Link to="/upload" target="_blank" rel="noreferrer">
                  Data Upload.
                </Link>
              </sub>
              <li className="fw-bold mt-5">
                What metadata can be/will be displayed about the datasets of
                interest?
              </li>
              <sub className="fs-6">
                For more information on the GHGA Metadata model, see&nbsp;
                <Link to="/metadata-model" target="_blank" rel="noreferrer">
                  metadata model
                </Link>
              </sub>
              <li className="fw-bold mt-5">
                How to request access to datasets?
              </li>
              <sub className="fs-6">
                Identify your dataset of interest using the browse and filter
                functions of the GHGA Data Portal. Navigate to the dataset of
                interest and then click on the "Request access" button. This will
                direct you to a data access request form. Complete the form with the
                necessary information and submit it to request access to the dataset.
                Please note that GHGA is not involved in the process of negotiating the
                data access.
              </sub>
              <li className="fw-bold mt-5">
                How to upload your data to the GHGA Data Portal?
              </li>
              <sub className="fs-6">
                During this initial phase of operation, GHGA is only accepting
                metadata from partner institutions. For more information, please
                visit the&nbsp;
                <Link to="/upload">Data Upload page</Link>
              </sub>
              <li className="fw-bold mt-5">How to get data access?</li>
              <sub className="fs-6">
                The GHGA Data Portal allows users to request access to data through the
                portal. We are listing non-personal metadata and acting as a gateway to
                data submitters who will serve the research data upon approval of the
                request. Visit your dataset of interest and then click on the "Request
                access" button. This will direct you to a data access request form.
                Complete the form with the necessary information and submit it to
                request access to the dataset. The data access committee will review
                your request and respond accordingly. Please note that GHGA is not
                involved in the further process of negotiating the data access.
                For more information, please visit the&nbsp;
                <Link to="/download">Data Download page</Link>
              </sub>
            </ul>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default FAQ;
