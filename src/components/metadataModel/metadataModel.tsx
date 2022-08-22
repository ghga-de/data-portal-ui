import { faDesktop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Container, Row } from "react-bootstrap";
import divBG from "../../assets/metadataModel/div-bg-metadata-model.png";

export const MetadataModel = () => {
  return (
    <Container className="my-4">
      <h4 className="fw-bold">GHGA Metadata Model</h4>
      <div
        className="p-4 my-4"
        style={{
          backgroundImage: `url(${divBG})`,
          backgroundRepeat: "no-repeat no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="bg-white p-4">
          <p>
            The metadata catalogue for GHGA Beta provides core functionality in
            order to capture metadata for the sharing of genomics data. We make
            GHGAs metadata FAIR by utilizing established and widely used
            ontologies and vocabularies, that help data submitters to richly
            describe their research data to the community. The implementation of
            our metadata catalogue is done using the{" "}
            <a href="https://linkml.io/linkml/">
              Linked Data Modelling Language (LinkML)
            </a>{" "}
            and is openly accessible for everyone on the{" "}
            <a href="https://github.com/ghga-de">GHGA GitHub Repository</a>.
            Here, you can track every new release of the schema and access
            different artefacts, such as a JSON Schema, for the programmatic
            implementation at your site (
            <a href="https://github.com/ghga-de/ghga-metadata-schema/tree/main/artifacts">
              https://github.com/ghga-de/ghga-metadata-schema/tree/main/artifacts
            </a>
            ).
          </p>
          <p>
            Data Access bundles information to indicate the Data Use Condition
            under which data submitters can give access their data, and data
            requesters know directly whether the data can be used for their
            purpose. Dataset can be seen as the knot, that bundles all
            categories together. It references the Data Access, but also the
            corresponding Experiment and Analysis data. Experiment data can be
            divided into information about Protocols used to prepare and
            sequence a sample, but also gives additional information about the
            individual and the sample itself. Lastly, the Analysis category
            provides the possibility to further define metadata about sequence
            variation and reference alignments of the submitted raw sequencing
            files.
          </p>
          <p>
            The data can be submitted using GHGAs Submission Spreadsheet, that
            reflects the metadata catalogue and enables the GHGA Data Portal to
            display valuable information about a submitted dataset through the
            linkage of all categories. Richly described metadata will help to
            promote data submitters datasets and encourage the community to
            reuse the data (link to follow).
          </p>
          <p>
            Additionally GHGA is producing a documentation that helps to
            understand the GHGA Metadata Model with a description of the model
            itself, but also the underlying concepts and standards (link to
            follow)
          </p>
        </div>
      </div>
      <div className="p-5">
        <Row className="align-items-center">
          <Col className="col-4">
            <p className="fw-bold">
              The Core-Model captures four categories of data:
            </p>
            <ul>
              <li>Data Access</li>
              <li>Dataset</li>
              <li>Experiment</li>
              <li>Analysis</li>
            </ul>
          </Col>
          <Col className="ps-5">Pretty Chart Here</Col>
        </Row>
      </div>
      <Button variant="secondary text-white fw-bold">
        <Row className="align-items-center">
          <Col className="ms-2 me-0 pe-2">
            <FontAwesomeIcon icon={faDesktop} transform="grow-10" />
          </Col>
          <Col>
            Metadata
            <br />
            Visualisation
          </Col>
        </Row>
      </Button>
    </Container>
  );
};

export default MetadataModel;
