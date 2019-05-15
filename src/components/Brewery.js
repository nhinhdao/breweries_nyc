import React, {Component} from 'react';
import {Grid, Label, Segment} from 'semantic-ui-react';
import {RenderBrewery} from './RenderBrewery';
import GoogleMapReact from 'google-map-react';

//Marker to show brewery name on map
const Marker = ({text}) => <Label size='tiny' color='blue' pointing>{text}</Label>

export class Brewery extends Component {
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const {brewery} = this.props
    const text = brewery.name.split(" ").slice(0, 2).join(" ") //Short name to show on map marker
    return (
      <Segment>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <RenderBrewery brewery={brewery} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <div style={{height: '420px', width: '100%'}}>
              <GoogleMapReact
                bootstrapURLKeys={{key: `${process.env.REACT_APP_GG_API}`}}
                defaultCenter={{lat: 42.165726, lng: -74.948051}} //New York State Long and Lat
                defaultZoom={6}
              >
                <Marker
                  lat={brewery.latitude}
                  lng={brewery.longitude}
                  text={text}
                /> 
              </GoogleMapReact>
            </div>
          </Grid.Row>
        </Grid>
      </Segment>

    )
  }
}

export default Brewery
