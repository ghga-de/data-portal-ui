import {
  faArrowTurnUp,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getDatasetDetails } from "../../../api/browse";
import { DatasetEmbeddedModel } from "../../../models/dataset";
import DataRequestFormModal from "../../../utils/dataRequestFormModal";
import SingleDatasetViewAccordion from "./singleDatasetViewAccordion/singleDatasetViewAccordion";
import SingleDatasetViewSummary from "./singleDatasetViewSummary/singleDatasetViewSummary";
import SingleDatasetViewTabs from "./singleDatasetViewTabs/singleDatasetViewTabs";
import RequestAccessButton from "../../../utils/requestAccessButton";

/** Single dataset details page */
const SingleDatasetView = () => {
  let accessionId: string | null | undefined = null;
  const { id } = useParams();
  accessionId = id;

  const location = useLocation();

  let paramId: string = location.pathname.split("/")[2];

  const [queried, setQueried] = useState<boolean>(false);

  const [details, setDetails] = useState<
    DatasetEmbeddedModel | null | undefined
  >(undefined);

  useEffect(() => {
    const getDetails = (datasetAccession: string) => {
      if (!queried) {
        setQueried(true);
        getDatasetDetails(datasetAccession, setDetails);
        if (details === undefined) {
          setDetails(null);
        }
      }
    };
    if (!queried) {
      getDetails(paramId!);
    }
  }, [paramId, details, queried]);

  const [show, setShow] = useState(false);
  const [copyEmail, setCopyEmail] = useState<string>("helpdesk@ghga.de");
  const handleClose = () => setShow(false);

  var dacFormLink: string | null = null;

  let navigate = useNavigate();

  const handleOpen = () => {
    setCopyEmail(
      details !== null && details
        ? details.data_access_policy.data_access_committee.email
        : "helpdesk@ghga.de"
    );
    setShow(true);
  };

  return (
    <div className="py-2 py-sm-4 mx-auto px-2 px-sm-5">
      {details === undefined ? (
        <div className="fs-5">
          <Spinner animation="border" variant="primary" size="sm" />
          &nbsp;Dataset details loading, please wait...
        </div>
      ) : details === null ? (
        <div className="fs-4 fw-bold">
          <FontAwesomeIcon icon={faCircleExclamation} className="text-danger" />
          &nbsp; Error loading dataset details!
        </div>
      ) : (
        <>
          <Row className="justify-content-between w-100">
            <Col className="pe-0" xs={"auto"}>
              <Button
                onClick={() =>
                  navigate.length <= 2 ? navigate("/browse") : navigate(-1)
                }
                variant="white"
                className="text-secondary mb-3"
              >
                <FontAwesomeIcon
                  icon={faArrowTurnUp}
                  transform="rotate-270 grow-10 flip-v"
                />
              </Button>
            </Col>
            <Col className="px-0">
              <RequestAccessButton
                accession={accessionId!}
                handleOpen={handleOpen}
                classes="float-end ms-2 ms-sm-4 "
              />
            </Col>
          </Row>
          <DataRequestFormModal
            accession={details.accession}
            copyEmail={copyEmail}
            show={show}
            handleClose={handleClose}
            dacFormLink={dacFormLink}
          />
          <SingleDatasetViewSummary details={details} />
          <SingleDatasetViewTabs details={details} />
          <SingleDatasetViewAccordion details={details} />
        </>
      )}
    </div>
  );
};

export default SingleDatasetView;
