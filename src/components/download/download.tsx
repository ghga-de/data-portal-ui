import {
  faClockFour,
  faCloudArrowDown,
  faEnvelope,
  faKey,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import browseImg from "../../assets/download/browse.png";
import downloadImg from "../../assets/download/download-1.png";
import emailImg from "../../assets/download/email.png";
import requestImg from "../../assets/download/request-access.png";
import {
  STATIC_PAGE_IMG_COL_CLASSES,
  STATIC_PAGE_IMG_ROW_CLASSES,
  STATIC_PAGE_MAIN_DIV_CLASSES,
} from "../../utils/utils";

const Download = () => {
  return (
    <div className={STATIC_PAGE_MAIN_DIV_CLASSES}>
      <h5 className="d-flex align-items-center text-secondary fw-bold">
        <FontAwesomeIcon
          icon={faCloudArrowDown}
          pull="left"
          style={{
            width: "30px",
            height: "30px",
            backgroundColor: "rgba(214,95,48,0.2)",
            padding: "8px",
          }}
          className="me-3 fs-4 rounded"
        />
        How to Access Data
      </h5>
      <hr className="border-secondary mb-4" />
      <div className="overflow-auto">
        <p>
          The GHGA Data Portal allows users to request access to data through the 
          portal. We are listing non-personal metadata and acting as a gateway to data 
          submitters who will serve the research data upon approval of the request. 
        </p>
        <p>
          Visit your dataset of interest and then click on the "Request access" 
          button. This will direct you to a data access request form. Complete 
          the form with the necessary information and submit it to request access 
          to the dataset. The data access committee will review your request and 
          respond accordingly.
        </p>
      </div>
      <Row className={STATIC_PAGE_IMG_ROW_CLASSES}>
        <Col className={STATIC_PAGE_IMG_COL_CLASSES}>
          <img
            src={downloadImg}
            alt="Explore dataset - Request access - Send e-mail - Data owner interaction"
            className="w-100"
          />
        </Col>
      </Row>
      <div>
        <h5 className="mb-4 d-flex align-items-center text-secondary fw-bold">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            pull="left"
            style={{
              width: "30px",
              height: "30px",
              backgroundColor: "rgba(214,95,48,0.2)",
              padding: "8px",
            }}
            className="me-3 fs-4 rounded"
          />
          Explore Datasets
        </h5>
        <p>
          To explore a dataset, please find the dataset of interest on the&nbsp;
          <Link to="/browse" target="_blank" rel="noreferrer">
            browse page
          </Link>
          &nbsp;using the search function.
        </p>
        <Row className={STATIC_PAGE_IMG_ROW_CLASSES}>
          <Col className={STATIC_PAGE_IMG_COL_CLASSES}>
            <img src={browseImg} alt="Browse view" className="w-100" />
          </Col>
        </Row>
        <p>
          To request a dataset, expand the dataset by clicking the arrow at the right corner of the
          dataset box, and click the "Request Access" button.
        </p>
        <Row className={STATIC_PAGE_IMG_ROW_CLASSES}>
          <Col className={STATIC_PAGE_IMG_COL_CLASSES}>
            <img src={requestImg} alt="Dataset details" className="w-100" />
          </Col>
        </Row>
      </div>
      <div>
        <h5 className="mb-4 d-flex align-items-center text-secondary fw-bold">
          <FontAwesomeIcon
            icon={faKey}
            pull="left"
            style={{
              width: "30px",
              height: "30px",
              backgroundColor: "rgba(214,95,48,0.2)",
              padding: "8px",
            }}
            className="me-3 fs-4 rounded"
          />
          Request Access
        </h5>
        <p>
          After clicking the "Request Access" button on the dataset details page, you 
          will be directed to a specific data access request form for that dataset. 
          On this form, you will need to provide details about your request and your 
          email address for further communication. Once you've filled out the necessary 
          information, submit the form to proceed with your data access request.
        </p>
        <Row className={STATIC_PAGE_IMG_ROW_CLASSES}>
          <Col className={STATIC_PAGE_IMG_COL_CLASSES}>
            <img src={emailImg} alt="Dataset details" className="w-100" />
          </Col>
        </Row>
      </div>
      <div>
        <h5 className="mb-4 d-flex align-items-center text-secondary fw-bold">
          <FontAwesomeIcon
            icon={faClockFour}
            pull="left"
            style={{
              width: "30px",
              height: "30px",
              backgroundColor: "rgba(214,95,48,0.2)",
              padding: "8px",
            }}
            className="me-3 fs-4 rounded"
          />
          Data Owner Interaction
        </h5>
        <p className="mb-5">
          After communicating with the data owner, you will get permission for
          the desired datasets. You will receive an email notification at the 
          email address you provided in the form.
          <br />
          <strong>
            Note: The GHGA Data Portal is not responsible for data accession
          </strong>
        </p>
      </div>
      <div>
        <h5 className="mb-3 fw-bold">Additional Information:</h5>
        <p className="mb-0">Requesting Multiple Datasets:</p>
        <ul>
          <li>
            If you are interested in multiple datasets, whether for the same or 
            different use cases, please send a separate email for each dataset 
            and each use case.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Download;
