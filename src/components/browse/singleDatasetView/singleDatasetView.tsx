import {
  faCalendar,
  faCopy,
  faFileLines,
} from "@fortawesome/free-regular-svg-icons";
import {
  faChartSimple,
  faChartPie,
  faBookOpen,
  faUsersRays,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import {
  Accordion,
  Badge,
  Col,
  Container,
  Nav,
  Row,
  Spinner,
  Tab,
  Table,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getDatasetDetails } from "../../../api/browse";
import { datasetEmbeddedModel } from "../../../models/dataset";
import { getDACEmailId, parseBytes } from "../../../utils/utils";

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

  let fileSize = 0;

  return (
    <Container className="py-4">
      {details && details !== null ? (
        <>
          <h5>
            <strong>{details.title}</strong>
          </h5>
          <p>
            Dataset ID | {details.accession}
            <FontAwesomeIcon
              icon={faCopy}
              transform="up-6 shrink-3"
              className="ms-1 text-secondary"
            />
          </p>
          <p className="fs-7">
            <span className="me-3">
              Study Type |{" "}
              {details.has_study.map((x) => {
                return (
                  <Badge
                    key={x.type}
                    className="py-1 px-2 fw-normal text-capitalize me-2"
                  >
                    {x.type}
                  </Badge>
                );
              })}
            </span>
            {details.has_attribute.length > 0 ? (
              details.has_attribute.map((x) => {
                return (
                  <span key={x.value + "span"}>
                    Centre name:{" "}
                    <strong key={x.value + "strong"}>{x.value}</strong>
                  </span>
                );
              })
            ) : (
              <></>
            )}
          </p>
          <Row className="fs-7">
            <Col>
              <strong>
                <FontAwesomeIcon
                  icon={faFileLines}
                  className="text-secondary me-2"
                />
                Description
              </strong>
            </Col>
            <Col className="text-end">
              <Badge className="py-1 px-2 fw-normal">
                Status:{" "}
                <span className="text-capitalize">
                  {details.release_status}
                </span>
              </Badge>
            </Col>
          </Row>
          <Row className="fs-8 my-2 border border-1 border-dark border-end-0 border-start-0 pt-2 pb-3">
            <Col>{details.description}</Col>
          </Row>
          <Row className="fs-8 mb-4">
            <Col className="text-end">
              <FontAwesomeIcon
                icon={faCalendar}
                transform="up-1"
                className="me-1"
              />
              {details.release_date !== null ? (
                <>{details.release_date.split("T")[0]} Accession date</>
              ) : details.update_date !== null ? (
                <>{details.update_date.split("T")[0]} Update date</>
              ) : (
                <>{details.creation_date.split("T")[0]} Creation date</>
              )}
            </Col>
          </Row>
          <Container className="mb-5">
            <Tab.Container defaultActiveKey="tabs0">
              <Nav variant="pills" className="justify-content-center mb-2">
                <Nav.Item>
                  <Nav.Link
                    eventKey="tabs0"
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
                    eventKey="tabs1"
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
                    eventKey="tabs2"
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
                    eventKey="tabs3"
                    className="border border-1 mx-2 border-light"
                  >
                    <FontAwesomeIcon
                      icon={faUsersRays}
                      className="text-secondary me-2"
                    />
                    DAC
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Container className="mb-5 border border-1 rounded p-3">
                <Tab.Content className="mb-4">
                  <Tab.Pane eventKey="tabs0">
                    {details.has_study.map((x) => {
                      return (
                        <div key={x.id}>
                          <h5 className="mb-4">
                            <FontAwesomeIcon
                              icon={faChartPie}
                              pull="left"
                              className="text-secondary me-3 fs-4"
                            />
                            <strong>Study</strong>
                          </h5>
                          <p className="mb-4">
                            <strong>Title: </strong>
                            {x.title}
                          </p>
                          <p className="mb-4">
                            <strong>Type: </strong>
                            <span className="text-capitalize">{x.type}</span>
                          </p>
                          <p className="fs-7">
                            {x.has_attribute.find(
                              (x) => x.key === "centerName"
                            ) ? (
                              <>
                                <strong>Affiliation: </strong>
                                {
                                  x.has_attribute.find(
                                    (x) => x.key === "centerName"
                                  )?.value
                                }
                              </>
                            ) : (
                              <></>
                            )}
                          </p>
                          <p className="fs-7">
                            <strong>Description: </strong>
                            {details.description}
                          </p>
                        </div>
                      );
                    })}
                  </Tab.Pane>
                  <Tab.Pane eventKey="tabs1">
                    {details.has_study?.map((x) => {
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
                            <strong>Project ID: </strong>
                            {x.has_project.id}
                          </p>
                          <p>
                            <strong>Title: </strong>
                            {x.has_project.title}
                          </p>
                          <div>
                            <p className="mb-3">
                              <strong>Attributes:</strong>
                            </p>
                            <Container className="ms-5 w-50">
                              <Row className="mb-2">
                                <Col>
                                  {x.has_project.has_attribute?.find(
                                    (x) => x.key === "centerName"
                                  ) ? (
                                    <>
                                      <strong>Affiliation: </strong>
                                      {
                                        x.has_project.has_attribute.find(
                                          (x) => x.key === "centerName"
                                        )?.value
                                      }
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </Col>
                              </Row>
                            </Container>
                          </div>
                        </div>
                      ) : (
                        <></>
                      );
                    })}
                  </Tab.Pane>
                  <Tab.Pane eventKey="tabs2">
                    {details.has_publication &&
                    details.has_publication !== null ? (
                      details.has_publication.map((x) => {
                        return (
                          <>
                            <h5 className="mb-4">
                              <FontAwesomeIcon
                                icon={faBookOpen}
                                pull="left"
                                className="text-secondary me-3 fs-4"
                              />
                              <strong>Publication</strong>
                            </h5>
                            <p>
                              <strong>ID: </strong>
                              {x.id}
                            </p>
                            <p>
                              <strong>Title: </strong>
                              {x.title}
                            </p>
                            <p className="fs-7">
                              <strong>Abstract: </strong>
                              {x.abstract}
                            </p>
                          </>
                        );
                      })
                    ) : (
                      <>
                        <h5 className="mb-4">
                          <FontAwesomeIcon
                            icon={faBookOpen}
                            pull="left"
                            className="text-secondary me-3 fs-4"
                          />
                          <strong>Publication</strong>
                        </h5>
                        <p>No publications found.</p>
                      </>
                    )}
                  </Tab.Pane>
                  <Tab.Pane eventKey="tabs3">
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
                      {details.has_data_access_policy.policy_text}
                    </p>
                    <p>
                      <strong>Data Access Committee: </strong>
                      {
                        details.has_data_access_policy.has_data_access_committee
                          .name
                      }
                    </p>
                    <p>
                      <strong>e-Mail: </strong>
                      {getDACEmailId(details)}
                    </p>
                  </Tab.Pane>
                </Tab.Content>
              </Container>
            </Tab.Container>
          </Container>

          <Accordion>
            <Accordion.Item className="mb-4" eventKey="0">
              <Accordion.Button className="bg-secondary py-2 text-white rounded-0">
                Experiment Summary
              </Accordion.Button>
              <Accordion.Body className="pt-4">
                <Table bordered hover className="fs-8" size="sm">
                  <thead>
                    <tr>
                      <th className="fs-7 w-25">Experiment</th>
                      <th className="w-25">Experiment ID</th>
                      <th>Alias</th>
                    </tr>
                  </thead>
                  <tbody>
                    {details.has_experiment.map((x) => {
                      return (
                        <tr>
                          <td>
                            {x.title}
                            <br />
                            <span className="fs-9 text-muted">
                              {x.description}
                            </span>
                          </td>
                          <td>{x.accession}</td>
                          <td>{x.alias}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item className="mb-4" eventKey="1">
              <Accordion.Button className="bg-secondary py-2 text-white rounded-0">
                Sample Summary
              </Accordion.Button>
              <Accordion.Body className="pt-4">
                <Table bordered hover className="fs-8" size="sm">
                  <thead>
                    <tr>
                      <th className="fs-7 w-25">Sample</th>
                      <th className="w-25">Sample ID</th>
                      <th>Alias</th>
                    </tr>
                  </thead>
                  <tbody>
                    {details.has_sample.map((x) => {
                      return (
                        <tr>
                          <td>
                            {x.name}
                            <br />
                            <span className="fs-9 text-muted">
                              {x.description}
                            </span>
                          </td>
                          <td>{x.accession}</td>
                          <td>{x.alias}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item className="mb-4" eventKey="2">
              <Accordion.Button className="bg-secondary py-2 text-white rounded-0">
                File Summary ({details.has_file.length} files, ZZZ BAM,{" "}
                {details.has_file.map((x) => {
                  fileSize = fileSize + x.size; return(<></>)
                })}{parseBytes(fileSize)})
              </Accordion.Button>
              <Accordion.Body className="pt-4">
                <Table bordered hover className="fs-8" size="sm">
                  <thead>
                    <tr>
                      <th className="fs-7 w-25">File</th>
                      <th className="w-25">File ID</th>
                      <th>Alias</th>
                    </tr>
                  </thead>
                  <tbody>
                    {details.has_file.map((x) => {
                      return (
                        <tr>
                          <td>{x.name}</td>
                          <td>{x.accession}</td>
                          <td>{x.alias}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
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
