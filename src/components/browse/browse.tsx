import React from 'react';
import DatasetList from './dataset/datasetList'
import { Col, Row, Container } from 'react-bootstrap'
import Sidebar from './sidebar/sidebar';
import { searchResponseModel, hitModel } from '../../models/dataset'
import { facetFilterModel, facetModel } from '../../models/facets'
import { getDatasetsSearchResp } from './browseBackendCalls'

const Browse = () => {
  const [filterDict, setFilterDict] = React.useState<facetFilterModel[]>([]);

  const [searchResults, setSearchResp] = React.useState<searchResponseModel | null>(null);

  React.useEffect(() => getDatasetsSearchResp(setSearchResp, filterDict, "*"), [filterDict])

  var dsList: hitModel[] | null
  var facetList: facetModel[] | null

  dsList = null
  facetList = null

  if (searchResults !== null) {
    if (searchResults.hits.length > 0) {
      dsList = searchResults.hits
      facetList = searchResults.facets
    }
    else {
      dsList = []
      facetList = []
    }
  }

  return (
    <Container>
      <Row>
        <Col xs md lg={3}>
          <Sidebar facetList={facetList} />
        </Col>
        <Col xs md lg={9}>
          <DatasetList dsList={dsList} />
        </Col>
      </Row>
    </Container>
  )
}

export default Browse;
