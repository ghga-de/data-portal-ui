import React from 'react';
import { Accordion } from 'react-bootstrap';
import { hitModel, datasetModel } from '../../../models/dataset';
import { getDatasetDetails } from '../../../api/browse'

interface dataSetListProps {
    dsList: hitModel[];
};

const Dataset = (props: dataSetListProps) => {

    return (
        <div>
            <Accordion alwaysOpen className="mb-3">
                {
                    props.dsList.map((hit, index) => (
                        <Accordion.Item eventKey={index.toString()} className="mb-3 border border-1 rounded">
                            <Accordion.Button className='bg-light align-items-start'>
                                Dataset ID:&nbsp;
                                {hit.id}
                                <br />
                                Title:&nbsp;
                                {hit.content.title}
                            </Accordion.Button>
                            <Accordion.Body>
                                Description: <br/>
                                {hit.content.description}
                            </Accordion.Body>
                        </Accordion.Item>
                    ))
                }
            </Accordion>
        </div>
    )
}

export default Dataset;
