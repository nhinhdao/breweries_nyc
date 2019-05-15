import React from 'react';
import {Feed, Header, Icon, Popup} from 'semantic-ui-react';

export function RenderBrewery({brewery}) {
  return (
    <Feed style={{marginLeft: '20px'}}>
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