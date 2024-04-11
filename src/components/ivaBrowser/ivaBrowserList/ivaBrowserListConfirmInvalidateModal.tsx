import { Button, Modal } from "react-bootstrap";
import { EmbeddedIVA, IVAStatus } from "../../../models/ivas";
import { useState } from "react";
import { WPS_URL, fetchJson } from "../../../utils/utils";
import { showMessage } from "../../messages/usage";

interface IVABrowserListConfirmInvalidateModalProps {
  show: boolean;
  setShow: any;
  selectedIVA: EmbeddedIVA | undefined;
  setSelectedIVA: any;
  onUpdate: any;
}

const IVABrowserListConfirmInvalidateModal = (
  props: IVABrowserListConfirmInvalidateModalProps
) => {
  const [disabledButtons, setDisabledButtons] = useState(false);

  async function handleInvalidate() {
    if (props.selectedIVA !== undefined) {
      setDisabledButtons(true);
      let url = new URL(WPS_URL);
      let method = "POST",
        ok = 204;
      url = new URL(`rpc/ivas/${props.selectedIVA.id}/unverify`, url);
      try {
        const response = await fetchJson(url, method, {});
        if (response && response.status === ok) {
          showMessage({
            type: "success",
            title: "IVA successfully invalidated!",
          });
          props.selectedIVA.status = IVAStatus.Unverified;
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
            {props.selectedIVA?.type
              .toString()
              .split(/(?=[A-Z])/)
              .join(" ")}
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
            variant="gray"
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

export default IVABrowserListConfirmInvalidateModal;
