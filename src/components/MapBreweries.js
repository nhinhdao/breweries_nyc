import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid} from 'semantic-ui-react';
import GoogleMapReact from 'google-map-react';
import {Marker} from '../components/RenderBrewery';

class MapBreweries extends Component {

  render() {
    const {breweries} = this.props;
    return (
      <Grid.Row>
        <Header className='mp-header' textAlign='center'>NEW YORK BREWERIES MAP</Header>
        <div style={{height: '78vh', width: '100%'}}>
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


const mapStateToProps = state => {
  return {
    breweries: state.breweries
  }
}

export default connect(mapStateToProps)(MapBreweries);