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

import { Button, Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useState } from "react";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";

const Setup2FA = () => {
  let twoFACode = "0123456789ABCDEFGHI";
  const navigate = useNavigate();

  const [showManual, setShowManual] = useState<string>("d-none");
  const [buttonText, setButtonText] = useState<string>("Setup manually");

  return (
    <Container className="mt-4">
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
          Aegis, Microsoft Authenticator or Google Authenticator, which you can
          install on your mobile phone.
        </p>
        <p>
          In order to set up the authenticator app to produce the authentication
          codes for the GHGA data portal, please scan this QR code with your
          authenticator app:
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
            If you have trouble scanning the QR Code, please manually input the
            following setup key in your authenticator app:
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
    </Container>
  );
};

export default Setup2FA;
