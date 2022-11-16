import { Container } from "react-bootstrap";
import lsLogin from "../../assets/loginLS/ls-login.png";
import lsRegister from "../../assets/loginLS/ls-register.png";
import authService from "../../services/auth";

/** Login page */

const Login = () => {
  return (
    <Container className="px-5 d-flex justify-content-center mb-5 pb-5">
      <div className="w-75 my-5 pb-5">
        <div className="bg-light p-4 my-5 rounded text-center mb-5 pb-5">
          <p className="mb-4">
            To upload/download data to the{" "}
            <strong>German Human Genome-Phenome Archive</strong>, you need to
            sign in via <strong>LS Login</strong>.
          </p>
          <p className="mb-4">
            LS Login lets you authenticate using your existing accounts at third parties
            (your home university, research institute or a commercial service)
            and link it to your LS ID. Alternatively, you can also activate
            an LS account with username and password.
          </p>
          <img src={lsLogin} alt="LS Login" width="200px" onClick={() => authService.login()}/>
        </div>
        <hr className="bg-secondary text-center" />
        <div className="bg-light-alternative p-4 my-5 rounded text-center mb-5 pb-5">
          <p className="mb-4">
            If you have never used <strong>LS Login</strong> before, you can register here.
          </p>
          <a href="https://signup.aai.lifescience-ri.eu/">
            <img src={lsRegister} alt="LS Register" width="200px" />
          </a>
        </div>
      </div>
    </Container>
  );
};

export default Login;