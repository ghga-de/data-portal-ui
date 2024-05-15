import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { AUTH_URL, fetchJson } from "../../../utils/utils";
import { IVA, IVAStatus, IVAType } from "../../../models/ivas";

interface NewIVAModalProps {
  show: boolean;
  setShow: any;
  userId: string;
  newUserIVA: any;
}

const NewIVAModal = (props: NewIVAModalProps) => {
  const [promptText, setPromptText] = useState("");
  const [clickedButton, setClickedButton] = useState<IVAType | null>(null);
  const [disabledButton, setDisabledButton] = useState(true);

  const handleSubmit = async (value: string) => {
    setDisabledButton(true);
    let url = AUTH_URL;
    url = new URL(`users/${props.userId}/ivas`, url);
    let userData: { type: IVAType; value: string } = {
        type: clickedButton as unknown as IVAType,
        value: value,
      },
      method: string = "POST",
      ok: number = 201;
    const response = await fetchJson(url, method, userData).catch(() => null);
    if (response && response.status === ok) {
      try {
        const id = await response.text();
        const newIVA: IVA = {
          id: id,
          type: userData.type as unknown as IVAType,
          value: userData.value,
          changed: new Date().toISOString(),
          status: IVAStatus.Unverified,
        };
        props.newUserIVA(newIVA);
        setPromptText("");
        setClickedButton(null);
        props.setShow(false);
      } catch {}
    }
    setDisabledButton(false);
    return;
  };

  return (
    <Modal
      show={props.show}
      onHide={() => {
        props.setShow(false);
        setClickedButton(null);
        setPromptText("");
      }}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>New contact address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-4">
          <p>Please select one of the following contact address types:</p>
          <Row>
            <Col>
              <Button
                className={clickedButton === IVAType.Phone ? "w-100" : "w-100"}
                variant={
                  clickedButton === IVAType.Phone
                    ? "quinary"
                    : "outline-quinary"
                }
                onClick={() => {
                  setClickedButton(IVAType.Phone);
                  setDisabledButton(false);
                  setPromptText("number to receive SMS messages");
                }}
              >
                SMS
              </Button>
            </Col>
            <Col>
              <Button
                className={clickedButton === IVAType.Fax ? "w-100" : "w-100"}
                variant={
                  clickedButton === IVAType.Fax ? "quinary" : "outline-quinary"
                }
                onClick={() => {
                  setClickedButton(IVAType.Fax);
                  setDisabledButton(false);
                  setPromptText("fax number");
                }}
              >
                Fax
              </Button>
            </Col>
            <Col>
              <Button
                className={
                  clickedButton === IVAType.PostalAddress ? "w-100" : "w-100"
                }
                variant={
                  clickedButton === IVAType.PostalAddress
                    ? "quinary"
                    : "outline-quinary"
                }
                onClick={() => {
                  setClickedButton(IVAType.PostalAddress);
                  setDisabledButton(false);
                  setPromptText("postal address");
                }}
              >
                Letter
              </Button>
            </Col>
            <Col>
              <Button
                className={
                  clickedButton === IVAType.InPerson ? "w-100" : "w-100"
                }
                variant={
                  clickedButton === IVAType.InPerson
                    ? "quinary"
                    : "outline-quinary"
                }
                onClick={() => {
                  setClickedButton(IVAType.InPerson);
                  setDisabledButton(false);
                  setPromptText("Where can we meet you?");
                }}
              >
                In-Person
              </Button>
            </Col>
          </Row>
        </div>
        {clickedButton !== null ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const target = e.target as HTMLFormElement;
              handleSubmit(target.iva.value);
            }}
          >
            <p>
              {clickedButton === IVAType.InPerson
                ? promptText
                : `Please enter your ${promptText}:`}
            </p>
            <input
              type={
                clickedButton === IVAType.Fax || clickedButton === IVAType.Phone
                  ? "tel"
                  : "text"
              }
              id="iva"
              name="iva"
              className="mb-4 w-100"
              required={true}
            />
            <p>
              <strong>
                In order to verify your address, you will need to request
                verification from your profile page.
              </strong>
            </p>
            <div className="d-flex justify-content-between mt-4">
              <Col xs={5}>
                <Button
                  variant="quinary"
                  className="w-100 px-1"
                  type="submit"
                  disabled={disabledButton}
                >
                  <FontAwesomeIcon icon={faCheck} /> Add unverified contact
                  address
                </Button>
              </Col>

              <Col xs={2}>
                <Button
                  variant="dark-3"
                  className="text-white w-100"
                  onClick={() => {
                    props.setShow(false);
                    setClickedButton(null);
                    setPromptText("");
                  }}
                >
                  <FontAwesomeIcon icon={faX} /> Cancel
                </Button>
              </Col>
            </div>
          </form>
        ) : (
          <></>
        )}
        <div className="d-flex justify-content-between mt-3"></div>
      </Modal.Body>
    </Modal>
  );
};

export default NewIVAModal;
