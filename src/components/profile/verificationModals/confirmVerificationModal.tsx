import { Button, Form, Modal } from "react-bootstrap";
import { IVA, IVAStatus } from "../../../models/ivas";
import { useState } from "react";
import { AUTH_URL, fetchJson } from "../../../utils/utils";
import { showMessage } from "../../messages/usage";

interface ConfirmVerificationModalProps {
  show: boolean;
  setShow: any;
  toConfirmIVA: IVA | null;
  setToConfirmIVA: any;
}

const ConfirmVerificationModal = (props: ConfirmVerificationModalProps) => {
  const HandleSubmit = async (verificationCode: string) => {
    setDisabledButton(true);
    let url = AUTH_URL;
    url = new URL(`rpc/ivas/${props.toConfirmIVA!.id}/validate-code`, url);
    let method: string = "POST",
      ok: number = 204,
      userData = { verification_code: verificationCode };
    const response = await fetchJson(url, method, userData).catch(() => null);
    if (response && response.status === ok) {
      props.toConfirmIVA!.status = IVAStatus.Verified;
      props.setShow(false);
      props.setToConfirmIVA(null);
      showMessage({
        type: "success",
        title: "Contact address verified successfully",
      });
    } else if (response && response.status === 429) {
      props.toConfirmIVA!.status = IVAStatus.Unverified;
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

  const [disabledButton, setDisabledButton] = useState(true);
  const [inputtedCode, setInputtedCode] = useState("");

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
            <Modal.Title>Verification Address Confirmation</Modal.Title>
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
                className="fs-2 ps-4"
                style={{ letterSpacing: "0.5em", paddingLeft: "0.5em" }}
                required
                minLength={6}
                maxLength={6}
                pattern="[0-9]{6}"
                size={5}
                onKeyDown={(e) => {
                  if (
                    e.key.match("^[^0-9]{1}$") &&
                    e.ctrlKey === false &&
                    e.altKey === false
                  )
                    e.preventDefault();
                }}
                onChange={(e) => {
                  setInputtedCode(e.target.value);
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
                  variant="gray"
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
