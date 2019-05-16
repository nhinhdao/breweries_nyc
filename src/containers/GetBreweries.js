import React, {Component} from 'react';
import {connect} from 'react-redux';
import Brewery from '../components/Brewery';
import GoogleMapReact from 'google-map-react';
import NameSuggestion from './NameSuggestion';
import TypeSuggestion from './TypeSuggestion';
import {Grid, Button, Divider, Icon} from 'semantic-ui-react';
import {Marker} from '../components/RenderBrewery';
import GridBreweries from '../components/GridBreweries';
import ListBreweries from '../components/ListBreweries';
import {searchBreweriesByType} from '../actions/HandleAPIs';
import {slide as Menu} from 'react-burger-menu';

class GetBreweries extends Component {
  constructor () {
    super();
    this.state = {
      breweries: [],
      brewery: null,
      byName: false,
      byType: false,
      byList: false,
      byMap: true,
      byGrid: false
    };
    this.searchByType = this.searchByType.bind(this);
    this.setBrewery = this.setBrewery.bind(this);
  }

  componentDidMount() {
    this.setState({breweries: this.props.breweries})
  }

  toggleSearchName = () => {
    this.setState({byName: true, byType:false})
  }

  toggleSearchType = () => {
    this.setState({byName: false, byType: true})
  }

  async searchByType(type) {
    await this.props.searchBreweriesByType(type);
    if (this.props.breweriesByType.length === 0) {
      this.setState({brewery: null, breweries: []})
    }
    else {
      this.setState({brewery: null, breweries: this.props.breweriesByType, byMap: false, byList: true})
    }
  }

  async setBrewery(brewery){
    await this.props.setBrewery(brewery)
    const {breweryByName} = this.props
    this.setState({brewery: breweryByName, breweries: [breweryByName], byMap: false, byList: true})
  }

  getBreweryOnClick = (id) => {
    const place = this.state.breweries.find(place => place.id === id)
    this.setState({brewery: place})
  }

  getMap = () => {
    this.setState({brewery: null, byMap: true, byList: false, byGrid: false, byName: false, byType: false})
  }

  getList = () => {
    this.setState({brewery: null, breweries: this.props.breweries, byList: true, byGrid: false, byMap: false, byName: false, byType: false})
  }

  getGrid = () => {
    this.setState({brewery: null, breweries: this.props.breweries, byGrid: true, byMap: false, byList: false, byName: false, byType: false})
  }

  render() {
    return (
      <div>
        <Menu isOpen>
          <a onClick={this.getGrid} className='menu-item'>Breweries Grid</a>
          <a onClick={this.getList} className='menu-item'>Breweries List</a>
          <a onClick={this.getMap} className='menu-item'>Breweries Map</a>
          <a onClick={this.toggleSearchName} className='menu-item'>Breweries by name</a>
          <a onClick={this.toggleSearchType} className='menu-item'>Breweries by type</a>
        </Menu>
          <Grid columns='equal'>
            <Grid.Row textAlign='center' className='searchPage' >
              <Grid.Column className='btns'>
                {this.state.byName && <NameSuggestion nameError={this.nameError} setBrewery={this.setBrewery} />}
                {this.state.byType && <TypeSuggestion searchByType={this.searchByType} />}
              </Grid.Column>
            </Grid.Row>
            {this.state.byMap &&
              <Grid.Row>
                <div style={{height: '78vh', width: '100%'}}>
                  <GoogleMapReact
                    bootstrapURLKeys={{key: `${process.env.REACT_APP_GG_API}`}}
                    defaultCenter={{lat: 42.165726, lng: -74.948051}}
                    defaultZoom={7}
                  >
                    {this.state.breweries.map(place =>
                      <Marker key={place.id} lat={place.latitude} lng={place.longitude} brewery={place} />
                    )}
                  </GoogleMapReact>
                </div>
              </Grid.Row>
            }
            <Grid.Row stretched>
              <Grid.Column width={6}>
              { this.state.byList && <ListBreweries breweries={this.state.breweries} getBrewery={this.getBreweryOnClick} /> }
              </Grid.Column>
              <Grid.Column width={10}>
                {this.state.brewery && <Brewery brewery={this.state.brewery} />}
              </Grid.Column>
            </Grid.Row>
          {this.state.byGrid && <GridBreweries breweries={this.state.breweries} />}
        </Grid>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    breweries: state.breweries,
    breweriesByType: state.breweriesByType,
    breweryByName: state.breweryByName
  }
}

const mapDispatchToProps = dispatch => {
  return {
    searchBreweriesByType: type => dispatch(searchBreweriesByType(type)),
    setBrewery: brewery => dispatch({type: 'SET_BREWERY', payload: brewery})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GetBreweries);
