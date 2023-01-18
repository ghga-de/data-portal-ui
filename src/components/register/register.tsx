import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Alert, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import authService, { fullName, User } from "../../services/auth";
import { fetchJson } from "../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck, faIdCard } from "@fortawesome/free-solid-svg-icons";

const USERS_URL = process.env.REACT_APP_SVC_USERS_URL;

/** User registration form */

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [title, setTitle] = useState<string>('');
  const [accepted, setAccepted] = useState<boolean>(false);

  const postUserData = async () => {
    if (!user) return;
    const { lsId, name, email } = user;
    const userData = {
      ls_id: lsId, name, email,
      title: title || null
    };
    const response = await fetchJson(`${USERS_URL}`, "post", userData).catch(() => null);
    if (response && response.status === 201) {
      // TODO: should confirm that the user has been registered
      navigate("/profile");
      return;
    }
    alert("Could not register"); // TODO: nicer
    const lastUrl = sessionStorage.getItem("lastUrl");
    lastUrl ? window.location.href = lastUrl : navigate("/");
  };

  useEffect(() => {
    if (authService.user)
      setUser(authService.user);
    else
      authService.getUser().then(setUser);
  }, []);

  const handleTitle = (event: ChangeEvent<HTMLSelectElement>) => {
    setTitle(event.target.value);
  };

  const handleToS = (event: ChangeEvent<HTMLInputElement>) => {
    setAccepted(event.target.checked);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    postUserData();
  };

  let content;
  if (user === undefined)
    content = "Loading user data...";
  else if (user === null) 
    content = <div style={{margin: "2em 0"}}>
        <Alert variant="danger">You are not logged in.</Alert>
      </div>;
  else
    content = (
      <div className="container mb-3">
        <h1><FontAwesomeIcon icon={faIdCard} className="me-2 text-secondary" /> Registration Form</h1>
        <h2 className="mt-4">Welcome, {fullName(user)}!</h2>
        <p>Since you haven't used our data portal before,
          we ask you to confirm your user data and register with us.
        </p>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="row g-3 mb-3">
            <label className="col-md-2 col-sm-3"><b>Name:</b></label>
            <div className="col-md-10 col-sm-9">
              {user.name}
            </div>
          </div>
          <div className="row g-3 mb-3">
            <label className="col-md-2 col-sm-3"><b>E-Mail:</b></label>
            <div className="col-md-10 col-sm-9">
              {user.email}
            </div>
          </div>
          <div className="row g-3 mb-4">
            <label className="col-md-2 col-sm-3"><b>Life Science ID:</b></label>
            <div className="col-md-10 col-sm-9">
              {user.lsId}
            </div>
          </div>
          <div className="row g-3 mb-5">
            <label className="col-md-2 col-sm-3 col-form-label" htmlFor="input-title"><b>Academic title:</b></label>
            <div className="col-md-2 col-sm-3">
              <select onChange={handleTitle} className="form-select" id="input-title">
                <option value="">—</option>
                <option value="Dr.">Dr.</option>
                <option value="Prof.">Prof.</option>
              </select>
            </div>
          </div>
          <div className="row g-3 mb-3">
            <div className="col-md-12">
              <input type="checkbox" onChange={handleToS} className="me-3" />I accept
              the <a href="https://www.ghga.de/terms-of-service" target="_blank" rel="noreferrer">terms of service</a> and
              the <a href="https://www.ghga.de/data-protection" target="_blank" rel="noreferrer">privacy policy</a>.
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <Button type="submit" variant="secondary" className="text-white" disabled={!accepted}>
            <FontAwesomeIcon icon={faUserCheck} className="me-2 ms-3" />
            <span className="me-3">Register</span></Button>
          </div>
        </form>
      </div>);

  return <Container className="mt-4"><Row><Col>{content}</Col></Row></Container>;
};

export default Register;
