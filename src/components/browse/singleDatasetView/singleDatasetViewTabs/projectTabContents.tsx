import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tab } from "react-bootstrap";
import { datasetEmbeddedModel } from "../../../../models/dataset";

interface ProjectTabContentsProps {
  details: datasetEmbeddedModel;
}

const ProjectTabContents = (props: ProjectTabContentsProps) => {
  return (
    <Tab.Pane eventKey="1">
      {props.details.has_study?.map((x) => {
        return x.has_project ? (
          <div key={x.id}>
            <h5 className="mb-4">
              <FontAwesomeIcon
                icon={faChartSimple}
                pull="left"
                className="text-secondary me-3 fs-4"
                transform="rotate-180"
              />
              <strong>Project</strong>
            </h5>
            <p>
              <strong>ID: </strong>
              {x.has_project.accession}
            </p>
            <p>
              <strong>Title: </strong>
              {x.has_project.title}
            </p>
            {x.has_project.has_attribute !== null ? (
              <p>
                <strong>Attributes: </strong>
                {x.has_project.has_attribute?.map((x) => {
                  return (
                    <p className="ms-3 mb-1">
                      <strong>{x.key}: </strong>
                      {x.value}
                    </p>
                  );
                })}
              </p>
            ) : (
              <></>
            )}

            <p>
              <strong>Description: </strong>
              {x.has_project.description}
            </p>
          </div>
        ) : (
          <></>
        );
      })}
    </Tab.Pane>
  );
};

export default ProjectTabContents;
