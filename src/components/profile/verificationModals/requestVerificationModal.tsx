import { Button, Modal } from "react-bootstrap";

interface RequestVerificationModalProps {
  show: boolean;
  setShow: any;
}

const RequestVerificationModal = (props: RequestVerificationModalProps) => {
  return (
    <Modal show={props.show} onHide={() => props.setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Verification Requested</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          We will send a verification code to the selected address. Please allow
          some time for processing your request. When the verification code has
          been transmitted, you will also be notified via e-mail.
        </p>
        <Button className="float-end" onClick={() => props.setShow(false)}>
          Ok
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default RequestVerificationModal;
