import { Container, Dropdown, Col, Row } from 'react-bootstrap';

const FooterNavbar = () => {
  return (
    <Container className="mt-5 border-top mw-100 mx-0 d-flex px-0">
      <Dropdown.Menu show className="border-0 w-100 px-0">
        <Row className="row-cols-6 mx-0">
          <Col xl={{ offset: 1 }} lg={{ offset: 1 }} md={{ offset: 1 }}>
            <Dropdown.Header className='fs-4 fw-bolder text-black'>About us</Dropdown.Header>
            <Dropdown.Item href="">Mission</Dropdown.Item>
            <Dropdown.Item href="">Workstreams</Dropdown.Item>
            <Dropdown.Item href="">Team</Dropdown.Item>
            <Dropdown.Item href="https://ghga.dkfz.de/">Institutions</Dropdown.Item>
            <Dropdown.Item href="">Partners</Dropdown.Item>
            <Dropdown.Item href="">Jobs</Dropdown.Item>
            <Dropdown.Item href="">Contact</Dropdown.Item>
          </Col>
          <Col>
            <Dropdown.Header className='fs-4 fw-bolder text-black'>Community</Dropdown.Header>
            <Dropdown.Item href="">Cancer</Dropdown.Item>
            <Dropdown.Item href="">Rare Disease</Dropdown.Item>
          </Col>
          <Col>
            <Dropdown.Header className='fs-4 fw-bolder text-black'>News & Events</Dropdown.Header>
            <Dropdown.Item href="">News</Dropdown.Item>
            <Dropdown.Item href="">Events</Dropdown.Item>
          </Col>
          <Col>
            <Dropdown.Header className='fs-4 fw-bolder text-black'>Resources</Dropdown.Header>
            <Dropdown.Item href="https://ghga.dkfz.de/">GHGA Website</Dropdown.Item>
            <Dropdown.Item href="">Publications</Dropdown.Item>
            <Dropdown.Item href="">Bioinformatics</Dropdown.Item>
          </Col>
        </Row>
      </Dropdown.Menu>
    </Container>
  )
}

export default FooterNavbar;
