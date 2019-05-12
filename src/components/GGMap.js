import React from "react";
import {compose, withProps} from "recompose"
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps"

const MyMapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GG_API}?v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{height: `100%`}} />,
    containerElement: <div style={{height: `400px`}} />,
    mapElement: <div style={{height: `100%`}} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{lat: 42.165726, lng: -74.948051}} //New York State Long and Lat
  >
    {props.markers.map(marker => (
      <Marker
        key={marker.id}
        position={{lat: marker.latitude, lng: marker.longitude}}
      />
    ))}
  </GoogleMap>
)

export default MyMapComponent;