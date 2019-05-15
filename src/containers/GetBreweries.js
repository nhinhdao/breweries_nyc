import React, {Component} from 'react';
import {Grid, Button} from 'semantic-ui-react';
import ListBreweries from '../components/ListBreweries';
import Brewery from '../components/Brewery';
import {connect} from 'react-redux';
import GoogleMapReact from 'google-map-react';
import {getNYCBreweries, searchBreweriesByType} from '../actions/HandleAPIs';
import {Marker} from '../components/RenderBrewery';
import NameSuggestion from './NameSuggestion';
import TypeSuggestion from './TypeSuggestion';

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
    };
    this.searchByType = this.searchByType.bind(this);
    this.setBrewery = this.setBrewery.bind(this);
  }

  async componentDidMount() {
    await this.props.getNYCBreweries();
    this.setState({breweries: this.props.nycBreweries})
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
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
      this.setState({brewery: null, breweries: this.props.breweriesByType, byMap: false, byList: false})
    }
  }

  async setBrewery(brewery){
    await this.props.setBrewery(brewery)
    const {breweryByID} = this.props
    this.setState({brewery: breweryByID, breweries: [breweryByID], byMap: false, byList: false})
  }

  getBreweryOnClick = (id) => {
    const place = this.state.breweries.find(place => place.id === id)
    this.setState({brewery: place})
  }

  getBreweries = () => {
    this.setState({brewery: null, breweries: this.props.nycBreweries, byName: false, byType: false, byMap: false})
  }

  getMap = () => {
    this.setState({brewery: null, byMap: true, byName: false, byType: false, byList: false})
  }

  render() {
    return (
      <div>
        <Grid columns='equal'>
          <Grid.Row textAlign='center' className='searchPage' >
            <Grid.Column>
              <Button color='olive' onClick={this.getBreweries}>Breweries List</Button>
              <Button color='green' onClick={this.getMap}>Breweries Map</Button>
              <Button color='blue' onClick={this.toggleSearchName}>Breweries by name</Button>
              <Button color='teal' onClick={this.toggleSearchType}>Breweries by type</Button>
              {this.state.byName &&
                <NameSuggestion nameError={this.nameError} setBrewery={this.setBrewery}/>
              }
              {this.state.byType &&
                <TypeSuggestion searchByType={this.searchByType}/>
              }
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
                    <Marker
                      key={place.id}
                      lat={place.latitude}
                      lng={place.longitude}
                      brewery={place}
                    />
                  )}
                </GoogleMapReact>
              </div>
            </Grid.Row>
          }
          <Grid.Row stretched>
            <Grid.Column width={6}>
              {(this.state.breweries.length > 0 && !this.state.byMap) &&
                <ListBreweries breweries={this.state.breweries} getBrewery={this.getBreweryOnClick} />
              }
            </Grid.Column>
            <Grid.Column width={10}>
              {this.state.brewery &&
                <Brewery brewery={this.state.brewery} />
              }
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    nycBreweries: state.allBreweries,
    breweriesByType: state.breweriesByType,
    breweryByID: state.breweryByID
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
