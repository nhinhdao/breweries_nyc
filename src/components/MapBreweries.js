import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import {Marker} from '../components/RenderBrewery';
import {Grid, Header, Icon, Divider} from 'semantic-ui-react';

// component to render all breweries on a big map with markers
class MapBreweries extends Component {

  render() {
    const {breweries} = this.props;
    return (
      <Grid.Row>
        <Header as='h2' icon textAlign='center'>
          <Icon name='map outline' color='teal' />
          <Header.Content className='brs-header'>NEW YORK BREWERIES MAP</Header.Content>
        </Header>
        <Divider hidden/>
        <div style={{height: '75vh', width: '100%'}}>
          <GoogleMapReact
            bootstrapURLKeys={{key: `${process.env.REACT_APP_GG_API}`}}
            defaultCenter={{lat: 42.165726, lng: -74.948051}}
            defaultZoom={7}
          >
            {breweries.map(place =>
              <Marker key={place.id} lat={place.latitude} lng={place.longitude} brewery={place} />
            )}
          </GoogleMapReact>
        </div>
      </Grid.Row>
    )
  }
}

MapBreweries.propTypes = {
  breweries: PropTypes.array,
}


const mapStateToProps = state => {
  return {
    breweries: state.breweries
  }
}

export default connect(mapStateToProps)(MapBreweries);