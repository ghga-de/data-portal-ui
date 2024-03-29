import { Card, Col, Row } from "react-bootstrap";
import ScrollBar from "react-perfect-scrollbar";

interface HomeMidSectionBadgeProps {
  badgeTitle: any;
  badgeBody: any;
  bodyRowClasses?: string;
  bodyColClasses?: string;
  badgeClasses?: string;
  badgeDark?: boolean;
}

/** Card component (badge) for summary statistics in the Statistics section on home page. */
const HomeMidSectionBadge = (props: HomeMidSectionBadgeProps) => {
  return (
    <Card
      style={{ borderRadius: "15px", minHeight: "240px" }}
      className={
        "d-inline-block w-100 shadow h-100 pb-3 " +
        (props.badgeDark === true
          ? "border-white bg-primary text-white "
          : "border-muted ") +
        props.badgeClasses
      }
    >
      <Card.Body>
        <Card.Title className="fw-bold">{props.badgeTitle}</Card.Title>
        <Card.Text as="div">
          <Row className={props.bodyRowClasses}>
            <Col
              className={props.bodyColClasses}
              style={{ maxHeight: "10rem" }}
            >
              <ScrollBar>{props.badgeBody}</ScrollBar>
            </Col>
          </Row>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default HomeMidSectionBadge;
