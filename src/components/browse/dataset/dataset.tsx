import React from 'react';
import { Accordion, Row, Col, Badge } from 'react-bootstrap';
import { hitModel } from '../../../models/dataset';
import { BoxArrowUpRight } from 'react-bootstrap-icons'

interface dataSetListProps {
    dsList: hitModel[];
};

const Dataset = (props: dataSetListProps) => {

    return (
        <div>
            <Accordion alwaysOpen className="mb-3 fs-7">
                {
                    props.dsList.map((hit, index) => (
                        <Accordion.Item key={index} eventKey={index.toString()} className="mb-3 border border-1 rounded">
                            <Accordion.Button className='bg-light align-items-start fs-7'>
                                <p className="my-0">
                                    <span className="fw-bold">Dataset ID:&nbsp;</span>
                                    <a href="#action" title={hit.id}>{hit.id} <sup className="text-dark"><BoxArrowUpRight /></sup></a>

                                    <br />
                                    <span className="fw-bold">Title: </span>
                                    {hit.content.title}
                                </p>
                            </Accordion.Button>
                            <Accordion.Body>
                                <p className="my-0">
                                    <span className="fw-bold">Description:&nbsp;</span>

                                    {hit.content.description}
                                </p>
                                <hr />
                                <Row>
                                    <Col xs md lg={8}>
                                        <Row className="mb-2">
                                            <Col>
                                                <span className="fw-bold">Access:&nbsp;</span>
                                            </Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col>
                                                <span className="fw-bold">Number of samples:&nbsp;</span>
                                            </Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col>
                                                <span className="fw-bold">Technology:&nbsp;</span>
                                            </Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col>
                                                <span className="fw-bold">Center:&nbsp;</span>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Badge className="bg-light text-muted text-start w-100 p-2 mb-3">
                                            <p className="my-0">
                                                <span className="fw-bold">Center name:</span>
                                                <br />
                                                &nbsp;
                                                <br />
                                                <span className="fw-bold">DAC title:</span>
                                                <br />
                                                &nbsp;
                                                <br />
                                                <span className="fw-bold">EGA DAC ID:</span>
                                                <br />
                                                &nbsp;
                                                <br />
                                                <span className="fw-bold">Contact:</span>
                                                <br />
                                                &nbsp;
                                                <br />
                                            </p>
                                        </Badge>
                                    </Col>
                                </Row>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))
                }
            </Accordion>
        </div>
    )
}

export default Dataset;
