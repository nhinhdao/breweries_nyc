import React, {Component} from 'react';
import times from 'lodash.times';
import {List, Header, Icon, Menu, Tab, Divider} from 'semantic-ui-react';
import {RenderBrewery} from '../components/RenderBrewery';

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
    const TOTAL_PER_PAGE = 7;
    const {page} = this.state;
    const {breweries} = this.props;
    const startIndex = page * TOTAL_PER_PAGE;
    const totalPages = Math.ceil(breweries.length / TOTAL_PER_PAGE);
    const panes = breweries.slice(startIndex, startIndex + TOTAL_PER_PAGE).map(brewery => (
      {
        menuItem: (
          <Menu.Item key={brewery.id}>
            <List divided animated verticalAlign='middle'>
              <List.Item>
                <List.Content id='list-data'>
                  <Header as='h4' id='list-header'>{brewery.name}</Header>
                  <List.Description><Icon name='caret right' size='tiny' /> Type: {brewery.brewery_type}</List.Description>
                  <List.Description><Icon name='caret right' size='tiny' /> {brewery.address}</List.Description>
                </List.Content>
              </List.Item>
            </List>
          </Menu.Item>
        ),
        pane: (
          <Tab.Pane key={brewery.id} id='br-list' style={{fontSize: '1em'}}>
            <RenderBrewery brewery={brewery} />
          </Tab.Pane>
        )
      })
    )
    return (
      <div>
        <Header as='h2' icon textAlign='center'>
          <Icon name='list alternate outline' color='blue' />
          <Header.Content>NEW YORK BREWERIES LIST</Header.Content>
        </Header>
        <Divider />
        <Tab menu={{fluid: true, vertical: true}} panes={panes} renderActiveOnly={false} />
        { breweries.length > TOTAL_PER_PAGE &&
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
        }
      </div>
    )
  }
}

export default ListBreweries;