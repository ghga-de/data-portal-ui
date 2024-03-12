import { Modal } from "react-bootstrap";

interface ConfirmVerificationModalProps {
  show: boolean;
  setShow: any;
}

const ConfirmVerificationModal = (props: ConfirmVerificationModalProps) => {
  return (
    <Modal
      show={props.show}
      onHide={() => {
        props.setShow(false);
      }}
    >
      <Modal.Header>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
    </Modal>
  );
};

export default ConfirmVerificationModal;
