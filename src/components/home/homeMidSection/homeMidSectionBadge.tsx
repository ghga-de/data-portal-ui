// Copyright 2021 - 2024 Universität Tübingen, DKFZ and EMBL
// for the German Human Genome-Phenome Archive (GHGA)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
