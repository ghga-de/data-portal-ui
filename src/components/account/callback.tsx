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

import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { authService } from "../../services/auth";
import { useMessages } from "../messages/usage";

/** Handle redirect after OIDC login */

let calls = 0;

const Callback = () => {
  const navigate = useNavigate();
  const { showMessage } = useMessages();

  const [searchParams] = useSearchParams();
  const state = searchParams.get("state");

  useEffect(() => {
    // make sure token request and redirection happen only once
    // (even in development with strict mode activated)
    if (calls++) return;

    const handleError = () => {
      showMessage({ type: "error", title: "Could not log in" });
      let path = sessionStorage.getItem("lastPath");
      if (path) {
        sessionStorage.removeItem("lastPath");
      } else {
        path = "/";
      }
      setTimeout(() => navigate(path!));
    };

    // in case the user tries to access without a state
    if (!state) {
      // since the cookie might be wrong if you try to access the
      // page directly, just send them back to the previous page
      navigate(-1);
    } else {
      authService
        .callback()
        .then((user) => {
          if (!user) {
            handleError();
          } else if (/Needs(Re)?Registration/.test(user.state)) {
            // user is new (needs to register)
            // or her data changed (needs to confirm)
            navigate("/register");
          } else if (/Registered|(Needs|Lost)TotpToken/.test(user.state)) {
            // user is new (needs to register)
            // or her data changed (needs to confirm)
            navigate("/setup-2fa");
          } else {
            // this is a well-known, registered user
            navigate("/account");
          }
        })
        .catch((error) => {
          showMessage({ type: "error", title: "Cannot login" });
          console.error(error);
          handleError();
        });
    }
  }, [navigate, state, showMessage]);

  return (
    <Container className="mt-4">
      <Row>
        <Col xs={1}>
          <Spinner animation="border" role="status"></Spinner>
        </Col>
        <Col>
          <p>Logging in...</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Callback;
