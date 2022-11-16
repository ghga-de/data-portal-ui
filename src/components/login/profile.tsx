import { useEffect, useState } from "react";
import { Alert, Button, Container, Row, Col } from "react-bootstrap";
import authService, { UserClaims } from "../../services/auth";

/** Display user profile */

const Profile = () => {
  const [user, setUser] = useState<UserClaims | null | undefined>(undefined);

  useEffect(() => {
    authService.getUserClaims().then(setUser);
  }, []);

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };
  
  let content;
  if (user === undefined)
    content = "Loading user data...";
  else if (user === null) 
    content = <div style={{margin: "2em 0"}}>
        <Alert variant="success">You are not logged in.</Alert>
      </div>;
  else
    content = (
      <div>
        <h1 style={{margin: "1em 0"}}>Welcome, {user.name}!</h1>
        <div style={{margin: "1em 0"}}>
          <p>We will communicate with you via this email address: &nbsp;
            <strong>{user.email}</strong></p>
          <p>You can change this email address in your &nbsp;
            <a href="https://profile.aai.lifescience-ri.eu/profile"
            target="_blank" rel="noreferrer">LS Login profile</a>.
          </p>
        </div>
        <div style={{margin: "1em 0"}}>
          <Alert variant={user.expired ? "danger" : "success" }>
            { user.expired ? "Your session has expired!" : "Your user session is active." }
          </Alert>
        </div>
        <div style={{margin: "2em 0", textAlign: "right"}}>
          <Button variant="secondary" className="text-white"
           onClick={logout}>Logout</Button>
        </div>
      </div>);

  return <Container className="mt-4"><Row><Col>{content}</Col></Row></Container>;
};

export default Profile;