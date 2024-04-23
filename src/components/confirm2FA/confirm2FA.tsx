// Copyright 2021 - 2023 Universität Tübingen, DKFZ, EMBL, and Universität zu Köln
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
//

import {
  faArrowRightFromBracket,
  faCircleArrowRight,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
  Button,
  Container,
  Modal,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useBlocker, useNavigate } from "react-router-dom";
import { authService, useAuth } from "../../services/auth";
import { AUTH_URL, fetchJson } from "../../utils/utils";
import { showMessage } from "../messages/usage";

const Confirm2FA = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [inputted2FA, setInputted2FA] = useState("");
  const [disabledContinueButton, setDisabledContinueButton] = useState(true);

  const [blocked, setBlocked] = useState<boolean>(true);
  const blocker = useBlocker(blocked);

  const { user, logoutUser } = useAuth();

  const back = () => {
    const lastUrl = sessionStorage.getItem("lastUrl");
    setTimeout(() =>
      lastUrl ? (window.location.href = lastUrl) : navigate("/")
    );
  };

  const stay = () => {
    blocker.reset?.();
  };

  const unblock = () => {
    if (blocked) {
      stay();
      setBlocked(false);
    }
  };

  const logout = async () => {
    await logoutUser();
    unblock();
    back();
  };

  const submitToken = async (token: string) => {
    if (!user || !AUTH_URL) return;
    unblock();
    const { id } = user;
    const userData: any = {
      id,
      token,
    };
    let url = AUTH_URL;
    let method: string = "post",
      ok: number = 204;
    url = new URL(`rpc/verify-totp`, url);
    const response = await fetchJson(url, method, userData).catch(() => null);
    if (response && response.status === ok) {
      showMessage({ type: "success", title: "Login successful" });
      user.state = "Authenticated";
      unblock();
      authService.setUser(user);
      setTimeout(() => back(), 0);
      return;
    }
    setShowError(true);
    setTimeout(() => setDisabledContinueButton(false), 2000);
  };

  let content;
  if (user === undefined) {
    content = "Loading user data...";
  } else if (user === null) {
    back();
  } else {
    const Lost2FAModal = (props: any) => {
      const [disabledNew2FAButton, setDisabledNew2FAButton] = useState(true);
      return (
        <Modal show={showModal} size="lg" onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Create new setup for authenticator app</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              In the case that you lost your phone or the setup of your
              authenticator app, you can create a new authentication code setup.
            </p>
            <p className="fw-bold">
              However, all contact addresses that had been verified before will
              need to be verified again.
            </p>

            <div>
              <input
                type="checkbox"
                id="agree"
                className="me-2"
                onChange={(e) => {
                  setDisabledNew2FAButton(!e.target.checked);
                }}
              />
              <label htmlFor="agree" className="d-inline">
                I acknowledge that all previous contact addresses will require
                re-verification if a new authenticator setup is requested.
              </label>
            </div>
            <br />
            <Button
              disabled={disabledNew2FAButton}
              onClick={() => {
                user.state = "LostTotpToken";
                unblock();
                authService.setUser(user);
                setTimeout(() => navigate("/setup-2fa"), 0);
              }}
            >
              <FontAwesomeIcon icon={faCircleArrowRight} />
              &nbsp; Continue
            </Button>
            <Button
              variant="gray"
              className="ms-2 text-white"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
          </Modal.Body>
        </Modal>
      );
    };

    content = (
      <>
        <h2>Two-factor authentication</h2>
        <Lost2FAModal />
        <div className="w-100">
          <p>
            Please enter the 6-digit authentication code generated by your
            authenticator app
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitToken(inputted2FA);
            }}
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Invalid code entered.</Tooltip>}
              rootClose={true}
              show={showError}
            >
              <input
                type="text"
                className="text-center fs-2"
                name="totpInput"
                style={{
                  letterSpacing: "0.5em",
                  paddingLeft: "0.5em",
                  width: "7em",
                }}
                required
                minLength={6}
                maxLength={6}
                pattern="[0-9]{6}"
                size={6}
                onKeyDown={(e) => {
                  if (
                    e.key.match("^[^0-9]{1}$") &&
                    e.ctrlKey === false &&
                    e.altKey === false
                  )
                    e.preventDefault();
                }}
                onChange={(e) => {
                  setInputted2FA(e.target.value);
                  if (e.target.value.length === 6)
                    setDisabledContinueButton(false);
                  else setDisabledContinueButton(true);
                }}
              />
            </OverlayTrigger>
            <div className="mt-4">
              <Button
                type="submit"
                disabled={disabledContinueButton}
                onClick={() => {}}
              >
                <FontAwesomeIcon icon={faCircleArrowRight} />
                &nbsp; Submit
              </Button>
              <Button
                variant="secondary"
                className="ms-2 text-white"
                onClick={() => setShowModal(true)}
              >
                I lost my authenticator setup
              </Button>
            </div>
          </form>
        </div>
        <Modal show={blocked && blocker.state === "blocked"} onHide={stay}>
          <Modal.Header closeButton>
            <Modal.Title>You have not setup 2FA yet!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Please continue with the 2FA setup before proceeding to browse
              this website.
            </p>
            <p>
              If you don't want to setup 2FA, please log out to cancel the
              registration.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="quaternary"
              onClick={logout}
              className="text-white"
            >
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className="me-2"
              />
              Cancel and log out
            </Button>
            <Button variant="secondary" onClick={stay} className="text-white">
              <FontAwesomeIcon icon={faPenToSquare} className="me-2" />
              Complete 2FA setup
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  return <Container className="mt-4">{content}</Container>;
};

export default Confirm2FA;
