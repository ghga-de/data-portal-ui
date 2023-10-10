import {
  faArrowTurnUp,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getDatasetDetails, querySearchService } from "../../../api/browse";
import {
  DatasetEmbeddedModel,
  SearchResponseModel,
} from "../../../models/dataset";
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

  let paramId: string | null | undefined = null;

  const [searchResults, setSearchResults] =
    useState<SearchResponseModel | null>(null);
  const [queried, setQueried] = useState<boolean>(false);

  const [details, setDetails] = useState<DatasetEmbeddedModel | null>(null);

  useEffect(() => {
    const getHits = (accessionId: string | null | undefined, key: string) => {
      if (accessionId && accessionId !== null && !queried) {
        setQueried(true);
        querySearchService(
          setSearchResults,
          [{ key: key, value: accessionId }],
          "*",
          0,
          1,
          "Dataset"
        );
      }
    };
    const getDetails = (datasetAccession: string | undefined) => {
      if (datasetAccession && paramId) {
        getDatasetDetails(datasetAccession, setDetails);
      }
    };
    const processHits = (searchResults: SearchResponseModel | null) => {
      if (searchResults && searchResults !== null && searchResults.count >= 1) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        paramId = searchResults.hits[0].content.accession;
        getDetails(paramId);
      } else if (searchResults?.count === -1) {
        paramId = undefined;
      }
    };
    getHits(accessionId, "ega_accession");
    if (searchResults?.count === 0) {
      getHits(accessionId, "accession");
    }
    processHits(searchResults);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchResults, paramId]);

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
      {searchResults === null ? (
        <div className="fs-5">
          <Spinner animation="border" variant="primary" size="sm" />
          &nbsp;Dataset details loading, please wait...
        </div>
      ) : searchResults.count === -1 ||
        accessionId === undefined ||
        paramId === undefined ? (
        <div className="fs-4 fw-bold">
          <FontAwesomeIcon icon={faCircleExclamation} className="text-danger" />
          &nbsp; Error loading dataset details!
        </div>
      ) : searchResults.count === 0 ? (
        <div className="fs-4 fw-bold">
          <FontAwesomeIcon icon={faCircleExclamation} className="text-danger" />
          &nbsp; Dataset not found!
        </div>
      ) : details === null ? (
        <div className="fs-5">
          <Spinner animation="border" variant="primary" size="sm" />
          &nbsp;Dataset details loading, please wait...
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
