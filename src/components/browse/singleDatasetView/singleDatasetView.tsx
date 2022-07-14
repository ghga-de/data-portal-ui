import {
  Accordion,
  Badge,
  Col,
  Container,
  Nav,
  Row,
  Tab,
  Table,
} from "react-bootstrap";

const SingleDatasetView = () => {
  return (
    <Container className="py-4">
      <h5>
        <strong>
          ZZZ Coverage bias sensitivity of variant calling_ for 4 WG_seg_tech
        </strong>
      </h5>
      <p>Dataset ID | ZZZ EGAD00001000174</p>
      <p className="fs-7">
        <span className="me-3">
          Study Type | <Badge className="py-1 px-2 fw-normal">ZZZ Badge</Badge>{" "}
        </span>
        <span>
          Centre name: <strong>ZZZ Centre</strong>
        </span>
      </p>
      <Row className="fs-7">
        <Col>
          <strong>Description</strong>
        </Col>
        <Col className="text-end">
          <Badge className="py-1 px-2 fw-normal">Status: ZZZ Status</Badge>
        </Col>
      </Row>
      <Row className="fs-8 my-2 border border-1 border-dark border-end-0 border-start-0 pt-2 pb-3">
        <Col>
          ZZZ SET Coverage bias sensitivity of variant calling for 4 WG seq tech
          DATA SET Coverage bias sensitivity of variant calling for 4 WG seq
          tech DATA SET Coverage bias sensitivity of variant calling for 4 WG
          seq tech DATA SET Coverage
        </Col>
      </Row>
      <Row className="fs-8 mb-4">
        <Col className="text-end">ZZZ Accession Date</Col>
      </Row>
      <Container className="mb-5">
        <Tab.Container defaultActiveKey="tabs0">
          <Nav variant="pills" className="justify-content-center mb-2">
            <Nav.Item>
              <Nav.Link
                eventKey="tabs0"
                className="border border-1 mx-2 border-light"
              >
                Study
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="tabs1"
                className="border border-1 mx-2 border-light"
              >
                Project
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="tabs2"
                className="border border-1 mx-2 border-light"
              >
                Publication
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="tabs3"
                className="border border-1 mx-2 border-light"
              >
                DAC
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Container className="mb-5 border border-1 rounded p-3">
            <Tab.Content className="mb-4">
              <Tab.Pane eventKey="tabs0">
                <h5>
                  <strong>Study</strong>
                </h5>
                <p>
                  <strong>Title: </strong>ZZZ Title
                </p>
                <p>
                  <strong>Type: </strong>ZZZ Type
                </p>
                <p className="fs-7">
                  <strong>Affiliation: </strong>ZZZ Affiliation
                </p>
                <p className="fs-7">
                  <strong>Description: </strong>ZZZ Massively parallel
                  sequencing has revolutionized research in cancer genetics and
                  genomics and enhanced our understanding of natural human
                  genetic variation. Recently, Lam et al. have performed a
                  detailed comparison of two next-generation sequencing
                  technologies with respect to their sensitivity to call single
                  nucleotide variants (SNV) and indels. Here, we sequenced two
                  tumor/normal pairs obtained from two paedriatic
                  medulloblastoma patients with Life Technologies’ SOLiD 4 and
                  5500xl SOLiD, Illumina’s HiSeq2000, and Complete Genomics’
                  technology. We then compared their ability to call SNVs with
                  high confidence. As gold standard for SNV calling, we used
                  genotypes determined by an Affymetrix SNP array. Additionally,
                  we performed a detailed analysis of how evenly each technology
                  covers the genome and how the reads are distributed across
                  functional genomic regions. Finally, we studied how a
                  combination of data from different technologies might help to
                  overcome the limitations in SNV calling by any of the four
                  technologies alone.
                </p>
              </Tab.Pane>
              <Tab.Pane eventKey="tabs1">
                <h5>
                  <strong>Project</strong>
                </h5>
                <p>
                  <strong>Project ID: </strong>ZZZ Project ID
                </p>
                <p>
                  <strong>Title: </strong>ZZZ Title
                </p>
                <p>
                  <strong>Type: </strong>ZZZ Type
                </p>
                <div>
                  <strong>Attributes:</strong>
                  <Container className="ms-5 w-50">
                    <Row>
                      <Col>
                        <strong>Centre name: </strong>ZZZ Centre
                      </Col>
                      <Col>
                        <strong>Release date: </strong>ZZZ DateTime
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>Published: </strong>ZZZ Bool
                      </Col>
                      <Col>
                        <strong>Centre name: </strong>ZZZ Centre
                      </Col>
                    </Row>
                  </Container>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="tabs2">
                <h5>
                  <strong>Publication</strong>
                </h5>
                <p>
                  <strong>ID: </strong>ZZZ ID
                </p>
                <p>
                  <strong>Title: </strong>ZZZ Title
                </p>
                <p className="fs-7">
                  <strong>Abstract: </strong>ZZZ Abstract
                </p>
              </Tab.Pane>
              <Tab.Pane eventKey="tabs3">
                <h5>
                  <strong>Policy and Data Access Committee</strong>
                </h5>
                <p>
                  <strong>Policy: </strong>ZZZ Policy
                </p>
                <p>
                  <strong>Data Access Committee: </strong>ZZZ Data Access
                  Committee
                </p>
                <p>
                  <strong>Name: </strong>ZZZ Name
                </p>
                <p>
                  <strong>e-Mail: </strong>ZZZ e-Mail
                </p>
              </Tab.Pane>
            </Tab.Content>
          </Container>
        </Tab.Container>
      </Container>

      <Accordion>
        <Accordion.Item className="mb-4" eventKey="0">
          <Accordion.Button className="bg-secondary py-2 text-white rounded-0">
            Experiment Summary
          </Accordion.Button>
          <Accordion.Body className="pt-4">
            <Table bordered hover className="fs-8" size="sm">
              <thead>
                <tr>
                  <th className="fs-7 w-25">Experiment</th>
                  <th className="w-25">Experiment ID</th>
                  <th>Alias</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    ZZZ Name
                    <br />
                    <span className="fs-9 text-muted">ZZZ Description</span>
                  </td>
                  <td>ZZZ ID</td>
                  <td>ZZZ Alias</td>
                </tr>
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item className="mb-4" eventKey="1">
          <Accordion.Button className="bg-secondary py-2 text-white rounded-0">
            Sample Summary
          </Accordion.Button>
          <Accordion.Body className="pt-4">
            <Table bordered hover className="fs-8" size="sm">
              <thead>
                <tr>
                  <th className="fs-7 w-25">Sample</th>
                  <th className="w-25">Sample ID</th>
                  <th>Alias</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    ZZZ Name
                    <br />
                    <span className="fs-9 text-muted">ZZZ Description</span>
                  </td>
                  <td>ZZZ ID</td>
                  <td>ZZZ Alias</td>
                </tr>
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item className="mb-4" eventKey="2">
          <Accordion.Button className="bg-secondary py-2 text-white rounded-0">
            File Summary (ZZZ files, ZZZ BAM, ZZZ TB)
          </Accordion.Button>
          <Accordion.Body className="pt-4">
            <Table bordered hover className="fs-8" size="sm">
              <thead>
                <tr>
                  <th className="fs-7 w-25">File</th>
                  <th className="w-25">File ID</th>
                  <th>Alias</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    ZZZ Name
                    <br />
                    <span className="fs-9 text-muted">ZZZ Description</span>
                  </td>
                  <td>ZZZ ID</td>
                  <td>ZZZ Alias</td>
                </tr>
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default SingleDatasetView;
