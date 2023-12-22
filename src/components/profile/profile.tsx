import { useEffect, useState } from "react";
import { Alert, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate, NavLink } from "react-router-dom";
import { useMessages } from "../messages/usage";
import { useAuth } from "../../services/auth";
import { fetchJson } from "../../utils/utils";
import { urlWithEndSlash } from "../../api/browse";

const CLIENT_URL : URL = new URL(urlWithEndSlash(process.env.REACT_APP_CLIENT_URL!))
const WPS_URL : URL = new URL(urlWithEndSlash(process.env.REACT_APP_WPS_URL!), CLIENT_URL);

/** Display user profile */

const Profile = () => {
  const navigate = useNavigate();

  const [numDatasets, setNumDatasets] = useState<number>(0);
  const { showMessage } = useMessages();
  const { user, logoutUser } = useAuth();

  useEffect(() => {
    async function fetchData() {
      if (user?.id) {
        const url = new URL(`users/${user.id}/datasets`, WPS_URL);
        try {
          const response = await fetchJson(url);
          const datasets = await response.json();
          setNumDatasets(datasets.length);
        } catch (error) {
          showMessage({
            type: "error",
            title: "Cannot retrieve your datasets.",
          });
          console.log(error);
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
        <h3 style={{ margin: "1em 0" }}>Welcome, {user.fullName}!</h3>
        <div style={{ margin: "1em 0" }}>
          <p>
            We will communicate with you via this email address: &nbsp;
            <strong>{user.email}</strong>
          </p>
          <p>
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
        <div style={{ margin: "1em 0" }}>
          <Alert variant={user.expired ? "danger" : "success"}>
            {user.expired
              ? "Your session has expired!"
              : "Your user session is active."}
          </Alert>
        </div>
        <div style={{ margin: "1em 0" }}>
          {numDatasets ? (
            <NavLink to="/work-package">
              You have access to
              {numDatasets === 1 ? " one dataset" : ` ${numDatasets} datasets`}.
            </NavLink>
          ) : (
            <span>You do not yet have access to any datasets.</span>
          )}
        </div>
        <div style={{ margin: "2em 0", textAlign: "right" }}>
          <Button
            variant="secondary"
            className="text-white"
            onClick={logoutUser}
          >
            Logout
          </Button>
        </div>
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
