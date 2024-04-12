import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Container,
  Row,
  Col,
  Modal,
  Card,
} from "react-bootstrap";
import { useNavigate, NavLink } from "react-router-dom";
import { AUTH_URL, WPS_URL, fetchJson } from "../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useMessages } from "../messages/usage";
import { useAuth } from "../../services/auth";
import { getIVAs } from "../../services/ivas";
import {
  IVA,
  IVAStatus,
  IVAStatusPrintable,
  IVATypePrintable,
} from "../../models/ivas";
import NewIVAModal from "./newIVAsModal/newIVAModal";
import ConfirmVerificationModal from "./verificationModals/confirmVerificationModal";
import RequestVerificationModal from "./verificationModals/requestVerificationModal";

/** Display user profile */

const Profile = () => {
  const navigate = useNavigate();

  const [numDatasets, setNumDatasets] = useState<number>(0);
  const { showMessage } = useMessages();
  const { user, logoutUser } = useAuth();

  const [userIVAs, setUserIVAs] = useState<IVA[]>([]);

  const [toDeleteIVA, setToDeleteIVA] = useState<IVA | null>(null);
  const [toConfirmIVA, setToConfirmIVA] = useState<IVA | null>(null);

  const [showNewIVAModal, setShowNewIVAModal] = useState(false);
  const [showDeletionConfirmationModal, setShowDeletionConfirmationModal] =
    useState<boolean>(false);
  const [showRequestVerificationModal, setShowRequestVerificationModal] =
    useState(false);
  const [showConfirmVerificationModal, setShowConfirmVerificationModal] =
    useState(false);

  const DeletionConfirmationModal = () => {
    return (
      <Modal
        show={showDeletionConfirmationModal}
        onHide={() => {
          setShowDeletionConfirmationModal(false);
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm deletion of contact address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Confirm deleting the contact address of type{" "}
            <em>
              {toDeleteIVA ? IVATypePrintable[toDeleteIVA.type] + " " : ""}
            </em>
            and value <em>{toDeleteIVA?.value}.</em>
          </p>
          {toDeleteIVA && toDeleteIVA.status === IVAStatus.Verified ? (
            <p>
              Deleting a verified address will mean losing access to any
              datasets linked to it. Are you sure you want to continue?
            </p>
          ) : (
            ""
          )}
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button
            variant={"quinary"}
            className="text-white"
            onClick={() => {
              deleteUserIVA();
            }}
          >
            Confirm
          </Button>
          <Button
            variant="dark-3"
            onClick={() => {
              setShowDeletionConfirmationModal(false);
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const newUserIVA = (newIVA: IVA) => {
    setUserIVAs([...userIVAs, newIVA]);
  };

  const deleteUserIVA = async () => {
    let url = AUTH_URL;
    url = new URL(`users/${user?.ext_id}/ivas/${toDeleteIVA!.id}`, url);
    let method: string = "DELETE",
      ok: number = 204;
    const response = await fetchJson(url, method).catch(() => null);
    if (response && response.status === ok) {
      showMessage({
        type: "success",
        title: "Contact address deleted successfully!",
      });
      setUserIVAs(userIVAs.filter((x) => x.id !== toDeleteIVA!.id));
      setToDeleteIVA(null);
      setShowDeletionConfirmationModal(false);
    } else {
      setToDeleteIVA(null);
      setShowDeletionConfirmationModal(false);
      showMessage({
        type: "error",
        title: "Contact address could not be deleted",
      });
    }
    return;
  };

  const HandleRequestVerification = async (idIVA: string) => {
    setShowNewIVAModal(false);
    setShowRequestVerificationModal(false);
    setShowDeletionConfirmationModal(false);
    setShowConfirmVerificationModal(false);
    let url = AUTH_URL;
    url = new URL(`rpc/ivas/${idIVA}/request-code`, url);
    let method: string = "POST",
      ok: number = 204;
    const response = await fetchJson(url, method).catch(() => null);
    if (response && response.status === ok) {
      setShowRequestVerificationModal(true);
      userIVAs.find((x) => idIVA === x.id)!.status = IVAStatus.CodeRequested;
    } else {
      showMessage({
        type: "error",
        title:
          "Could not request verification of your contact address. Please try again later.",
      });
    }
  };

  const HandleConfirmVerification = (idIVA: string) => {
    setShowNewIVAModal(false);
    setShowDeletionConfirmationModal(false);
    setShowRequestVerificationModal(false);
    setShowConfirmVerificationModal(true);
    try {
      setToConfirmIVA(userIVAs.find((x) => x.id === idIVA)!);
    } catch {
      showMessage({ type: "error", title: "Contact address not found!" });
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (user && user.id) {
        const url = new URL(`users/${user.id}/datasets`, WPS_URL);
        try {
          const response = await fetchJson(url);
          const datasets = await response.json();
          setNumDatasets(datasets.length);

          getIVAs(user.ext_id, setUserIVAs);
        } catch (error) {
          showMessage({
            type: "error",
            title: "Cannot retrieve your datasets.",
          });
          console.error(error);
        }
      }
    }
    fetchData();
  }, [showMessage, user]);

  const back = () => {
    const lastUrl = sessionStorage.getItem("lastUrl");
    setTimeout(() =>
      lastUrl ? (window.location.href = lastUrl) : navigate("/")
    );
  };

  let content;
  if (user === undefined) content = "Loading user data...";
  else if (user === null) {
    content = "Not logged in!";
    back();
  } else
    content = (
      <div>
        <h3 style={{ margin: "1em 0" }}>
          Welcome, {user.title + " "}
          {user.name}!
        </h3>
        <div style={{ margin: "1em 0" }}>
          <Alert variant={user?.timeout ? "success" : "danger"}>
            {user.timeout
              ? "Your user session is active."
              : "Your session has expired!"}
          </Alert>
        </div>
        <Card className="mb-3">
          <Card.Header>E-Mail address</Card.Header>
          <Card.Body>
            <div>
              <p>
                We will communicate with you via this email address: &nbsp;
                <strong>{user.email}</strong>
              </p>
              <p className="mb-0">
                You can change this email address in your &nbsp;
                <a
                  href="https://profile.aai.lifescience-ri.eu/profile"
                  target="_blank"
                  rel="noreferrer"
                >
                  LS Login profile
                </a>
                .
              </p>
            </div>
          </Card.Body>
        </Card>
        <Card className="mb-3">
          <Card.Header>Contact addresses for account verification</Card.Header>
          <Card.Body>
            <div className="mb-3">
              {userIVAs.length > 0 ? (
                userIVAs.map((x, index) => {
                  return (
                    <Row key={x.id + index} className="mb-1">
                      <Col xs={3}>
                        {IVATypePrintable[x.type]}: {x.value}
                      </Col>
                      <Col
                        xs={2}
                        className={
                          x.status === IVAStatus.Verified
                            ? "text-success fw-bold"
                            : ""
                        }
                      >
                        {x.status === IVAStatus.Unverified ? (
                          <Button
                            id={"del_" + x.id}
                            variant="secondary"
                            className="p-0 px-1 text-white"
                            onClick={(e) => {
                              let button = e.target as HTMLButtonElement;
                              HandleRequestVerification(button.id.substring(4));
                            }}
                          >
                            Request verification
                          </Button>
                        ) : x.status === IVAStatus.CodeTransmitted ? (
                          <Button
                            id={"con_" + x.id}
                            variant="secondary"
                            className="p-0 px-1 text-white"
                            onClick={(e) => {
                              let button = e.target as HTMLButtonElement;
                              HandleConfirmVerification(button.id.substring(4));
                            }}
                          >
                            Enter verification code
                          </Button>
                        ) : (
                          IVAStatusPrintable[x.status]
                        )}
                      </Col>
                      <Col xs={1}>
                        <Button
                          variant="link"
                          className="border-0 h-100 text-secondary p-0 d-flex align-items-center"
                          onClick={() => {
                            setToDeleteIVA(x);
                            setShowDeletionConfirmationModal(true);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faCircleXmark}
                            className="fa-lg"
                          />
                        </Button>
                      </Col>
                    </Row>
                  );
                })
              ) : (
                <p className="mb-3">
                  You have not yet created any contact addresses. This is needed
                  if you wish to download research data.
                </p>
              )}
            </div>
            <Button
              variant="primary"
              className="text-white"
              onClick={() => setShowNewIVAModal(true)}
            >
              <FontAwesomeIcon icon={faPlus} /> New contact address
            </Button>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>Dataset access</Card.Header>
          <Card.Body>
            <div>
              {numDatasets ? (
                <NavLink to="/work-package">
                  You have access to
                  {numDatasets === 1
                    ? " one dataset"
                    : ` ${numDatasets} datasets`}
                  .
                </NavLink>
              ) : (
                <span>You do not yet have access to any datasets.</span>
              )}
            </div>
          </Card.Body>
        </Card>
        <div className="text-end mt-3">
          <Button
            variant="secondary"
            className="text-white"
            onClick={logoutUser}
          >
            Logout
          </Button>
        </div>
        <NewIVAModal
          show={showNewIVAModal}
          setShow={setShowNewIVAModal}
          userId={user.ext_id}
          newUserIVA={newUserIVA}
        />
        <DeletionConfirmationModal />
        <RequestVerificationModal
          show={showRequestVerificationModal}
          setShow={setShowRequestVerificationModal}
        />
        <ConfirmVerificationModal
          show={showConfirmVerificationModal}
          setShow={setShowConfirmVerificationModal}
          toConfirmIVA={toConfirmIVA}
          setToConfirmIVA={setToConfirmIVA}
        />
      </div>
    );

  return (
    <Container className="mt-4">
      <Row>
        <Col>{content}</Col>
      </Row>
    </Container>
  );
};

export default Profile;
