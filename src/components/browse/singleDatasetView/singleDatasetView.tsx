import { useEffect, useState } from "react";
import {
  Container,
  Spinner,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getDatasetDetails } from "../../../api/browse";
import { datasetEmbeddedModel } from "../../../models/dataset";
import SingleDatasetViewAccordion from "./singleDatasetViewAccordion/singleDatasetViewAccordion";
import SingleDatasetViewSummary from "./singleDatasetViewSummary";
import SingleDatasetViewTabs from "./singleDatasetViewTabs/singleDatasetViewTabs";

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

  return (
    <Container className="py-4">
      {details && details !== null ? (
        <>
          <SingleDatasetViewSummary details={details}/>
          <SingleDatasetViewTabs details={details}/>
          <SingleDatasetViewAccordion details={details}/>

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
