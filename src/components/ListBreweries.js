import React, {Component} from 'react';
import times from 'lodash.times';
import {List, Header, Segment, Icon, Menu} from 'semantic-ui-react';

class ListBreweries extends Component {

  constructor (props) {
    super(props);
    this.state = {
      page: 0
    }
  }
  setPage = (page) => {
    return () => {
      this.setState({page});
    };
  }

  decrementPage = () => {
    const {page} = this.state;
    this.setState({page: page - 1});
  }

  incrementPage = () => {
    const {page} = this.state;
    this.setState({page: page + 1});
  }

  render() {
    const TOTAL_PER_PAGE = 9;
    const {page} = this.state;
    const {breweries, getBrewery} = this.props;
    const startIndex = page * TOTAL_PER_PAGE;
    const totalPages = Math.ceil(breweries.length / TOTAL_PER_PAGE);
    return (
      <Segment className='listPlaces'>
        <List divided animated verticalAlign='middle' id='listData'>
          {breweries.slice(startIndex, startIndex + TOTAL_PER_PAGE).map(place =>
            <List.Item key={place.id}>
              <List.Content onClick={() => getBrewery(place.id)}>
                <Header as='h4' color='blue'>{place.name}</Header>
                <List.Description><Icon name='caret right' size='tiny'/> Type: {place.brewery_type}</List.Description>
                <List.Description><Icon name='caret right' size='tiny'/> {place.address}</List.Description>
              </List.Content>
              <List.Content><Icon name='caret right' size='tiny'/><a href={`${place.website_url}`}> {place.website_url}</a></List.Content>
            </List.Item>
          )}
        </List>
        { breweries.length > TOTAL_PER_PAGE &&
          <Menu floated="right" pagination>
            {page !== 0 &&
              <Menu.Item as="a" icon onClick={this.decrementPage}>
                <Icon name="left chevron" />
              </Menu.Item>
            }
            {times(totalPages, n =>
              (<Menu.Item as="a" key={n} active={n === page} onClick={this.setPage(n)}>
                {n + 1}
              </Menu.Item>),
            )}
            {page !== (totalPages - 1) &&
              <Menu.Item as="a" icon onClick={this.incrementPage}>
                <Icon name="right chevron" />
              </Menu.Item>
            }
          </Menu>
        }
      </Segment>
    )
  }
}

export default ListBreweries;