import { useEffect, useState } from "react";
import { Alert, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate, NavLink } from "react-router-dom";
import { useMessages } from "../messages/usage";
import { getIVAs, useAuth } from "../../services/auth";
import { WPS_URL, fetchJson } from "../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import { IVA, IVAStatus } from "../../models/ivas";
import NewIVAModal from "./newIVAsModal/newIVAModal";

/** Display user profile */

const Profile = () => {
  const navigate = useNavigate();

  const [numDatasets, setNumDatasets] = useState<number>(0);
  const { showMessage } = useMessages();
  const { user, logoutUser } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [userIVAs, setUserIVAs] = useState<IVA[]>([]);

  const newUserIVA = (newIVA: IVA) => {
    console.log([...userIVAs, newIVA]);
    setUserIVAs([...userIVAs, newIVA]);
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
        {userIVAs.length > 0
          ? userIVAs.map((x, index) => (
              <Row key={x.id + index}>
                <Col xs={3}>
                  {x.type}: {x.value}
                </Col>
                <Col xs={2}>{IVAStatus[x.status]}</Col>
                <Col xs={1}>
                  <Button
                    variant="link"
                    className="border-0 text-secondary p-0 d-flex align-items-start"
                  >
                    <FontAwesomeIcon icon={faCircleXmark} className="fa-lg" />
                  </Button>
                </Col>
              </Row>
            ))
          : "You have not yet created any independent verification addresses. This is needed if you wish to download research data."}
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
        <div className="d-flex justify-content-between mt-5">
          <Button
            variant="primary"
            className="text-white"
            onClick={() => setShowModal(true)}
          >
            <FontAwesomeIcon icon={faPlus} /> New verification address
          </Button>
          <Button
            variant="secondary"
            className="text-white"
            onClick={logoutUser}
          >
            Logout
          </Button>
        </div>
        <NewIVAModal
          show={showModal}
          setShow={setShowModal}
          userId={user.ext_id}
          newUserIVA={newUserIVA}
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
