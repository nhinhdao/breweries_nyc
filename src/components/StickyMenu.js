import React, {Component} from 'react';
import {connect} from 'react-redux';
import logo from '../logo.svg';
import {withRouter} from 'react-router-dom';
import {Container} from 'semantic-ui-react';
import {getNYCBreweries, searchBreweriesByType} from '../actions/HandleAPIs';
import {Menu, Dropdown} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import NameSuggestion from '../containers/NameSuggestion';
import TypeSuggestion from '../containers/TypeSuggestion';

class StickyMenu extends Component {

  constructor () {
    super();
    this.state = {
      byName: false,
      byType: false,
    };
    this.setBrewery = this.setBrewery.bind(this);
  }

  toggleSearchName = () => {
    this.setState({byName: true, byType: false})
  }

  toggleSearchType = () => {
    this.setState({byName: false, byType: true})
  }

  searchByType = (type) => {
    this.props.searchBreweriesByType(type);
  }

  async setBrewery(brewery) {
    await this.props.setBrewery(brewery);
    const id = this.props.breweries[0].id;
    this.props.history.push(`/breweries/grid/${id}`);
  }

  render() {
    return (
      <Menu>
        <Container fluid className='btns'>
          <Link to='/'>
            <Menu.Item header>
              <img src={logo} className="App-logo" alt="logo" />
              NEW YORK BREWERIES
            </Menu.Item>
          </Link>
          <Dropdown item text='View Breweries'>
            <Dropdown.Menu>
              <Link to='/breweries'><Dropdown.Item>Breweries by map</Dropdown.Item></Link>
              <Link to='/breweries/grid'><Dropdown.Item>Breweries by grid</Dropdown.Item></Link>
              <Link to='/breweries/list'><Dropdown.Item>Breweries by list</Dropdown.Item></Link>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown item text='Search Breweries'>
            <Dropdown.Menu>
              <Dropdown.Item onClick={this.toggleSearchName}>Search by name</Dropdown.Item>
              <Dropdown.Item onClick={this.toggleSearchType}>Search by type</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {this.state.byName && <NameSuggestion setBrewery={this.setBrewery} />}
          {this.state.byType && <TypeSuggestion searchByType={this.searchByType} />}
        </Container>
      </Menu>
    )
  }
}

const mapStateToProps = state => {
  return {
    breweries: state.breweries,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    searchBreweriesByType: type => dispatch(searchBreweriesByType(type)),
    setBrewery: brewery => dispatch({type: 'SET_BREWERY', payload: brewery}),
    getNYCBreweries: () => dispatch(getNYCBreweries()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StickyMenu));
