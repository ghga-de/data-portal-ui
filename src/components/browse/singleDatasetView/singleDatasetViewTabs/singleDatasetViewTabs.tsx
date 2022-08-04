import {
  faBookOpen,
  faChartPie,
  faChartSimple,
  faUsersRays,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Nav, Tab } from "react-bootstrap";
import { datasetEmbeddedModel } from "../../../../models/dataset";
import DapTabContents from "./dapTabContents";
import ProjectTabContents from "./projectTabContents";
import PublicationTabContents from "./publicationTabContents";
import StudyTabContents from "./studyTabContents";

interface SingleDatasetViewTabsProps {
  details: datasetEmbeddedModel;
}

const SingleDatasetViewTabs = (props: SingleDatasetViewTabsProps) => {
  return (
    <Container className="mb-5">
      <Tab.Container defaultActiveKey="0">
        <Nav variant="pills" className="justify-content-center mb-2">
          <Nav.Item>
            <Nav.Link
              eventKey="0"
              className="border border-1 mx-2 border-light"
            >
              <FontAwesomeIcon
                icon={faChartPie}
                className="text-secondary me-2"
              />
              Study
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="1"
              className="border border-1 mx-2 border-light"
            >
              <FontAwesomeIcon
                icon={faChartSimple}
                className="text-secondary me-2"
                transform="rotate-180"
              />
              Project
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="2"
              className="border border-1 mx-2 border-light"
            >
              <FontAwesomeIcon
                icon={faBookOpen}
                className="text-secondary me-2"
              />
              Publication
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="3"
              className="border border-1 mx-2 border-light"
            >
              <FontAwesomeIcon
                icon={faUsersRays}
                className="text-secondary me-2"
              />
              DAP
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Container className="mb-5 border border-1 rounded p-3">
          <Tab.Content className="mb-4">
            <StudyTabContents details={props.details} />
            <ProjectTabContents details={props.details} />
            <PublicationTabContents details={props.details} />
            <DapTabContents details={props.details} />
          </Tab.Content>
        </Container>
      </Tab.Container>
    </Container>
  );
};

export default SingleDatasetViewTabs;
