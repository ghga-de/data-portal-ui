import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { unstable_useBlocker as useBlocker } from "react-router-dom";
import { Button, Container, Modal, Row, Col } from "react-bootstrap";
import authService, { fullName, User } from "../../services/auth";
import { fetchJson } from "../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCheck,
  faIdCard,
  faArrowRightFromBracket,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useMessages } from "../messages/usage";

const USERS_URL = process.env.REACT_APP_SVC_USERS_URL;

/** User registration form */

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [title, setTitle] = useState<string>("");
  const [accepted, setAccepted] = useState<boolean>(false);
  const [blocked, setBlocked] = useState<boolean>(true);
  const blocker = useBlocker(blocked);
  const { showMessage } = useMessages();

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
    await authService.logout();
    unblock();
    back();
  };

  const proceed = async () => {
    blocker.reset?.();
  };

  const prompt = () =>
    user?.id
      ? (user.changed
          ? "Your contact information has changed since you last registered. "
          : "") + "Please confirm that the information given below is correct."
      : "Since you haven't used our data portal before, " +
        "we ask you to confirm your user data and register with us.";

  const buttonText = () => (user?.id ? "Confirm" : "Register");

  const submitUserData = async () => {
    if (!user || !USERS_URL) return;
    unblock();
    const { id, ext_id, name, email } = user;
    const userData: any = {
      name,
      email,
      title: title || null,
    };
    let url: string = USERS_URL;
    let method: string, ok: number;
    if (id) {
      url += `/${user.id}`;
      method = "put";
      ok = 204;
    } else {
      userData["ext_id"] = ext_id;
      method = "post";
      ok = 201;
    }
    const response = await fetchJson(url, method, userData).catch(() => null);
    if (response && response.status === ok) {
      showMessage({ type: "success", title: "Registration successful" });
      navigate("/profile");
      return;
    }
    showMessage({ type: "error", title: "Could not register" });
    back();
  };

  useEffect(() => {
    if (authService.user) setUser(authService.user);
    else authService.getUser().then(setUser);
  }, [user]);

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
  if (user === undefined) content = "Loading user data...";
  else if (user === null) {
    unblock();
    back();
  } else
    content = (
      <div className="container mb-3">
        <h1>
          <FontAwesomeIcon icon={faIdCard} className="me-2 text-secondary" />{" "}
          Registration with GHGA
        </h1>
        <h2 className="mt-4">Welcome, {fullName(user)}!</h2>
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
          <div className="row g-3 mb-3">
            <div className="col-md-12">
              <input type="checkbox" onChange={handleToS} className="me-3" />I
              accept the{" "}
              <a
                href="https://www.ghga.de/terms-of-service"
                target="_blank"
                rel="noreferrer"
              >
                terms of service
              </a>{" "}
              and the{" "}
              <a
                href="https://www.ghga.de/data-protection"
                target="_blank"
                rel="noreferrer"
              >
                privacy policy
              </a>
              .
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <Button
              variant="quaternary"
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
              variant="secondary"
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
        <Modal show={blocked && blocker.state === "blocked"} onHide={proceed}>
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
