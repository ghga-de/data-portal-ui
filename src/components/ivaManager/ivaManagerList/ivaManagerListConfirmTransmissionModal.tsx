import { Button, Modal } from "react-bootstrap";
import { UserWithIVA, IVAStatus, IVATypePrintable } from "../../../models/ivas";
import { useState } from "react";
import { AUTH_URL, fetchJson } from "../../../utils/utils";
import { showMessage } from "../../messages/usage";

interface IvaManagerListConfirmTransmissionModalProps {
  show: boolean;
  setShow: any;
  setShowCreateCodeModal: any;
  selectedIVA: UserWithIVA | undefined;
  setSelectedIVA: any;
  onUpdate: any;
}

const IvaManagerListConfirmTransmissionModal = (
  props: IvaManagerListConfirmTransmissionModalProps
) => {
  const [disabledButtons, setDisabledButtons] = useState(false);

  async function handleTransmitted() {
    if (props.selectedIVA !== undefined) {
      setDisabledButtons(true);
      let url = new URL(AUTH_URL);
      let method = "POST",
        ok = 204;
      url = new URL(`rpc/ivas/${props.selectedIVA.id}/code-transmitted`, url);
      try {
        const response = await fetchJson(url, method);
        if (response && response.status === ok) {
          showMessage({
            type: "success",
            title: "Transmission of code successfully confirmed!",
          });
          props.selectedIVA.status = IVAStatus.CodeTransmitted;
          props.onUpdate();
          props.setSelectedIVA(undefined);
          props.setShow(false);
          props.setShowCreateCodeModal(false);
          setDisabledButtons(false);
        } else throw new Error("POST failed: " + response.text);
      } catch (error) {
        console.error(error);
        setDisabledButtons(false);
        showMessage({
          type: "error",
          title:
            "Could not confirm transmission of code. Please try again later",
        });
      }
    }
  }
  return (
    <Modal
      show={props.show}
      onHide={() => {
        props.setShow(false);
        props.setSelectedIVA(undefined);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirm code transmission</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Please confirm the transmission of the verification code for the{" "}
          <em>
            {props.selectedIVA ? IVATypePrintable[props.selectedIVA.type] : ""}
          </em>{" "}
          IVA for user <em>{props.selectedIVA?.user_name}</em> with address{" "}
          <em>{props.selectedIVA?.value}</em>.
        </p>
        <div>
          <Button
            variant="warning"
            onClick={() => {
              handleTransmitted();
            }}
            disabled={disabledButtons}
            className="text-white"
          >
            Confirm transmission
          </Button>
          <Button
            variant="dark-3"
            className="ms-2 text-white"
            onClick={() => {
              props.setShow(false);
            }}
          >
            Cancel
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default IvaManagerListConfirmTransmissionModal;
