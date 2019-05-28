import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import NameSuggestion from './NameSuggestion';
import TypeSuggestion from './TypeSuggestion';
import {Grid, Container} from 'semantic-ui-react';
import GridBreweries from './GridBreweries';
import {slide as Menu} from 'react-burger-menu';
import ListBreweries from './ListBreweries';
import MapBreweries from '../components/MapBreweries';
import {RenderBrewery} from '../components/RenderBrewery';
import {searchBreweriesByType, getNYCBreweries} from '../actions/HandleAPIs';

//Center component handled display breweries based on actions on burger bar
class Breweries extends Component {
  constructor (props) {
    super(props);
    this.mounted = true;
    this.state = {
      breweries: [],
      brewery: null,
      byName: false,
      byType: false,
      byList: false,
      byMap: false,
      byGrid: true,
      menuOpen: false,
    };
  }

  // get all nyc breweries when component mounted
  componentDidMount() {
    this.mounted = true;
    this.NYCbreweries = this.props.breweries;
    this.setState({
      breweries: this.props.breweries
    });
  }

  //handle open or close burger bar
  handleStateChange = (state) => {
    this.setState({
      menuOpen: state.isOpen
    })
  }

  // toggle search box for name
  toggleSearchName = () => {
    this.setState({
      byName: true,
      byType: false,
      menuOpen: false
    })
  }

  // toggle search box for type
  toggleSearchType = () => {
    this.setState({
      byName: false,
      byType: true,
      menuOpen: false
    })
  }

  //handle search by type
  searchByType = async(type) => {
    await this.props.searchBreweriesByType(type);
    this.setState({
      brewery: null,
      breweries: this.props.breweries,
      byList: true,
      byMap: false,
      byGrid: false
    })
  }

  //show name suggestion 
  setBreweryOnNameSuggestion = async(brewery) => {
    await this.props.setBrewery(brewery)
    const {breweryByName} = this.props
    this.setState({
      brewery: breweryByName,
      breweries: this.NYCbreweries,
      byMap: false,
      byList: false,
      byGrid: false
    })
  }

  // get brewery when user click on a name
  getBreweryOnClick = (id) => {
    const place = this.state.breweries.find(place => place.id === id)
    this.setState({
      brewery: place
    })
  }

  // render all breweries by map
  getMap = () => {
    this.setState({
      brewery: null,
      byMap: true,
      byList: false,
      byGrid: false,
      byName: false,
      byType: false,
      menuOpen: false
    })
  }

  // handle all breweries by list
  getList = () => {
    this.setState({
      brewery: null,
      byList: true,
      byGrid: false,
      byMap: false,
      byName: false,
      byType: false,
      menuOpen: false
    })
  }

  // handle all breweries by grid
  getGrid = () => {
    this.setState({
      brewery: null,
      byGrid: true,
      byMap: false,
      byList: false,
      byName: false,
      byType: false,
      menuOpen: false
    })
  }

  render() {
    return (
      <div id='outer-container'>
        {/* burger bar */}
        <div>
          <Menu disableAutoFocus isOpen={this.state.menuOpen} onStateChange={(state) => this.handleStateChange(state)}>
            <h2 className='barHeader'><Link to='/'>HOME</Link></h2>
            <h2 className='barHeader'>BREWERIES</h2>
            <span onClick={this.getGrid} className='menu-item grid'><strong>Grid</strong></span>
            <span onClick={this.getList} className='menu-item list'><strong>List</strong></span>
            <span onClick={this.getMap} className='menu-item map'><strong>Map</strong></span>
            <h2 className='barHeader'>SEARCH</h2>
            <span onClick={this.toggleSearchName} className='menu-item name'><strong>Name</strong></span>
            <span onClick={this.toggleSearchType} className='menu-item type'><strong>Type</strong></span>
          </Menu>
        </div>
        <Container id='listBreweries'>
          <Grid>
            <Grid.Row textAlign='center' className='searchPage' >
              {/* search box show off for name or type */}
              <Grid.Column className='btns'>
                { this.state.byName &&
                  <NameSuggestion setBrewery={this.setBreweryOnNameSuggestion} />
                }
                {this.state.byType &&
                  <TypeSuggestion searchByType={this.searchByType} />
                }
              </Grid.Column>
            </Grid.Row>
              {/* display breweries by map */}
              { this.state.byMap &&
                <MapBreweries breweries={this.state.breweries} />
              }
            <Grid.Row centered stretched id='br-search'>
              <Grid.Column width={16}>
                {/* display brewery when user search for name */}
                {this.state.brewery &&
                  <RenderBrewery brewery={this.state.brewery} />
                }
                {/* display breweries by grid */}
                {this.state.byGrid &&
                  <GridBreweries breweries={this.state.breweries} />
                }
                {/* display breweries by list */}
                {this.state.byList &&
                  <ListBreweries breweries={this.state.breweries} />
                }
                </Grid.Column>
              </Grid.Row>
          </Grid>
        </Container>
      </div>
    )
  }
}

//access global store
const mapStateToProps = state => {
  return {
    breweries: state.breweries,
    breweryByName: state.breweryByName
  }
}

//access dispatch functions to update store
const mapDispatchToProps = dispatch => {
  return {
    getNYCBreweries: () => dispatch(getNYCBreweries()),
    searchBreweriesByType: type => dispatch(searchBreweriesByType(type)),
    setBrewery: brewery => dispatch({type: 'SET_BREWERY', payload: brewery})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Breweries);
