import React, {Component} from 'react';
import times from 'lodash.times';
import {Card, Menu, Icon, Segment, Divider, Header} from 'semantic-ui-react';
import {RenderSummary} from '../components/RenderBrewery';

export class GridBreweries extends Component {
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
    const {breweries} = this.props;
    const startIndex = page * TOTAL_PER_PAGE;
    const totalPages = Math.ceil(breweries.length / TOTAL_PER_PAGE);
    return (
      <Segment basic>
        <Header as='h2' icon textAlign='center'>
          <Icon name='grid layout' color='blue' />
          <Header.Content>NEW YORK BREWERIES GRID</Header.Content>
        </Header>
        <Divider />
        <Card.Group itemsPerRow={3}>
          {breweries.slice(startIndex, startIndex + TOTAL_PER_PAGE).map(brewery =>
            <RenderSummary brewery={brewery} key={brewery.id}/>
          )}
        </Card.Group>
        <Divider hidden />
        { breweries.length > TOTAL_PER_PAGE &&
          <Menu floated="right" pagination size='tiny'>
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

export default GridBreweries;
