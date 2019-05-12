import React, {Component} from 'react';
import {Grid, Label} from 'semantic-ui-react';
import Microlink from "@microlink/react";
import GoogleMapReact from 'google-map-react';
import RenderBrewery from './RenderBrewery';
import MyMapComponent from './GGMap';

const Marker = ({text}) => <Label size='tiny' color='blue' pointing>{text}</Label>

export class Brewery extends Component {

  render() {
    const {brewery} = this.props
    // debugger
    // const center = {lat: 42.165726, lng: -74.948051} //New York State Long and Lat
    // const text = brewery.name.split(" ").slice(0, 2).join(" ")
    const markers = [brewery]
    console.log(`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GG_API}?v=3.exp&libraries=geometry,drawing,places`)
    return (
      <React.Fragment>
        <Grid>
          <Grid.Row>
            <Grid.Column width={11}>
              <RenderBrewery brewery={brewery} />
            </Grid.Column>
            <Grid.Column width={5} textAlign='center'>
              <Microlink
                url={`${brewery.website_url}`}
                media={['logo', 'image']}
                style={{width: '128px'}}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            {/* <div style={{height: '400px', width: '100%'}}>
              <GoogleMapReact
                bootstrapURLKeys={{key: `${process.env.REACT_APP_GG_API}` }}
                defaultCenter={center}
                defaultZoom={6}
              >
                <Marker
                  lat={`${brewery.latitude}`}
                  lng={`${brewery.longitude}`}
                  text={text}
                />
              </GoogleMapReact> 
            </div> */}
            <MyMapComponent isMarkerShown markers={markers}/>
          </Grid.Row>
        </Grid>
      </React.Fragment>

    )
  }
}

export default Brewery
