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
  Button,
  Container,
  Modal,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useBlocker, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faCircleArrowRight,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { authService, useAuth } from "../../../services/auth";
import { AUTH_URL, fetchJson } from "../../../utils/utils";
import { showMessage } from "../../messages/usage";

const Setup2FA = () => {
  useEffect(() => {});
  const navigate = useNavigate();

  const [twoFAURI, setTwoFAURI] = useState<string>("");

  const [showManual, setShowManual] = useState<string>("d-none");
  const [buttonText, setButtonText] = useState<string>("Setup manually");

  const [TOTPRequests, setTOTPRequests] = useState<number>(0);

  const [blocked, setBlocked] = useState<boolean>(true);
  const blocker = useBlocker(blocked);

  const { user, logoutUser } = useAuth();

  const back = () => {
    setTimeout(() => navigate(sessionStorage.getItem("lastPath") || "/"));
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

  const getTOTPCode = async () => {
    if (user && TOTPRequests === 0) {
      setTOTPRequests(TOTPRequests + 1);
      const url = new URL("totp-token", AUTH_URL);
      if (user.state === "LostTotpToken") {
        url.search = "?force=true";
      }
      try {
        const response = await fetchJson(url, "POST");
        if (response?.status !== 201) {
          throw Error(response.statusText);
        }
        const { uri: token } = await response.json();
        if (token) {
          setTwoFAURI(token);
        }
      } catch (error) {
        console.error("Cannot get TOTP code:", error);
        showMessage({
          type: "error",
          title: "Cannot get 2FA code. Please try again later.",
        });
      }
    }
  };

  if (TOTPRequests === 0) {
    getTOTPCode();
  }

  let content;
  if (user === null) {
    back(); // not authenticated
  } else if (!(user && twoFAURI)) {
    content = "Loading user data...";
  } else {
    content = (
      <>
        <h2>Set up two-factor authentication</h2>
        <div className="w-100">
          <p>
            For additional security when accessing protected data with the GHGA
            data portal, we are using two-factor authentication and verification
            of your identity via a contact address that is separate from your
            primary E-Mail contact address.
          </p>
          <p>
            The two-factor authentication means that we require you to enter an
            additional 6-digit authentication code after you logged in via LS
            Login. This code can be produced by an authenticator app such as
            Aegis, Microsoft Authenticator or Google Authenticator, which you
            can install on your mobile phone.
          </p>
          <p>
            In order to set up the authenticator app to produce the
            authentication codes for the GHGA data portal, please scan this QR
            code with your authenticator app:
          </p>
          <div>
            <QRCode
              size={128}
              value={twoFAURI}
              viewBox={`0 0 128 128`}
              className="mb-3"
            />
          </div>
          <div className={showManual}>
            <p>
              If you have trouble scanning the QR Code, please manually input
              the following setup key in your authenticator app:
              <br />{" "}
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip>Code copied to clipboard</Tooltip>}
                trigger={"click"}
                rootClose={true}
              >
                <input
                  type="text"
                  readOnly
                  value={
                    new URLSearchParams(
                      twoFAURI.substring(twoFAURI.indexOf("?"))
                    ).get("secret")!
                  }
                  className="text-center"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      new URLSearchParams(
                        twoFAURI.substring(twoFAURI.indexOf("?"))
                      ).get("secret")!
                    );
                  }}
                />
              </OverlayTrigger>
            </p>
          </div>
          <div>
            <Button
              onClick={() => {
                user.state = "HasTotpToken";
                unblock();
                authService.setUser(user);
                setTimeout(() => navigate("/confirm-2fa"), 0);
              }}
              variant="quinary"
            >
              <FontAwesomeIcon icon={faCircleArrowRight} />
              &nbsp; Continue
            </Button>
            <Button
              variant="outline-quinary"
              className="ms-2"
              onClick={() => {
                if (showManual === "") {
                  setShowManual("d-none");
                  setButtonText("Setup manually");
                } else {
                  setShowManual("");
                  setButtonText("Hide manual setup");
                }
              }}
            >
              {buttonText}
            </Button>
          </div>
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
            <Button variant="dark-3" onClick={logout} className="text-white">
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className="me-2"
              />
              Cancel and log out
            </Button>
            <Button variant="quinary" onClick={stay}>
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

export default Setup2FA;
