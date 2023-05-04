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
      const lastUrl = sessionStorage.getItem("lastUrl");
      lastUrl ? (window.location.href = lastUrl) : navigate("/");
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
          } else if (!user?.id || user.changed) {
            // user is new (needs to register)
            // or her data changed (needs to confirm)
            navigate("/register");
          } else {
            // this is a well-known, registered user
            navigate("/profile");
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
