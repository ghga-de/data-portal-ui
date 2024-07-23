import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useBlocker } from "react-router-dom";
import { Button, Container, Modal, Row, Col } from "react-bootstrap";
import { AUTH_URL, fetchJson } from "../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCheck,
  faIdCard,
  faArrowRightFromBracket,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useMessages } from "../messages/usage";
import { authService, useAuth } from "../../services/auth";

/** User registration form */

const Register = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [accepted, setAccepted] = useState<boolean>(false);
  const [blocked, setBlocked] = useState<boolean>(true);
  const blocker = useBlocker(blocked);
  const { showMessage } = useMessages();
  const { user, logoutUser } = useAuth();

  const back = () => {
    let path = sessionStorage.getItem("lastPath");
    if (path) {
      sessionStorage.removeItem("lastPath");
    } else {
      path = "/";
    }
    setTimeout(() => navigate(path!));
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

  const prompt = () =>
    user?.id
      ? (user.state === "NeedsReRegistration"
          ? "Your contact information has changed since you last registered. "
          : "") + "Please confirm that the information given below is correct."
      : "Since you haven't used our data portal before, " +
        "we ask you to confirm your user data and register with us.";

  const buttonText = () =>
    blocked ? (user?.id ? "Confirm" : "Register") : "Continue";

  const submitUserData = async () => {
    if (!blocked) {
      navigate("/setup-2fa");
      return;
    }
    if (!user || !AUTH_URL) return;
    unblock();
    const { id, ext_id, name, email } = user;
    const userData: any = {
      name,
      email,
      title: title || null,
    };
    let url = AUTH_URL;
    let method: string, ok: number;
    if (id) {
      url = new URL(`users/${id}`, url);
      method = "PUT";
      ok = 204;
    } else {
      url = new URL("users", url);
      userData["ext_id"] = ext_id;
      method = "POST";
      ok = 201;
    }
    const response = await fetchJson(url, method, userData).catch(
      (e) => console.error(e));
    let registered = false;
    if (response && response.status === ok) {
      // The state should have changed and the user should now have an internal ID.
      // We need to check that and give a hint to the backend to reload the session.
      for (let attempt = 0; attempt < 5; attempt++) {
        const wait = (1 << attempt) * 50;
        await new Promise((r) => setTimeout(r, wait));
        const user = await authService.getUser(true);
        if (user?.id && user.state !== 'NeedsReRegistration') {
          registered = true;
          break;
        }
      }
    }
    if (!registered) {
      showMessage({ type: "error", title: "Could not register" });
      back();
      return;
    }
    showMessage({
      type: "success",
      title: `Registration successful`,
      detail:
        "You have been successfully registered. To be able to login, you will need to setup two-factor authentication in the next page.",
      label1: "Continue",
      callback1: () => {
        navigate("/setup-2fa");
      },
      modal: true,
    });
  };

  const handleTitle = (event: ChangeEvent<HTMLSelectElement>) => {
    setTitle(event.target.value);
  };

  const handleToS = (event: ChangeEvent<HTMLInputElement>) => {
    setAccepted(event.target.checked);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    submitUserData();
  };

  const dataDivClasses = "col-md-10 col-sm-9 text-break";

  let content;
  if (user === undefined) {
    content = "Loading user data...";
  } else if (
    !(user && /NeedsRegistration|NeedsReRegistration/.test(user.state)) &&
    !(user?.state === "Registered" && !blocked)
  ) {
    unblock();
    back();
  } else
    content = (
      <div className="container mb-3">
        <h1>
          <FontAwesomeIcon icon={faIdCard} className="me-2 text-secondary" />{" "}
          Registration with GHGA
        </h1>
        <h2 className="mt-4">Welcome, {user.full_name}!</h2>
        <p>{prompt()}</p>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="row g-3 mb-3">
            <label className="col-md-2 col-sm-3">
              <b>Name:</b>
            </label>
            <div className={dataDivClasses}>{user.name}</div>
          </div>
          <div className="row g-3 mb-3">
            <label className="col-md-2 col-sm-3">
              <b>E-Mail:</b>
            </label>
            <div className={dataDivClasses}>{user.email}</div>
          </div>
          <div className="row g-3 mb-4">
            <label className="col-md-2 col-sm-3">
              <b>Life Science ID:</b>
            </label>
            <div className={dataDivClasses}>{user.ext_id}</div>
          </div>
          <div className="row g-3 mb-5">
            <label
              className="col-md-2 col-sm-3 col-form-label"
              htmlFor="input-title"
            >
              <b>Academic title:</b>
            </label>
            <div className="col-md-2 col-sm-3">
              <select
                onChange={handleTitle}
                className="form-select"
                id="input-title"
              >
                <option value="">—</option>
                <option value="Dr.">Dr.</option>
                <option value="Prof.">Prof.</option>
              </select>
            </div>
          </div>
          {blocked ? (
            <div className="row g-3 mb-3">
              <div className="col-md-12">
                <input
                  type="checkbox"
                  onChange={handleToS}
                  className="me-3"
                  id="tos"
                />
                <label htmlFor="tos">
                  I accept the{" "}
                  <Link to="/terms-of-use" target="_blank" rel="noreferrer">
                    terms of use
                  </Link>{" "}
                  and the{" "}
                  <a
                    href="https://www.ghga.de/data-protection"
                    target="_blank"
                    rel="noreferrer"
                  >
                    privacy policy
                  </a>
                  .
                </label>
              </div>
            </div>
          ) : null}
          <div className="d-flex justify-content-end">
            <Button
              variant="danger"
              className="text-white me-4"
              onClick={logout}
            >
              <Row className="flex-nowrap align-items-center">
                <Col xs={"auto"} className="pe-0">
                  <FontAwesomeIcon
                    icon={faArrowRightFromBracket}
                    className="me-2"
                  />
                </Col>
                <Col className="ps-0">Cancel and log out</Col>
              </Row>
            </Button>
            <Button
              type="submit"
              variant="quinary"
              className="text-white"
              disabled={!accepted}
            >
              <Row className="flex-nowrap">
                <Col xs={"auto"} className="pe-0">
                  <FontAwesomeIcon icon={faUserCheck} className="me-2" />
                </Col>
                <Col className="ps-0">
                  <span>{buttonText()}</span>
                </Col>
              </Row>
            </Button>
          </div>
        </form>
        <Modal show={blocked && blocker.state === "blocked"} onHide={stay}>
          <Modal.Header closeButton>
            <Modal.Title>You have not registered yet!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Please continue with the registration before proceeding to browse
              this website.
            </p>
            <p>
              If you don't want to register, please log out to cancel the
              registration.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={logout} className="text-white">
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className="me-2"
              />
              Cancel and log out
            </Button>
            <Button variant="quinary" onClick={stay} className="text-white">
              <FontAwesomeIcon icon={faPenToSquare} className="me-2" />
              Complete registration
            </Button>
          </Modal.Footer>
        </Modal>
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

export default Register;
