import React, {Component} from 'react';
import {Icon, Input, Grid, Button, Message} from 'semantic-ui-react';
import ListBreweries from '../components/ListBreweries';
import Brewery from '../components/Brewery';
import {connect} from 'react-redux';
import GoogleMapReact from 'google-map-react';
import {getNYCBreweries, searchBreweriesByName, searchBreweriesByType} from '../actions/HandleAPIs';
import {Marker} from '../components/RenderBrewery';
import NameSuggestion from './NameSuggestion';
import TypeSuggestion from './TypeSuggestion';

class GetBreweries extends Component {
  constructor () {
    super();
    this.state = {
      name: '',
      type: '',
      breweries: [],
      brewery: null,
      byName: false,
      byType: false,
      byList: false,
      byMap: true,
      error: false,
    };
    this.searchByName = this.searchByName.bind(this);
    this.searchByType = this.searchByType.bind(this);
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

  async searchByName() {
    await this.props.searchBreweriesByName(this.state.name);
    if (this.props.breweriesByName.length === 0) {
      this.setState({brewery: null, breweries: [], error: true})
    }
    else {
      this.setState({brewery: null, breweries: this.props.breweriesByName, byMap: false, byList: false})
    }
  }

  async searchByType() {
    await this.props.searchBreweriesByType(this.state.type);
    if (this.props.breweriesByType.length === 0) {
      this.setState({brewery: null, breweries: [], error: true})
    }
    else {
      this.setState({brewery: null, breweries: this.props.breweriesByType, byMap: false, byList: false})
    }
  }

  getBreweryOnClick = (id) => {
    const place = this.state.breweries.find(place => place.id === id)
    this.setState({brewery: place})
  }

  getBreweries = () => {
    this.setState({brewery: null, breweries: this.props.nycBreweries, byName: false, byType: false, byMap: false})
  }

  getMap = () => {
    this.setState({brewery: null, byMap: true, byName: false, byType: false, byList: false, error: false})
  }

  render() {
    return (
      <div>
        <Grid columns='equal'>
          <Grid.Row textAlign='center' className='searchPage' >
            <Grid.Column>
              <Button color='olive' onClick={this.getBreweries}>New York Breweries</Button>
              <Button color='green' onClick={this.getMap}>Breweries Map</Button>
              <Button color='blue' onClick={this.toggleSearchName}>Breweries by name</Button>
              <Button color='teal' onClick={this.toggleSearchType}>Breweries by type</Button>
              <NameSuggestion />
              <TypeSuggestion />
              {this.state.byName &&
                <Input
                  label='Enter name'
                  name='name'
                  size='small'
                  value={this.state.name}
                  onChange={this.handleChange}
                  icon={<Icon name='search' inverted circular link onClick={this.searchByName} />}
                />
              }
              {this.state.byType &&
                <Input
                  label='Enter type'
                  name='type'
                  size='small'
                  value={this.state.type}
                  onChange={this.handleChange}
                  icon={<Icon name='search' inverted circular link onClick={this.searchByType} />}
                />
              }
            </Grid.Column>
          </Grid.Row>
          <Grid.Row stretched>
            { (this.state.breweries.length > 0 && !this.state.byMap) &&
              <Grid.Column width={6}>
                <ListBreweries breweries={this.state.breweries} getBrewery={this.getBreweryOnClick} />
              </Grid.Column>
            }
            { (this.state.error && this.state.breweries.length === 0) &&
              <Grid.Column width={16} textAlign='center'>
                <Message negative>Brewery not found. Please try again!</Message>
              </Grid.Column> 
            }
            <Grid.Column width={10}>
              {this.state.brewery &&
                <Brewery brewery={this.state.brewery} />
              }
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            { this.state.byMap &&
              <div style={{height: '800px', width: '100%'}}>
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
            }
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    nycBreweries: state.allBreweries,
    breweriesByName: state.breweriesByName,
    breweriesByType: state.breweriesByType
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getNYCBreweries: () => dispatch(getNYCBreweries()),
    searchBreweriesByName: name => dispatch(searchBreweriesByName(name)),
    searchBreweriesByType: type => dispatch(searchBreweriesByType(type))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GetBreweries);
