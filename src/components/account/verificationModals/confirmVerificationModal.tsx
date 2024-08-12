import { Button, Form, Modal } from "react-bootstrap";
import { IVA, IVAState } from "../../../models/ivas";
import { useState } from "react";
import { AUTH_URL, fetchJson } from "../../../utils/utils";
import { useMessages } from "../../messages/usage";

interface ConfirmVerificationModalProps {
  show: boolean;
  setShow: any;
  toConfirmIVA: IVA | null;
  setToConfirmIVA: any;
}

const ConfirmVerificationModal = (props: ConfirmVerificationModalProps) => {
  const [disabledButton, setDisabledButton] = useState(true);
  const [inputtedCode, setInputtedCode] = useState("");
  const { showMessage } = useMessages();

  const HandleSubmit = async (verificationCode: string) => {
    setDisabledButton(true);
    let url = AUTH_URL;
    url = new URL(`rpc/ivas/${props.toConfirmIVA!.id}/validate-code`, url);
    let method: string = "POST",
      ok: number = 204,
      userData = { verification_code: verificationCode };
    const response = await fetchJson(url, method, userData).catch(() => null);
    if (response && response.status === ok) {
      props.toConfirmIVA!.state = IVAState.Verified;
      props.setShow(false);
      props.setToConfirmIVA(null);
      showMessage({
        type: "success",
        title: "Contact address verified successfully",
      });
    } else if (response && response.status === 429) {
      props.toConfirmIVA!.state = IVAState.Unverified;
      showMessage({
        type: "error",
        title:
          "Too many attempts at entering code. Contact address has been reverted to unverified",
      });
    } else {
      showMessage({
        type: "error",
        title: "Code could not be verified. Please try again later",
      });
      setTimeout(() => setDisabledButton(false), 2000);
    }
  };

  return (
    <>
      {props.toConfirmIVA ? (
        <Modal
          show={props.show}
          onHide={() => {
            props.setShow(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Contact Address Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                HandleSubmit(inputtedCode);
              }}
            >
              <p>
                We sent a verification code to your selected contact address.
                Please enter it here:
              </p>
              <input
                type="text"
                name="verificationCode"
                id="verificationCode"
                className="fs-2 text-center"
                style={{
                  letterSpacing: "0.5em",
                  paddingLeft: "0.5em",
                  width: "8em",
                }}
                required
                autoComplete="one-time-code"
                minLength={6}
                maxLength={6}
                pattern="[A-Z0-9]{6}"
                size={6}
                onKeyDown={(e) => {
                  if (
                    e.key.match("^[^a-zA-Z0-9]{1}$") &&
                    e.ctrlKey === false &&
                    e.altKey === false
                  ) {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  e.target.value = e.target.value.toUpperCase();
                  setInputtedCode(e.target.value.toUpperCase());
                  if (e.target.value.length === 6) setDisabledButton(false);
                  else setDisabledButton(true);
                }}
              />
              <div className="mt-3 d-flex justify-content-between">
                <Button
                  variant="quinary"
                  type="submit"
                  disabled={disabledButton}
                >
                  Confirm
                </Button>
                <Button
                  className="text-white"
                  variant="dark-3"
                  onClick={() => {
                    props.setShow(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
};

export default ConfirmVerificationModal;
