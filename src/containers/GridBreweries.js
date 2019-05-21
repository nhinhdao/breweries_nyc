import React from 'react';
import {Card, Icon, Divider, Header} from 'semantic-ui-react';
import {GridSummary} from '../components/RenderBrewery';
import pagination from './Pagination';

const DisplayGrid = props => {

  const {breweries, startIndex, perPage} = props;

  return (
    <div>
      <Header as='h2' icon textAlign='center'>
        <Icon name='grid layout' color='teal' />
        <Header.Content className='brs-header'>NEW YORK BREWERIES GRID</Header.Content>
      </Header>
      <Divider hidden />
      {/* display breweries by sumary card */}
      <Card.Group itemsPerRow={3} className='cards'>
        {breweries.slice(startIndex, startIndex + perPage).map(brewery =>
          <GridSummary brewery={brewery} key={brewery.id} />
        )}
      </Card.Group>
      <Divider hidden />
    </div>
  )
}

const GridBreweries = pagination(DisplayGrid, 9);
    
export default GridBreweries;
