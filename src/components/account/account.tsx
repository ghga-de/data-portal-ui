// Copyright 2021 - 2024 Universität Tübingen, DKFZ and EMBL
// for the German Human Genome-Phenome Archive (GHGA)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Container,
  Row,
  Col,
  Modal,
  Card,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { ARS_URL, AUTH_URL, WPS_URL, fetchJson } from "../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faCircleInfo,
  faCircleXmark,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useMessages } from "../messages/usage";
import { useAuth } from "../../services/auth";
import { getUserIVAs } from "../../services/ivas";
import {
  IVA,
  IVAState,
  IVAStatePrintable,
  IVATypePrintable,
} from "../../models/ivas";
import NewIVAModal from "./newIVAsModal/newIVAModal";
import ConfirmVerificationModal from "./verificationModals/confirmVerificationModal";
import RequestVerificationModal from "./verificationModals/requestVerificationModal";
import { AccessRequest } from "../../models/submissionsAndRequests";

/** Display user profile */

const Account = () => {
  const navigate = useNavigate();

  const [numDatasets, setNumDatasets] = useState<number>(0);
  const { showMessage } = useMessages();
  const { user } = useAuth();

  const [userIVAs, setUserIVAs] = useState<IVA[]>([]);
  const [pendingUserRequests, setPendingUserRequests] = useState<
    AccessRequest[] | null | undefined
  >(undefined);
  const [allowedUserRequests, setAllowedUserRequests] = useState<
    AccessRequest[] | null | undefined
  >(undefined);

  const [toDeleteIVA, setToDeleteIVA] = useState<IVA | null>(null);
  const [toConfirmIVA, setToConfirmIVA] = useState<IVA | null>(null);

  const [showNewIVAModal, setShowNewIVAModal] = useState(false);
  const [showDeletionConfirmationModal, setShowDeletionConfirmationModal] =
    useState<boolean>(false);
  const [showRequestVerificationModal, setShowRequestVerificationModal] =
    useState(false);
  const [showConfirmVerificationModal, setShowConfirmVerificationModal] =
    useState(false);

  // Has to be managed with the content so there's no hanging words in certain tooltips that have line breaks for readability
  const wideTooltips = `.tooltip .tooltip-inner {
    max-width: 52em !important;
    text-align: left;
}`;

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
          {toDeleteIVA && toDeleteIVA.state === IVAState.Verified ? (
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
            variant="danger"
            className="text-white"
            onClick={() => {
              deleteUserIVA();
            }}
          >
            Confirm deletion
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
    const userId = user?.id;
    const ivaId = toDeleteIVA?.id;
    if (!userId || !ivaId) {
      return;
    }
    url = new URL(`users/${userId}/ivas/${ivaId}`, url);
    let method: string = "DELETE",
      ok: number = 204;
    const response = await fetchJson(url, method).catch(() => null);
    if (response && response.status === ok) {
      showMessage({
        type: "success",
        title: "Contact address deleted successfully!",
      });
      setUserIVAs(userIVAs.filter((x) => x.id !== ivaId));
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
      userIVAs.find((x) => idIVA === x.id)!.state = IVAState.CodeRequested;
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
      if (user?.id && user.state === "Authenticated") {
        let url = new URL(`users/${user.id}/datasets`, WPS_URL);
        try {
          const response = await fetchJson(url);
          const datasets = await response.json();
          setNumDatasets(datasets.length);
        } catch (error) {
          showMessage({
            type: "error",
            title: "Cannot retrieve your datasets.",
          });
          console.error(error);
        }

        try {
          const ivas = await getUserIVAs(user.id);
          if (ivas) {
            setUserIVAs(ivas);
          }
        } catch (error) {
          showMessage({
            type: "error",
            title: "Cannot retrieve your contact addresses.",
          });
          console.error(error);
        }

        let accessRequests: AccessRequest[] | null = null;
        url = new URL(`access-requests?user_id=${user.id}`, ARS_URL);
        try {
          const response = await fetchJson(url);
          if (response.ok) {
            accessRequests = await response.json();
            setPendingUserRequests(
              accessRequests?.filter((x) => x.status === "pending")
            );
            setAllowedUserRequests(
              accessRequests?.filter(
                (x) =>
                  x.status === "allowed" &&
                  Date.parse(x.access_ends) > Date.now()
              )
            );
          }
        } catch (error) {
          showMessage({
            type: "error",
            title: "Cannot retrieve your access requests.",
          });
          console.error(error);
        }
      }
    }
    fetchData();
  }, [showMessage, user]);

  const back = () => {
    let path = sessionStorage.getItem("lastPath");
    if (path) {
      sessionStorage.removeItem("lastPath");
    } else {
      path = "/";
    }
    setTimeout(() => navigate(path!));
  };

  let content;
  if (user === undefined) content = "Loading user data...";
  else if (!user?.id || user.state !== "Authenticated") {
    content = "Not logged in!";
    if (sessionStorage.getItem("lastPath") === "/account") {
      sessionStorage.removeItem("lastPath");
    }
    back();
  } else
    content = (
      <div>
        <style lang="css">{wideTooltips}</style>
        <h3 style={{ margin: "1em 0 0" }}>User account</h3>
        <h5 style={{ margin: "0.5em 0" }}>{user.full_name}</h5>
        <div style={{ margin: "1em 0" }}>
          <Alert variant={user?.timeout ? "success" : "danger"}>
            {user.timeout
              ? user.role === "data_steward"
                ? "You are logged in to the GHGA data portal as a data steward."
                : "You are logged in to the GHGA data portal."
              : "Your login session has expired!"}
          </Alert>
        </div>
        <Card className="mb-3">
          <Card.Header>
            E-Mail address&nbsp;
            <OverlayTrigger
              overlay={
                <Tooltip id={"ema"}>
                  Contact e-mail address taken from the LS Login account logged
                  in with.
                </Tooltip>
              }
            >
              <span className="float-end">
                <FontAwesomeIcon icon={faCircleInfo} />
              </span>
            </OverlayTrigger>
          </Card.Header>
          <Card.Body>
            <div>
              <p>
                We will communicate with you via this email address:&nbsp;
                <strong>{user.email}</strong>
              </p>
              <p className="mb-0">
                You can change this email address in your&nbsp;
                <a
                  href="https://profile.aai.lifescience-ri.eu/profile"
                  target="_blank"
                  rel="noreferrer"
                >
                  LS Login profile
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    transform={"shrink-6"}
                  />
                </a>
                .
              </p>
            </div>
          </Card.Body>
        </Card>
        <Card className="mb-3">
          <Card.Header>
            Contact addresses for account verification&nbsp;
            <OverlayTrigger
              overlay={
                <Tooltip id={"ivas"}>
                  Addresses used to verify your account's identity in order to
                  access and request access to datasets.
                  <br />
                  Adding new contact address is done via the relevant button at
                  the end of this section.
                  <br />
                  After a new address is added, you must request verification of
                  the address using the provided button.
                  <br />
                  Removing a contact address is done through the red button to
                  the right, but you will lose access to any datasets whose
                  access was linked to that address.
                </Tooltip>
              }
            >
              <span className="float-end">
                <FontAwesomeIcon icon={faCircleInfo} />
              </span>
            </OverlayTrigger>
          </Card.Header>
          <Card.Body className="pt-1 pt-md-3">
            <div className="mb-3">
              {userIVAs.length > 0 ? (
                userIVAs.map((x, index) => {
                  return (
                    <Row
                      key={x.id + index}
                      className="pb-1 mt-1 border-bottom align-items-stretch"
                    >
                      <Col xs={6} md={6} xl={5}>
                        <Row>
                          <Col md={5}>{IVATypePrintable[x.type]}:</Col>
                          <Col md={7}>{x.value}</Col>
                        </Row>
                      </Col>
                      <Col
                        xs={5}
                        md={4}
                        lg={3}
                        xl={3}
                        xxl={2}
                        className={
                          x.state === IVAState.Verified
                            ? "text-success fw-bold align-self-center"
                            : ""
                        }
                      >
                        {x.state === IVAState.Unverified ? (
                          <Button
                            id={"del_" + x.id}
                            variant="warning"
                            className="p-0 px-2 px-md-1 text-white w-100 text-start h-100"
                            onClick={(e) => {
                              let button = e.target as HTMLButtonElement;
                              HandleRequestVerification(button.id.substring(4));
                            }}
                          >
                            Request verification
                          </Button>
                        ) : x.state === IVAState.CodeTransmitted ? (
                          <Button
                            id={"con_" + x.id}
                            variant="quinary"
                            className="p-0 px-2 px-md-1 text-white w-100 text-start h-100"
                            onClick={(e) => {
                              let button = e.target as HTMLButtonElement;
                              HandleConfirmVerification(button.id.substring(4));
                            }}
                          >
                            Enter verification code
                          </Button>
                        ) : (
                          IVAStatePrintable[x.state]
                        )}
                      </Col>
                      <Col xs={1} className="px-0">
                        <Button
                          variant="link"
                          className="border-0 h-100 text-danger p-0 d-flex align-items-center"
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
            <Button variant="quinary" onClick={() => setShowNewIVAModal(true)}>
              <FontAwesomeIcon icon={faPlus} /> New contact address
            </Button>
          </Card.Body>
        </Card>
        <Card className="mb-3">
          <Card.Header>
            Dataset access&nbsp;
            <OverlayTrigger
              overlay={
                <Tooltip id={"dsd"}>
                  If you have been granted access to any datasets, these will
                  appear below. In order to download data from these datasets
                  (if you have been granted access to one), you will need to
                  create download tokens through the respective button, which
                  will take you to the download token management page.
                </Tooltip>
              }
            >
              <span className="float-end">
                <FontAwesomeIcon icon={faCircleInfo} />
              </span>
            </OverlayTrigger>
          </Card.Header>
          <Card.Body>
            <div>
              {numDatasets &&
              allowedUserRequests &&
              allowedUserRequests.length > 0 ? (
                <>
                  <p className="mb-1">
                    You have access to the following datasets:
                  </p>
                  <ul>
                    {allowedUserRequests?.map((x) => (
                      <li key={x.id} className="mb-0">
                        <Row>
                          <Col md={6} lg={4} xxl={3}>
                            For dataset{" "}
                            <Link to={`/browse/${x.dataset_id}`}>
                              {x.dataset_id}
                            </Link>{" "}
                          </Col>
                          <Col md={3} xl={2}>
                            from {x.access_starts.slice(0, 10)}
                          </Col>
                          <Col>to {x.access_ends.slice(0, 10)}</Col>
                        </Row>
                      </li>
                    ))}
                  </ul>

                  <Link to="/work-package">
                    <Button variant="quinary">Set up a download token</Button>
                  </Link>
                </>
              ) : (
                <p>You do not yet have access to any datasets.</p>
              )}
            </div>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>
            Pending access requests&nbsp;
            <OverlayTrigger
              overlay={
                <Tooltip id={"par"}>
                  If you have any pending access requests to any datasets, these
                  will appear below. Any request that is granted will be moved
                  to the section above (Dataset access). If an access request is
                  denied, it will no longer be displayed here, and a new access
                  request can be created by going to the desired dataset.
                </Tooltip>
              }
            >
              <span className="float-end">
                <FontAwesomeIcon icon={faCircleInfo} />
              </span>
            </OverlayTrigger>
          </Card.Header>
          <Card.Body>
            <div>
              <p className="mb-1">
                {pendingUserRequests && pendingUserRequests.length > 0
                  ? "You have the following pending access requests:"
                  : "You have no pending access requests."}
              </p>
              <ul>
                {pendingUserRequests && pendingUserRequests.length > 0
                  ? pendingUserRequests?.map((x) => (
                      <li key={x.id} className="mb-0">
                        <Row>
                          <Col md={6} lg={4} xxl={3}>
                            For dataset{" "}
                            <Link to={`/browse/${x.dataset_id}`}>
                              {x.dataset_id}
                            </Link>{" "}
                          </Col>
                          <Col md={3} xl={2}>
                            from {x.access_starts.slice(0, 10)}
                          </Col>
                          <Col>to {x.access_ends.slice(0, 10)}</Col>
                        </Row>
                      </li>
                    ))
                  : ""}
              </ul>
            </div>
          </Card.Body>
        </Card>
        <NewIVAModal
          show={showNewIVAModal}
          setShow={setShowNewIVAModal}
          userId={user.id}
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

export default Account;
