import {
  faCircleExclamation,
  faCopy,
  faDownload,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  Modal,
  Row,
  Col,
  Tooltip,
  OverlayTrigger,
  Button,
} from "react-bootstrap";
import CopyToClipboard from "react-copy-to-clipboard";

interface DataRequestModalProps {
  accession: string;
  copyEmail: string;
  show: boolean;
  handleClose: any;
}

const DataRequestModal = (props: DataRequestModalProps) => {
  const subject: string = "Request access for dataset " + props.accession;

  const body: string =
    `Dear DAC team,\n\n` +
    `I am interested in accesing the dataset ${props.accession} which is listed in the GHGA Metadata Catalogue. ` +
    `Further details of the nature of my project relating to the request are specified in the form attached to this email. ` +
    `Please could you reply to me as soon as you are able to discuss my proposed project.\n` +
    `Thank you.\n\n` +
    `Kind regards`;

  const requestAccess = () => {
    window.location.assign(
      `mailto:${props.copyEmail}?subject=${subject}&body=${encodeURIComponent(
        body
      )}`
    );
  };

  const renderTooltip = (message: string) => (
    <Tooltip id={message}>Copy {message} to clipboard</Tooltip>
  );

  return (
    <Modal size="lg" centered show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton className="border-0">
        <Modal.Title>
          <FontAwesomeIcon icon={faDownload} className="text-muted me-3" />
          <strong>How to request access for dataset {props.accession}</strong>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-4">
        <Row className="mb-2 p-3 bg-gray align-items-center">
          <Col
            lg={"auto"}
            md={"auto"}
            sm={"auto"}
            xl={"auto"}
            xs={"auto"}
            xxl={"auto"}
            className="p-0"
          >
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="text-danger"
              size="2x"
            />
          </Col>
          <Col>
            To request access, you will need to contact the indicated Data
            Access Committee (DAC) which is responsible for approving
            applications for this dataset. Please copy the message below and
            send it via email to <strong>{props.copyEmail}</strong>.
            <br />
            If configured, you can click on ‘Open Mail Client’ to open the
            message in your preferred email client. Please add any additional
            details if necessary. As part of this process, GHGA does not receive
            a copy of your email or any other of your personal data. GHGA has no
            role in approving or rejecting data access requests since this is
            the sole responsibility of the DAC named by the data controller.
          </Col>
        </Row>
        <Row className="align-items-center py-2">
          <Col
            lg={"auto"}
            md={"auto"}
            sm={"auto"}
            xl={"auto"}
            xs={"auto"}
            xxl={"auto"}
            className="text-center pe-0"
          >
            <FontAwesomeIcon
              icon={faCircleInfo}
              className="text-primary"
              size="2x"
            />
          </Col>
          <Col>
            <Row>
              <OverlayTrigger
                placement="top-end"
                delay={{ show: 100, hide: 400 }}
                overlay={renderTooltip("email")}
                rootClose={true}
              >
                <CopyToClipboard text={props.copyEmail}>
                  <Col
                    lg={"auto"}
                    md={"auto"}
                    sm={"auto"}
                    xl={"auto"}
                    xs={"auto"}
                    xxl={"auto"}
                    className="pe-0"
                    style={{ cursor: "pointer" }}
                  >
                    <strong>To: </strong>
                    {props.copyEmail}
                  </Col>
                </CopyToClipboard>
              </OverlayTrigger>
              <Col
                className="text-end ps-0"
                lg={"auto"}
                md={"auto"}
                sm={"auto"}
                xl={"auto"}
                xs={"auto"}
                xxl={"auto"}
              >
                <OverlayTrigger
                  placement="top-start"
                  delay={{ show: 100, hide: 400 }}
                  overlay={renderTooltip("email")}
                  rootClose={true}
                >
                  <CopyToClipboard text={props.copyEmail}>
                    <Button
                      id={"email_address"}
                      variant="outline-dark"
                      size="sm"
                      className="px-1 ms-1 py-1 border-0 my-0"
                    >
                      <FontAwesomeIcon icon={faCopy} transform="up-6" />
                    </Button>
                  </CopyToClipboard>
                </OverlayTrigger>
              </Col>
            </Row>
            <Row>
              <OverlayTrigger
                placement="top-end"
                delay={{ show: 100, hide: 400 }}
                overlay={renderTooltip("subject")}
                rootClose={true}
              >
                <CopyToClipboard text={subject}>
                  <Col
                    lg={"auto"}
                    md={"auto"}
                    sm={"auto"}
                    xl={"auto"}
                    xs={"auto"}
                    xxl={"auto"}
                    className="pe-0"
                    style={{ cursor: "pointer" }}
                  >
                    <strong>Subject: </strong>
                    {subject}
                  </Col>
                </CopyToClipboard>
              </OverlayTrigger>
              <Col
                className="text-end ps-0"
                lg={"auto"}
                md={"auto"}
                sm={"auto"}
                xl={"auto"}
                xs={"auto"}
                xxl={"auto"}
              >
                <OverlayTrigger
                  placement="top-start"
                  delay={{ show: 100, hide: 400 }}
                  overlay={renderTooltip("subject")}
                  rootClose={true}
                >
                  <CopyToClipboard text={subject}>
                    <Button
                      id={"subject"}
                      variant="outline-dark"
                      size="sm"
                      className="px-1 ms-1 py-1 border-0 my-0"
                    >
                      <FontAwesomeIcon icon={faCopy} transform="up-6" />
                    </Button>
                  </CopyToClipboard>
                </OverlayTrigger>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="border border-light border-3 rounded my-2 py-1">
          <OverlayTrigger
            placement="auto"
            delay={{ show: 100, hide: 400 }}
            overlay={renderTooltip("email body")}
            rootClose={true}
          >
            <CopyToClipboard text={body}>
              <Col style={{ cursor: "pointer" }}>
                {body.split("\n").map((string) => (
                  <>
                    {string}
                    <br />
                  </>
                ))}
              </Col>
            </CopyToClipboard>
          </OverlayTrigger>
          <Col
            className="text-end pe-2"
            lg={1}
            md={1}
            sm={1}
            xl={1}
            xs={1}
            xxl={1}
          >
            <OverlayTrigger
              placement="top-start"
              delay={{ show: 100, hide: 400 }}
              overlay={renderTooltip("email body")}
              rootClose={true}
            >
              <CopyToClipboard text={body}>
                <Button
                  id={"email body"}
                  variant="outline-dark"
                  className="px-1 ms-1 py-1 border-0 my-0"
                >
                  <FontAwesomeIcon icon={faCopy} />
                </Button>
              </CopyToClipboard>
            </OverlayTrigger>
          </Col>
        </Row>
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
        <Col className="pe-4">
          <Button className="w-100" onClick={() => requestAccess()}>
            Open Mail Client
          </Button>
        </Col>
      </Modal.Footer>
    </Modal>
  );
};

export default DataRequestModal;
