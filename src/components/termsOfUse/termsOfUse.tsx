import { faGavel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  STATIC_PAGE_MAIN_DIV_CLASSES,
} from "../../utils/utils";

export const TermsOfUse = () => {
  return (
    <div className={STATIC_PAGE_MAIN_DIV_CLASSES}>
      <h5 className="mb-4 d-flex align-items-center text-secondary fw-bold">
        <FontAwesomeIcon
          icon={faGavel}
          pull="left"
          style={{
            width: "30px",
            height: "30px",
            backgroundColor: "rgba(214,95,48,0.2)",
            padding: "8px",
          }}
          className="me-3 fs-4 rounded"
        />
        TermsOfUse
      </h5>
      <hr className="border-secondary mb-4" />
      <div className="overflow-auto">
        <p className="fw-bold">
          The Terms of Use for the GHGA Data Portal will be available here soon.
        </p>
        <p>
          If you register with us via LS Login for downloading or uploading data, you will also need to comply with the{" "}
         <a href="https://lifescience-ri.eu/ls-login/ls-aai-aup.html">Acceptable Usage Policy and Conditions of Use of the LS Login service</a>.
        </p>

      </div>
    </div>
  );
};

export default TermsOfUse;
