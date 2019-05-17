import React, {Component} from 'react';
import {connect} from 'react-redux';
import NameSuggestion from './NameSuggestion';
import TypeSuggestion from './TypeSuggestion';
import {Grid, Container} from 'semantic-ui-react';
import GridBreweries from './GridBreweries';
import {slide as Menu} from 'react-burger-menu';
import {searchBreweriesByType, getNYCBreweries} from '../actions/HandleAPIs';
import ListBreweries from './ListBreweries';
import MapBreweries from '../components/MapBreweries';
import {RenderBrewery} from '../components/RenderBrewery';

class GetBreweries extends Component {
  constructor () {
    super();
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
    this.searchByType = this.searchByType.bind(this);
    this.setBreweryOnNameSuggestion = this.setBreweryOnNameSuggestion.bind(this);
  }

  async componentDidMount() {
    await this.props.getNYCBreweries();
    this.setState({breweries: this.props.breweries})
  }

  handleStateChange = (state) => {
    this.setState({menuOpen: state.isOpen})
  }

  toggleSearchName = () => {
    this.setState({byName: true, byType: false, menuOpen: false})
  }

  toggleSearchType = () => {
    this.setState({byName: false, byType: true, menuOpen: false})
  }

  async searchByType(type) {
    await this.props.searchBreweriesByType(type);
    this.setState({brewery: null, breweries: this.props.breweries, byList: true, byMap: false, byGrid: false})
  }

  async setBreweryOnNameSuggestion(brewery){
    await this.props.setBrewery(brewery)
    const {breweryByName} = this.props
    this.setState({brewery: breweryByName, byMap: false, byList: false, byGrid: false})
  }

  getBreweryOnClick = (id) => {
    const place = this.state.breweries.find(place => place.id === id)
    this.setState({brewery: place})
  }

  getMap = () => {
    this.setState({brewery: null, byMap: true, byList: false, byGrid: false, byName: false, byType: false, menuOpen: false})
  }

  getList = () => {
    this.setState({brewery: null, byList: true, byGrid: false, byMap: false, byName: false, byType: false, menuOpen: false})
  }

  getGrid = () => {
    this.setState({brewery: null, byGrid: true, byMap: false, byList: false, byName: false, byType: false, menuOpen: false})
  }

  render() {
    return (
      <div id='outer-container'>
        <div>
          <Menu disableAutoFocus isOpen={this.state.menuOpen} onStateChange={(state) => this.handleStateChange(state)}>
            <span onClick={this.getGrid} className='menu-item fa fa-fw fa-star-o'><strong>Breweries Grid</strong></span>
            <span onClick={this.getList} className='menu-item'><strong>Breweries List</strong></span>
            <span onClick={this.getMap} className='menu-item'><strong>Breweries Map</strong></span>
            <span onClick={this.toggleSearchName} className='menu-item'><strong>Breweries by name</strong></span>
            <span onClick={this.toggleSearchType} className='menu-item'><strong>Breweries by type</strong></span>
          </Menu>
        </div>
        <Container id='listBreweries'>
          <Grid>
            <Grid.Row textAlign='center' className='searchPage' >
              <Grid.Column className='btns'>
                {this.state.byName && <NameSuggestion setBrewery={this.setBreweryOnNameSuggestion} />}
                {this.state.byType && <TypeSuggestion searchByType={this.searchByType} />}
              </Grid.Column>
            </Grid.Row>
            { this.state.byMap &&
              <MapBreweries breweries={this.state.breweries} />
            }
            <Grid.Row centered className='br-row'>
              <Grid.Column width={16}>
                {this.state.brewery &&
                  <RenderBrewery brewery={this.state.brewery} />
                }
                {this.state.byGrid &&
                  <GridBreweries breweries={this.state.breweries} />
                }
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


const mapStateToProps = state => {
  return {
    breweries: state.breweries,
    breweryByName: state.breweryByName
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getNYCBreweries: () => dispatch(getNYCBreweries()),
    searchBreweriesByType: type => dispatch(searchBreweriesByType(type)),
    setBrewery: brewery => dispatch({type: 'SET_BREWERY', payload: brewery})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GetBreweries);
