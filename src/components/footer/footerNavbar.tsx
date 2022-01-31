import { Container, Dropdown, Col, Row } from 'react-bootstrap';

const FooterNavbar = () => {
  return (
    <Container className="mt-5 border-top mw-100 mx-0">
      <Dropdown.Menu show className="ms-auto border-0">
        <Row>
          <Col>
            <Dropdown.Header>About us</Dropdown.Header>
            <Dropdown.Item href="#action/3.1">MISSION</Dropdown.Item>
            <Dropdown.Item href="#action/3.2">WORKSTREAMS</Dropdown.Item>
            <Dropdown.Item href="#action/3.3">TEAM</Dropdown.Item>
            <Dropdown.Item href="#action/3.4">INSITUTIONS</Dropdown.Item>
            <Dropdown.Item href="#action/3.4">PARTENRS</Dropdown.Item>
            <Dropdown.Item href="#action/3.4">JOBS</Dropdown.Item>
            <Dropdown.Item href="#action/3.4">CONTACT</Dropdown.Item>
          </Col>
          <Col>
            <Dropdown.Header>Community</Dropdown.Header>
            <Dropdown.Item href="#action/3.1">CANCER</Dropdown.Item>
            <Dropdown.Item href="#action/3.2">RARE DISEASE</Dropdown.Item>
          </Col>
          <Col>
            <Dropdown.Header>News & Events</Dropdown.Header>
            <Dropdown.Item href="#action/3.1">NEWS</Dropdown.Item>
            <Dropdown.Item href="#action/3.2">EVENTS</Dropdown.Item>
          </Col>
          <Col>
            <Dropdown.Header>Resources</Dropdown.Header>
            <Dropdown.Item href="#action/3.1">GHGA WEBSITE</Dropdown.Item>
            <Dropdown.Item href="#action/3.2">PUBLICATIONS</Dropdown.Item>
            <Dropdown.Item href="#action/3.3">BIOINFORMATICS</Dropdown.Item>
          </Col>
        </Row>
      </Dropdown.Menu>
    </Container>
  )
}

export default FooterNavbar;
