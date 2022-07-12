import {
  Accordion,
  Col,
  Container,
  Row,
  Tab,
  Table,
  Tabs,
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
        <span>Study Type | ZZZ Badges </span>
        <span>Centre name: ZZZ Centre</span>
      </p>
      <Row className="fs-7">
        <Col>Description</Col>
        <Col className="text-end">Status Badge</Col>
      </Row>
      <Row className="fs-8">
        <Col>
          ZZZ SET Coverage bias sensitivity of variant calling for 4 WG seq tech
          DATA SET Coverage bias sensitivity of variant calling for 4 WG seq
          tech DATA SET Coverage bias sensitivity of variant calling for 4 WG
          seq tech DATA SET Coverage
        </Col>
      </Row>
      <Row className="fs-8 mb-4">
        <Col className="text-end">Date</Col>
      </Row>
      <Container className="mb-5">
        <Tabs className="mb-4">
          <Tab eventKey="0" title="Study">
            <Container className="mb-5">
              <h6>
                <strong>Study</strong>
              </h6>
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
                <strong>Description: </strong>ZZZ Massively parallel sequencing
                has revolutionized research in cancer genetics and genomics and
                enhanced our understanding of natural human genetic variation.
                Recently, Lam et al. have performed a detailed comparison of two
                next-generation sequencing technologies with respect to their
                sensitivity to call single nucleotide variants (SNV) and indels.
                Here, we sequenced two tumor/normal pairs obtained from two
                paedriatic medulloblastoma patients with Life Technologies’
                SOLiD 4 and 5500xl SOLiD, Illumina’s HiSeq2000, and Complete
                Genomics’ technology. We then compared their ability to call
                SNVs with high confidence. As gold standard for SNV calling, we
                used genotypes determined by an Affymetrix SNP array.
                Additionally, we performed a detailed analysis of how evenly
                each technology covers the genome and how the reads are
                distributed across functional genomic regions. Finally, we
                studied how a combination of data from different technologies
                might help to overcome the limitations in SNV calling by any of
                the four technologies alone.
              </p>
            </Container>
          </Tab>
          <Tab eventKey="1" title="Project">
            <h6>
              <strong>Project</strong>
            </h6>
            <p>
              <strong>Project ID: </strong>ZZZ Project ID
            </p>
            <p>
              <strong>Title: </strong>ZZZ Title
            </p>
            <p>
              <strong>Type: </strong>ZZZ Type
            </p>
            <p>
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
            </p>
          </Tab>
          <Tab eventKey="2" title="Publication">
            <h6>
              <strong>Publication</strong>
            </h6>
            <p>
              <strong>ID: </strong>ZZZ ID
            </p>
            <p>
              <strong>Title: </strong>ZZZ Title
            </p>
            <p className="fs-7">
              <strong>Abstract: </strong>ZZZ Abstract
            </p>
          </Tab>
          <Tab eventKey="3" title="DAC">
            <h6>
              <strong>Policy and Data Access Committee</strong>
            </h6>
            <p>
              <strong>Policy: </strong>ZZZ Policy
            </p>
            <p>
              <strong>Data Access Committee: </strong>ZZZ Data Access Committee
            </p>
            <p>
              <strong>Name: </strong>ZZZ Name
            </p>
            <p>
              <strong>e-Mail: </strong>ZZZ e-Mail
            </p>
          </Tab>
        </Tabs>
      </Container>

      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Experiment Summary</Accordion.Header>
          <Accordion.Body>
            <Table bordered hover className="fs-8" size="sm">
              <thead>
                <tr>
                  <th className="fs-7">Experiment</th>
                  <th>Experiment ID</th>
                  <th>Alias</th>
                </tr>
              </thead>
              <tr>
                <td>
                  ZZZ Name
                  <br />
                  <span className="fs-9 text-muted">ZZZ Description</span>
                </td>
                <td>ZZZ ID</td>
                <td>ZZZ Alias</td>
              </tr>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Sample Summary</Accordion.Header>
          <Accordion.Body>
            <Table bordered hover className="fs-8" size="sm">
              <thead>
                <tr>
                  <th className="fs-7">Sample</th>
                  <th>Sample ID</th>
                  <th>Alias</th>
                </tr>
              </thead>
              <tr>
                <td>
                  ZZZ Name
                  <br />
                  <span className="fs-9 text-muted">ZZZ Description</span>
                </td>
                <td>ZZZ ID</td>
                <td>ZZZ Alias</td>
              </tr>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            File Summary (ZZZ files, ZZZ BAM, ZZZ TB)
          </Accordion.Header>
          <Accordion.Body>
            <Table bordered hover className="fs-8" size="sm">
              <thead>
                <tr>
                  <th className="fs-7">File</th>
                  <th>File ID</th>
                  <th>Alias</th>
                </tr>
              </thead>
              <tr>
                <td>
                  ZZZ Name
                  <br />
                  <span className="fs-9 text-muted">ZZZ Description</span>
                </td>
                <td>ZZZ ID</td>
                <td>ZZZ Alias</td>
              </tr>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default SingleDatasetView;
