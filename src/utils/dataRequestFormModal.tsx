import {
  faDownload,
  faExclamationCircle,
  faFileSignature,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Row, Col, Button, Form } from "react-bootstrap";
import { showMessage } from "../components/messages/usage";
import { fetchJson } from "./utils";
import { useAuth } from "../services/auth";
import { FormEvent, useState } from "react";
import { urlWithEndSlash } from "../api/browse";
interface DataRequestFormModalProps {
  accession: string;
  copyEmail: string;
  show: boolean;
  handleClose: any;
  dacFormLink: string | null;
}

/** Modal that guides the user on how to access the dataset of interest. */
const DataRequestFormModal = (props: DataRequestFormModalProps) => {
  const cleanEmail = (email: string) => {
    let clean_email: string = email;
    clean_email = clean_email.replace("[at]", "@");
    clean_email = clean_email.replace("[dot]", ".");
    clean_email = clean_email.replace(";", "");
    return clean_email;
  };

  const CLIENT_URL = new URL(urlWithEndSlash(process.env.REACT_APP_CLIENT_URL!))
  const ARS_URL = new URL(urlWithEndSlash(process.env.REACT_APP_ARS_URL!), CLIENT_URL);
  const { user } = useAuth();

  const MILLISECONDS_TO_ADD: number =
    parseInt(
      process.env.REACT_APP_DEFAULT_DATA_ACCESS_DURATION_DAYS
        ? process.env.REACT_APP_DEFAULT_DATA_ACCESS_DURATION_DAYS
        : "365"
    ) *
    24 *
    60 *
    60 *
    1000;

  interface FormData {
    details: { value: string; disabled: string };
    from: { value: string };
    until: { value: string };
    email: { value: string; disabled: string };
    cancelButton: { innerHTML: string };
    submitButton: { innerHTML: string; disabled: string };
  }

  async function handleDataAccessRequestSubmission(
    e: FormEvent<HTMLFormElement>
  ) {
    const { details, from, until, email, cancelButton, submitButton } =
      e.target as typeof e.target & FormData;

    const url = new URL('access-requests', ARS_URL);
    submitButton.disabled = "true";
    try {
      const response = await fetchJson(url, "POST", {
        user_id: user?.id,
        dataset_id: props.accession,
        email: email.value,
        request_text: details.value,
        access_starts: from.value + "T00:00:00.000Z",
        access_ends: until.value + "T23:59:59.999Z",
      });
      if (response.ok) {
        showMessage({
          type: "success",
          title: "Access successfully requested!",
        });
        email.disabled = "true";
        details.disabled = "true";
        cancelButton.innerHTML = "Close";
        submitButton.innerHTML = "Request sent!";
      } else throw new Error("PUSH failed: " + response.text);
    } catch (error) {
      console.log(error);
      submitButton.disabled = "false";
      showMessage({
        type: "error",
        title: "Could not submit form. Please try again later.",
      });
    }
  }

  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [formEvent, setFormEvent] = useState<FormEvent<HTMLFormElement>>(
    {} as any as FormEvent<HTMLFormElement>
  );

  const ConfirmationModal = () => {
    if (formEvent.target === undefined) return <></>;
    const { details, from, until, email } =
      formEvent.target as typeof formEvent.target & FormData;
    return (
      <Modal
        show={showConfirmation && props.show}
        onHide={() => setShowConfirmation(false)}
        centered
      >
        <Modal.Header>
          <Modal.Title>
            Requesting access to dataset {props.accession}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className="mb-4 pb-2">Confirm your data access request:</h5>
          <p>
            <strong>Requester:</strong> {user?.fullName}
          </p>
          <p>
            <strong>Contact e-mail:</strong> {email.value}
          </p>
          <p>
            <strong>Dataset:</strong> {props.accession}
          </p>
          <p>
            <strong>From:</strong> {from.value}
          </p>
          <p>
            <strong>Until:</strong> {until.value}
          </p>
          <p className="mb-0">
            <strong>Request details:</strong>
          </p>
          <p className="mb-3">{details.value}</p>
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button
            variant="outline-dark"
            onClick={() => {
              setShowConfirmation(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className="text-white"
            onClick={() => {
              handleDataAccessRequestSubmission(formEvent);
              setShowConfirmation(false);
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  if (!user) {
    return (
      <Modal
        size="lg"
        centered
        show={props.show}
        onHide={props.handleClose}
        key={props.accession + "_modal"}
      >
        <Modal.Header closeButton className="border-0">
          <Modal.Title>
            <FontAwesomeIcon icon={faDownload} className="text-muted me-3" />
            <strong>Request access for dataset {props.accession}</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4 fs-5">
          <FontAwesomeIcon
            icon={faExclamationCircle}
            className="text-secondary mx-3"
            transform={"grow-10"}
          />
          Please log in to request access to datasets
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Col className="px-4">
            <Button
              variant="outline-dark"
              onClick={props.handleClose}
              className="w-100"
            >
              Cancel
            </Button>
          </Col>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <>
      <Modal
        size="lg"
        centered
        show={props.show}
        onHide={props.handleClose}
        key={props.accession + "_modal"}
      >
        <Modal.Header closeButton className="border-0">
          <Modal.Title>
            <FontAwesomeIcon icon={faDownload} className="text-muted me-3" />
            <strong>Request access for dataset {props.accession}</strong>
          </Modal.Title>
        </Modal.Header>

        {user ? (
          <>
            <Modal.Body className="px-4">
              {props.dacFormLink !== null ? (
                <Row className="p-3 bg-light align-items-center rounded">
                  <Col xs={"auto"} className="p-0">
                    <FontAwesomeIcon
                      icon={faFileSignature}
                      className="text-muted"
                      size="2x"
                    />
                  </Col>
                  <Col>
                    This DAC uses the following form to collect request
                    information. Please download, fill and attach it to an email
                    to
                    {`mailto:${cleanEmail(
                      props.copyEmail
                    )}?subject=DAC Form for dataset ${props.accession}}`}
                    <br />
                    <a href={props.dacFormLink}>DAC Form Link</a>
                  </Col>
                </Row>
              ) : (
                ""
              )}
              <Form
                id="request_access_form"
                onSubmit={(e: FormEvent<HTMLFormElement>) => {
                  setFormEvent(e);
                  setShowConfirmation(true);
                  e.preventDefault();
                }}
              >
                <Form.Group>
                  <Form.Label>Details about your request:</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="details"
                    rows={6}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="row my-3">
                  <Col xs={"auto"}>
                    <Form.Label className="col-form-label">
                      Access requested from
                    </Form.Label>
                  </Col>
                  <Col xs={3} className="px-0">
                    <Form.Control
                      type="date"
                      name="from"
                      disabled readOnly
                      defaultValue={new Date().toISOString().split("T")[0]}
                    ></Form.Control>
                  </Col>
                  <Col xs={"auto"}>
                    <Form.Label className="col-form-label">until</Form.Label>
                  </Col>
                  <Col xs={3} className="px-0">
                    <Form.Control
                      type="date"
                      name="until"
                      disabled readOnly
                      defaultValue={
                        new Date(new Date().getTime() + MILLISECONDS_TO_ADD)
                          .toISOString()
                          .split("T")[0]
                      }
                    ></Form.Control>
                  </Col>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    My contact e-mail address for this request is:
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    defaultValue={user.email}
                    required
                  ></Form.Control>
                </Form.Group>
              </Form>
            </Modal.Body>

            <Modal.Footer className="border-0">
              <Col className="px-4">
                <Button
                  variant="outline-dark"
                  name="cancelButton"
                  form="request_access_form"
                  onClick={props.handleClose}
                  className="w-100"
                >
                  Cancel
                </Button>
              </Col>
              <Col className="pe-4">
                <Button
                  type="submit"
                  name="submitButton"
                  form="request_access_form"
                  className="w-100 text-white"
                >
                  Send request
                </Button>
              </Col>
            </Modal.Footer>
          </>
        ) : (
          <>
            <Modal.Body className="px-4 fs-5">
              <FontAwesomeIcon
                icon={faExclamationCircle}
                className="text-secondary mx-3"
                transform={"grow-10"}
              />
              Please log in to request access to datasets
            </Modal.Body>
            <Modal.Footer className="border-0">
              <Col className="px-4">
                <Button
                  variant="outline-dark"
                  onClick={props.handleClose}
                  className="w-100"
                >
                  Close
                </Button>
              </Col>
            </Modal.Footer>
          </>
        )}
      </Modal>
      <ConfirmationModal />
    </>
  );
};

export default DataRequestFormModal;
