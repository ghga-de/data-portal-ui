import { faUsersRays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tab } from "react-bootstrap";
import { datasetEmbeddedModel } from "../../../../models/dataset";
import { getDACEmailId } from "../../../../utils/utils";

interface DapTabContentsProps {
  details: datasetEmbeddedModel;
}

const DapTabContents = (props: DapTabContentsProps) => {
  return (
    <Tab.Pane eventKey="3">
      <h5 className="mb-4">
        <FontAwesomeIcon
          icon={faUsersRays}
          pull="left"
          className="text-secondary me-3 fs-4"
        />
        <strong>Policy and Data Access Committee</strong>
      </h5>
      <p>
        <strong>Policy: </strong>
        {props.details.has_data_access_policy.policy_text}
      </p>
      <p>
        <strong>Data Access Committee: </strong>
        {props.details.has_data_access_policy.has_data_access_committee.name}
      </p>
      <p>
        <strong>e-Mail: </strong>
        {getDACEmailId(props.details)}
      </p>
    </Tab.Pane>
  );
};

export default DapTabContents;
