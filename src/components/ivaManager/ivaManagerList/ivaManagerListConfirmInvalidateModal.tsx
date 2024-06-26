import { Button, Modal } from "react-bootstrap";
import { UserWithIVA, IVAState, IVATypePrintable } from "../../../models/ivas";
import { useState } from "react";
import { AUTH_URL, fetchJson } from "../../../utils/utils";
import { useMessages } from "../../messages/usage";

interface IvaManagerListConfirmInvalidateModalProps {
  show: boolean;
  setShow: any;
  selectedIVA: UserWithIVA | undefined;
  setSelectedIVA: any;
  onUpdate: any;
}

const IvaManagerListConfirmInvalidateModal = (
  props: IvaManagerListConfirmInvalidateModalProps
) => {
  const [disabledButtons, setDisabledButtons] = useState(false);
  const { showMessage } = useMessages();

  async function handleInvalidate() {
    if (props.selectedIVA !== undefined) {
      setDisabledButtons(true);
      let url = new URL(AUTH_URL);
      let method = "POST",
        ok = 204;
      url = new URL(`rpc/ivas/${props.selectedIVA.id}/unverify`, url);
      try {
        const response = await fetchJson(url, method);
        if (response && response.status === ok) {
          showMessage({
            type: "success",
            title: "IVA successfully invalidated!",
          });
          props.selectedIVA.state = IVAState.Unverified;
          props.onUpdate();
          props.setSelectedIVA(undefined);
          props.setShow(false);
          setDisabledButtons(false);
        } else throw new Error("POST failed: " + response.text);
      } catch (error) {
        console.error(error);
        setDisabledButtons(false);
        showMessage({
          type: "error",
          title: "Could not invalidate IVA.",
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
        <Modal.Title>Confirm invalidation of IVA</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Do you really wish to invalidate the{" "}
          <em>
            {props.selectedIVA ? IVATypePrintable[props.selectedIVA.type] : ""}
          </em>{" "}
          IVA for user <em>{props.selectedIVA?.user_name}</em> with address{" "}
          <em>{props.selectedIVA?.value}</em>?
        </p>
        <p>This user will lose access to any dataset linked to this IVA.</p>
        <div>
          <Button
            variant="danger"
            onClick={() => {
              handleInvalidate();
            }}
            disabled={disabledButtons}
          >
            Invalidate
          </Button>
          <Button
            variant="dark-3"
            className="ms-2 text-white"
            onClick={() => {
              props.setShow(false);
              props.setSelectedIVA(undefined);
            }}
            disabled={disabledButtons}
          >
            Cancel
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default IvaManagerListConfirmInvalidateModal;
