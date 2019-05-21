import React from 'react';
import {Link} from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import {Feed, Header, Icon, Popup, Card, Label, Grid, List, Menu} from 'semantic-ui-react';

// function component to render a single brewery with map (when user click on a list)
export function RenderBrewery({brewery}) {
  return (
    <Grid>
      <Header className='br-header' textAlign='center'>{brewery.name}</Header>
      <Grid.Row>
        <Grid.Column width={12}>
          <Feed className='br-des'>
            <Feed.Extra text><Icon name='tag' />{" "}{brewery.brewery_type}</Feed.Extra>
            <Feed.Extra text><Icon name='map marker alternate' />{" "}{brewery.address}</Feed.Extra>
            <Feed.Extra text><Icon name='globe' />{" "}{brewery.country}</Feed.Extra>
            <Feed.Extra text><Icon name='barcode' />{" "}{brewery.postal_code}</Feed.Extra>
            <Feed.Extra text><Icon name='phone' />{" "}{brewery.phone}</Feed.Extra>
            <Feed.Extra text><Icon name='linkify' />{" "}
              {(brewery.website_url === 'N/A') ? 'N/A' : <a href={`${brewery.website_url}`} rel="noopener noreferrer" target='_blank'>{brewery.website_url}</a>}
            </Feed.Extra>
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


//function component to render summary card on grid
export function GridSummary({brewery}) {
  return (
    <Card className='card-individual'>
      <Card.Content>
        <Link to={`/breweries/${brewery.id}`}>
          <Header className='gr-header'>{brewery.name}</Header>
          <div style={{color: '#504f4d'}}>
            <Card.Description>
              <Icon name='home' />{" "}{brewery.brewery_type}
            </Card.Description>
            <Card.Description>
              <Icon name='map marker alternate' />{" "}{brewery.address}
            </Card.Description>
          </div>
        </Link>
        <Card.Description>
          <Icon name='map marker alternate' />{" "}
          {(brewery.website_url === 'N/A') ? 'N/A' : <a href={`${brewery.website_url}`} rel="noopener noreferrer" target='_blank'>{brewery.website_url}</a>}
        </Card.Description>
      </Card.Content>
    </Card>
  )
}

//function component to render summary on list
export function ListSummary({brewery}) {
  return (
    <Menu.Item key={brewery.id}>
      <List divided animated verticalAlign='middle'>
        <List.Item>
          <List.Content id='list-data'>
            <Header as='h4' id='list-header'>{brewery.name}</Header>
            <List.Description><Icon name='caret right' size='tiny' /> Type: {brewery.brewery_type}</List.Description>
            <List.Description><Icon name='caret right' size='tiny' /> {brewery.address}</List.Description>
          </List.Content>
        </List.Item>
      </List>
    </Menu.Item>
  )
}


//function component to render popup when user click on a marker
export function MapPopup({brewery}) {

  return (
    <Feed>
      <Feed.Event>
        <Feed.Content>
          <Header as='h3' color='blue'>{brewery.name}</Header>
          <div style={{marginLeft: '20px'}}>
            <Feed.Extra text><Icon name='tag' />{brewery.brewery_type}</Feed.Extra>
            <Feed.Extra text><Icon name='map marker alternate' />{brewery.address}</Feed.Extra>
            <Feed.Extra text><Icon name='globe' />{brewery.country}</Feed.Extra>
            <Feed.Extra text><Icon name='barcode' />{brewery.postal_code}</Feed.Extra>
            <Feed.Extra text><Icon name='phone' />{brewery.phone}</Feed.Extra>
            <Feed.Extra text><Icon name='linkify' /> <a href={`${brewery.website_url}`} rel="noopener noreferrer" target='_blank'>{brewery.website_url}</a></Feed.Extra>
          </div>
        </Feed.Content>
      </Feed.Event>
    </Feed>
  )
}


// marker style for rendering on a big map
export function Marker({brewery}) {
  return (
    <Popup
      trigger={<Icon size='big' color='red' name='map marker alternate' />}
      content={
        <MapPopup brewery={brewery} />
      }
      on='click'
      wide='very'
      position='bottom center'
      className='mapPopup'
    />
  )
}

// google map for a single brewery
export function GoogleMap({brewery}) {

  const text = brewery.name.split(" ").slice(0, 2).join(" ") //Short name to show on map marker;

  //Marker to show brewery name on map on a single brewery
  const Marker = ({text}) => <Label size='tiny' color='blue' pointing>{text}</Label>;

  return (
    <div style={{height: '420px', width: '100%'}} id='gg-map'>
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