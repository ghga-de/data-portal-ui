import { Card } from "react-bootstrap";

const TopSectionBadges = () => {
  return (
    <>
      <Card style={{ width: "18rem" }} className="d-inline-block mx-2">
        <Card.Body>
          <Card.Title>Technology</Card.Title>
          <Card.Text>Contents</Card.Text>
        </Card.Body>
      </Card>
      <Card style={{ width: "18rem" }} className="d-inline-block mx-2">
        <Card.Body>
          <Card.Title>Sex</Card.Title>
          <Card.Text>Contents</Card.Text>
        </Card.Body>
      </Card>
      <Card style={{ width: "18rem" }} className="d-inline-block mx-2">
        <Card.Body>
          <Card.Title>Volume</Card.Title>
          <Card.Text>Contents</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default TopSectionBadges;
