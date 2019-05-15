import React, {Component} from 'react';
import times from 'lodash.times';
import Brewery from './Brewery';
import {List, Header, Segment, Icon, Menu, Tab} from 'semantic-ui-react';

class Testlist extends Component {

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
    const TOTAL_PER_PAGE = 7;
    const {page} = this.state;
    const {breweries} = this.props;
    const startIndex = page * TOTAL_PER_PAGE;
    const totalPages = Math.ceil(breweries.length / TOTAL_PER_PAGE);
    const panes = breweries.slice(startIndex, startIndex + TOTAL_PER_PAGE).map(place => (
      {
        menuItem: (
          <Menu.Item key={place.id}>
          <List divided animated verticalAlign='middle'>
            <List.Item>
              <List.Content id='list-data'>
                <Header as='h4' id='list-header'>{place.name}</Header>
                <List.Description><Icon name='caret right' size='tiny' /> Type: {place.brewery_type}</List.Description>
                <List.Description><Icon name='caret right' size='tiny' /> {place.address}</List.Description>
              </List.Content>
              <List.Content><Icon name='caret right' size='tiny' /><a href={`${place.website_url}`} target="_blank" rel="noopener noreferrer"> {place.website_url}</a></List.Content>
            </List.Item>
            </List>
          </Menu.Item>
        ),
        pane: (
          <Tab.Pane key={place.id}>
            <Brewery brewery={place} />
          </Tab.Pane>
        )
      })
    )
    return (
      <Segment color='teal'>
        <Tab menu={{fluid: true, vertical: true, tabular: true}} panes={panes} renderActiveOnly={false} />
        <Menu pagination size='tiny'>
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
      </Segment>
    )
  }
}

export default Testlist;