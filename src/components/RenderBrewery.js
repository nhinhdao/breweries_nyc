import React from 'react';
import {Link} from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import {Feed, Header, Icon, Popup, Card, Divider, Label, Grid} from 'semantic-ui-react';

export function RenderBrewery({brewery}) {
  return (
    <Grid centered>
      <Header className='br-header' textAlign='center'>{brewery.name}</Header>
      <Grid.Row>
        <Grid.Column width={9}>
          <Feed className='br-des'>
            <Feed.Extra text><Icon name='tag' />{" "}{brewery.brewery_type}</Feed.Extra>
            <Feed.Extra text><Icon name='map marker alternate' />{" "}{brewery.address}</Feed.Extra>
            <Feed.Extra text><Icon name='globe' />{" "}{brewery.country}</Feed.Extra>
            <Feed.Extra text><Icon name='barcode' />{" "}{brewery.postal_code}</Feed.Extra>
            <Feed.Extra text><Icon name='phone' />{" "}{brewery.phone}</Feed.Extra>
            <Feed.Extra text><Icon name='linkify' />{" "}<a href={`${brewery.website_url}`} rel="noopener noreferrer" target='_blank'>{brewery.website_url}</a></Feed.Extra>
          </Feed>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <GoogleMap brewery={brewery} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export function RenderSummary({brewery}) {
  return (
    <Card>
      <Card.Content>
        <Link to={`/breweries/${brewery.id}`}><Header as='h4' color='blue' textAlign='center'>{brewery.name}</Header></Link>
        <Divider />
        <div style={{marginLeft: '20px'}}>
          <Card.Description>
            <Icon name='tag' />{" "}{brewery.brewery_type}
          </Card.Description>
          <Card.Description>
            <Icon name='map marker alternate' />{" "}{brewery.address}
          </Card.Description>
          <Card.Description>
            <Icon name='linkify' />{" "}<a href={`${brewery.website_url}`} rel="noopener noreferrer" target='_blank'>{brewery.website_url}</a>
          </Card.Description>
        </div>
      </Card.Content>
    </Card>
  )
}


export function Marker({brewery}) {
  return (
    <Popup
      trigger={<Icon size='big' color='red' name='map marker alternate' />}
      content={
        <RenderBrewery brewery={brewery} />
      }
      on='click'
      wide='very'
      position='bottom center'
    />
  )
}

export function GoogleMap({brewery}) {

  const text = brewery.name.split(" ").slice(0, 2).join(" ") //Short name to show on map marker;

  //Marker to show brewery name on map
  const Marker = ({text}) => <Label size='tiny' color='blue' pointing>{text}</Label>;

  return (
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
  )
}