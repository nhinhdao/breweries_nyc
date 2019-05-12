import React, { Component } from 'react'
import {List, Header, Segment, Icon} from 'semantic-ui-react';

class ListBreweries extends Component {

  render() {
    return (
      <Segment className='listPlaces'>
        <List divided animated verticalAlign='middle' id='listData'>
          {this.props.breweries.map(place =>
            <List.Item key={place.id}>
              <List.Content onClick={() => this.props.getBrewery(place.id)}>
                <Header as='h4' color='blue'>{place.name}</Header>
                <List.Description><Icon name='tag' /> {place.brewery_type}</List.Description>
                <List.Description><Icon name='map marker alternate' /> {place.address}</List.Description>
              </List.Content>
              <List.Content><Icon name='linkify' /><a href={`${place.website_url}`}> {place.website_url}</a></List.Content>
            </List.Item>
          )}
        </List>
      </Segment>
    )
  }
}

export default ListBreweries;