import { faArrowTurnUp, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getDatasetDetails } from "../../../api/browse";
import { datasetEmbeddedModel } from "../../../models/dataset";
import SingleDatasetViewAccordion from "./singleDatasetViewAccordion/singleDatasetViewAccordion";
import SingleDatasetViewSummary from "./singleDatasetViewSummary/singleDatasetViewSummary";
import SingleDatasetViewTabs from "./singleDatasetViewTabs/singleDatasetViewTabs";
import { useNavigate } from "react-router-dom";
import DataRequestModal from "../dataset/datasetAccordion/datasetSummary/dataRequestModal/dataRequestModal";
import { getDACEmailId } from "../../../utils/utils";

const SingleDatasetView = (props: any) => {
  const { id } = useParams();
  let datasetId = "";
  if (id) {
    datasetId = id;
  }

  const [queried, setQueried] = useState<boolean>(false);

  const [details, setDetails] = useState<
    datasetEmbeddedModel | null | undefined
  >(null);

  const [show, setShow] = useState(false);
  const [copyEmail, setCopyEmail] = useState<string>("helpdesk@ghga.de");
  const handleClose = () => setShow(false);

  var dacFormLink: string | null = null;

  let navigate = useNavigate();

  useEffect(() => {
    const getDetails = (datasetId: string) => {
      if (!queried && datasetId) {
        getDatasetDetails(datasetId, true, setDetails);
        setQueried(false);
      }
    };
    getDetails(datasetId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datasetId]);

  const handleOpen = () => {
    setCopyEmail(details !== null && details ? getDACEmailId(details) : "helpdesk@ghga.de");
    setShow(true);
  };

  return (
    <Container className="py-4">
      {details && details !== null ? (
        <>
          <Button onClick={() => navigate.length <= 2 ? navigate('/browse') : navigate(-1)} variant="white" className="text-secondary mb-3"><FontAwesomeIcon icon={faArrowTurnUp} transform="rotate-270 grow-10 flip-v" /></Button>
          <Button
            className="fs-8 float-end mb-3 ms-4 text-white shadow-md-dark"
            variant="secondary"
            onClick={() => handleOpen()}
            style={{ width: "105px" }}
          >
            <Row className="p-0 m-0 align-items-center">
              <Col className="p-0 m-0 col-3 ">
                <FontAwesomeIcon icon={faKey} />
              </Col>
              <Col className="p-0 m-0 lh-1">
                <strong>Request Access</strong>
              </Col>
            </Row>
          </Button>
          <DataRequestModal
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
      ) : (
        <div>
          <Spinner animation="border" variant="primary" size="sm" />
          &nbsp;Dataset details loading, please wait...
        </div>
      )}
    </Container>
  );
};

export default SingleDatasetView;
