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
import { LoginState, useAuth } from "../../../services/auth";
import { AUTH_URL, fetchJson } from "../../../utils/utils";

const Setup2FA = () => {
  useEffect(() => {});
  const navigate = useNavigate();

  const [twoFACode, setTwoFACode] = useState<string>("");

  const [showManual, setShowManual] = useState<string>("d-none");
  const [buttonText, setButtonText] = useState<string>("Setup manually");

  const [TOTPRequests, setTOTPRequests] = useState<number>(0);

  const [blocked, setBlocked] = useState<boolean>(true);
  const blocker = useBlocker(blocked);

  const { user, logoutUser } = useAuth();

  const back = () => {
    const lastUrl = sessionStorage.getItem("lastUrl");
    setTimeout(() =>
      lastUrl ? (window.location.href = lastUrl) : navigate("/")
    );
  };

  const unblock = () => {
    if (blocked) {
      blocker.proceed?.();
      setBlocked(false);
    }
  };

  const logout = async () => {
    await logoutUser();
    unblock();
    back();
  };

  const proceed = async () => {
    blocker.reset?.();
  };

  const getTOTPCode = async () => {
    if (user && TOTPRequests === 0) {
      const { id } = user;
      const userData: any = {
        id,
        force: false,
      };
      let url = AUTH_URL;
      let method: string = "post",
        ok: number = 201;
      url = new URL(`totp-token`, url);
      if (user.state === LoginState.LostTOTPToken) {
        userData["force"] = true;
      }
      setTOTPRequests(TOTPRequests + 1);
      const response = await fetchJson(url, method, userData).catch(() => null);
      if (response && response.status === ok) {
        try {
          const { text: token } = await response.json();
          if (token) {
            setTwoFACode(token);
          }
        } catch {
          logoutUser();
        }
      }
    }
  };

  if (TOTPRequests === 0) {
    getTOTPCode();
  }

  let content;
  if (user === undefined || (user !== null && twoFACode === "")) {
    content = "Loading user data...";
  } else if (user === null) {
    back();
  } else
    content = (
      <>
        <h2>Set up two-factor authentication</h2>
        <div className="w-100">
          <p>
            For additional security when accessing protected data with the GHGA
            data portal, we are using two-factor authentication and verification
            of your identity via an independent verification address.
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
              value={twoFACode}
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
                  value={twoFACode}
                  className="text-center"
                  onClick={() => {
                    navigator.clipboard.writeText(twoFACode);
                  }}
                />
              </OverlayTrigger>
            </p>
          </div>
          <div>
            <Button
              onClick={() => {
                user.state = LoginState.HasTOTPToken;
                unblock();
                navigate("/confirm-2fa");
              }}
            >
              <FontAwesomeIcon icon={faCircleArrowRight} />
              &nbsp; Continue
            </Button>
            <Button
              variant="secondary"
              className="ms-2 text-white"
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
        <Modal show={blocked && blocker.state === "blocked"} onHide={proceed}>
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
            <Button
              variant="secondary"
              onClick={proceed}
              className="text-white"
            >
              <FontAwesomeIcon icon={faPenToSquare} className="me-2" />
              Complete 2FA setup
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );

  return <Container className="mt-4">{content}</Container>;
};

export default Setup2FA;
