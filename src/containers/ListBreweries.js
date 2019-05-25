import React from 'react';
import pagination from './Pagination';
import PropTypes from 'prop-types';
import {RenderBrewery, ListSummary} from '../components/RenderBrewery';
import { Header, Icon, Tab, Divider, Menu} from 'semantic-ui-react';

const DisplayList = props => {
  const {breweries, startIndex, perPage} = props;
  // debugger
  const panes = breweries.slice(startIndex, startIndex + perPage).map(brewery => (
    {
      menuItem: (
        <Menu.Item key={brewery.id}>
          <ListSummary brewery={brewery} />
        </Menu.Item>
      ),
      pane: (
        <Tab.Pane key={brewery.id} id='br-list' style={{fontSize: '1em'}}>
          <RenderBrewery brewery={brewery} />
        </Tab.Pane>
      )
    })
  );
  return (
    <div>
      <Header as='h2' icon textAlign='center'>
        <Icon name='list alternate outline' color='teal' />
        <Header.Content className='brs-header'>NEW YORK BREWERIES LIST</Header.Content>
      </Header>
      <Divider hidden />
      <Tab menu={{fluid: true, vertical: true}} panes={panes} grid={{ paneWidth: 10, tabWidth: 6 }} renderActiveOnly={false} />
    </div>
  );
}

DisplayList.propTypes = {
  breweries: PropTypes.array,
  startIndex: PropTypes.number,
  perPage: PropTypes.number
}

const ListBreweries = pagination(DisplayList, 8);

export default ListBreweries; 
