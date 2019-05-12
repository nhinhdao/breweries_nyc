import React, {Component} from 'react';
import {Icon, Input, Grid, Button} from 'semantic-ui-react';
import ListBreweries from '../components/ListBreweries';
import Brewery from '../components/Brewery';
import {connect} from 'react-redux';
import {getNYCBreweries, searchBreweriesByName, searchBreweriesByType} from '../actions/HandleAPIs';

const list = [
  {
    id: 1,
    name: "Adirondack Toboggan Company Microbrewery",
    brewery_type: "micro",
    address: "202A W Main St, Gouverneur, New York",
    postal_code: "13642-1334",
    country: "United States",
    longitude: -75.4748923846074,
    latitude: 44.3323731052224,
    phone: "3157716313",
    website_url: "http://www.adktoboggan.net"
  },
  {
    id: 2,
    name: "Black Forest Brew Haus",
    brewery_type: "brewpub",
    address: "2015 New Hwy, Farmingdale, New York",
    postal_code: "11735-1103",
    country: "United States",
    longitude: -73.4144329120839,
    latitude: 40.7550515,
    phone: "6313919500",
    website_url: "http://www.blackforestbrewhaus.com"
  },
  {
    id: 3,
    name: "Blue Point Brewing Co",
    brewery_type: "large",
    address: "161 River Ave, Patchogue, New York",
    postal_code: "11772-3304",
    country: "United States",
    longitude: -73.0216062980388,
    latitude: 40.75913445,
    phone: "6314756944",
    website_url: "http://www.bluepointbrewing.com"
  },
  {
    id: 4,
    name: "Brown's Brewing Co",
    brewery_type: "brewpub",
    address: "50 Factory Hill Rd, North Hoosick, New York",
    postal_code: "12133",
    country: "United States",
    longitude: -73.3451582057618,
    latitude: 42.9266144376744,
    phone: "5182732337",
    website_url: "http://www.brownsbrewing.com"
  },
  {
    id: 5,
    name: "Carey's Brew House",
    brewery_type: "brewpub",
    address: "58 Bridge St, Corning, New York",
    postal_code: "14830-2239",
    country: "United States",
    longitude: -77.0608970416667,
    latitude: 42.1502577083333,
    phone: "6073775651",
    website_url: "http://www.careysbrewhouse.com"
  }
]

class GetBreweries extends Component {
  constructor () {
    super();
    this.state = {
      name: '',
      type: '',
      brewery: null,
      byName: false,
      byType: false
    };
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

  searchByName = () => {
    console.log(this.state.name);
  }

  searchByType = () => {
    console.log(this.state.type);
  }

  getBreweryOnClick = (id) => {
    const place = list.find(place => place.id === id)
    this.setState({brewery: place})
  }

  render() {
    return (
      <div>
        <Grid columns='equal'>
          <Grid.Row textAlign='center' className='searchPage' >
            <Grid.Column>
              <Button color='olive' onClick={this.getBreweries}>New York Breweries</Button>
              <Button color='blue' onClick={this.toggleSearchName}>Breweries by name</Button>
              <Button color='teal' onClick={this.toggleSearchType}>Breweries by type</Button>
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
            <Grid.Column width={6}>
              <ListBreweries breweries={list} getBrewery={this.getBreweryOnClick}/>
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
    nycBrewries: state.allBreweries,
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
