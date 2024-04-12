import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {
  FILTER_MAX_ISO,
  FILTER_MIN_ISO,
  parseDate,
} from "../../../utils/utils";
import { IVAStatus, IVAStatusPrintable } from "../../../models/ivas";

interface IvaManagerFilterProps {
  handleFilter: any;
  filterObj: {
    userFilter: string;
    fromFilter: string;
    untilFilter: string;
    statusFilter: string;
  };
}

const IvaManagerFilter = (props: IvaManagerFilterProps) => {
  const FORM_GROUP_ROW_CLASS_NAMES = "row mb-3";
  const LABEL_COL_CLASS_NAMES = "col-4 col-form-label";

  return (
    <Container className="mb-4 border rounded shadow p-2 mx-0 w-50">
      <Row>
        <Col className="fs-1" xs={"auto"}>
          <FontAwesomeIcon icon={faFilter} />
        </Col>
        <Col>
          <Form
            onSubmit={(e) => {
              props.handleFilter();
              e.preventDefault();
            }}
          >
            <Form.Group className={FORM_GROUP_ROW_CLASS_NAMES}>
              <Form.Label className={LABEL_COL_CLASS_NAMES}>User</Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  onChange={(event) => {
                    props.handleFilter(event.target.value);
                  }}
                ></Form.Control>
              </Col>
            </Form.Group>
            <Form.Group className={FORM_GROUP_ROW_CLASS_NAMES}>
              <Form.Label className={LABEL_COL_CLASS_NAMES}>
                Last changed from
              </Form.Label>
              <Col>
                <Form.Control
                  type="date"
                  min={FILTER_MIN_ISO.split("T")[0]}
                  max={new Date().toISOString().split("T")[0]}
                  onBlur={(event) => {
                    event.target.value = parseDate(event.target.value, true);
                    props.handleFilter(undefined, event.target.value);
                  }}
                  onChange={(event) => {
                    event.target.value = parseDate(event.target.value);
                    props.handleFilter(undefined, event.target.value);
                  }}
                ></Form.Control>
              </Col>
            </Form.Group>
            <Form.Group className={FORM_GROUP_ROW_CLASS_NAMES}>
              <Form.Label className={LABEL_COL_CLASS_NAMES}>
                Last changed until
              </Form.Label>
              <Col>
                <Form.Control
                  type="date"
                  min={FILTER_MIN_ISO.split("T")[0]}
                  max={FILTER_MAX_ISO.split("T")[0]}
                  onBlur={(event) => {
                    event.target.value = parseDate(event.target.value, true);
                    props.handleFilter(
                      undefined,
                      undefined,
                      event.target.value
                    );
                  }}
                  onChange={(event) => {
                    event.target.value = parseDate(event.target.value);
                    props.handleFilter(
                      undefined,
                      undefined,
                      event.target.value
                    );
                  }}
                ></Form.Control>
              </Col>
            </Form.Group>
            <Form.Group className={FORM_GROUP_ROW_CLASS_NAMES}>
              <Form.Label className={LABEL_COL_CLASS_NAMES}>Status</Form.Label>
              <Col>
                <Form.Select
                  onChange={(event) => {
                    props.handleFilter(
                      undefined,
                      undefined,
                      undefined,
                      event.target.value
                    );
                  }}
                  defaultValue={""}
                >
                  <option value="">No filter</option>
                  {Object.values(IVAStatus)
                    .filter((x) => isNaN(Number(x)))
                    .map((x) => (
                      <option value={x} key={x}>
                        {IVAStatusPrintable[x]}
                      </option>
                    ))}
                </Form.Select>
              </Col>
            </Form.Group>
            <Button type="submit" className="d-none">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default IvaManagerFilter;