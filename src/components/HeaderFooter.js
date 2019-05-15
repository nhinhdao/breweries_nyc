import React from 'react';
import logo from '../logo.svg';
import {Segment, Container, Menu, Header, Button, Icon} from 'semantic-ui-react'

function scrollDown() {
  const yPos = document.getElementById('listBreweries').getBoundingClientRect().y;
  window.scrollTo({
    top: yPos,
    left: 0,
    behavior: 'smooth'
  })
}

export function MyFooter() {
  return (
    <Segment vertical className='myFooter'>
      <Container textAlign='center'>
        <img src={logo} className="App-logo" alt="logo" />
        <p>&copy; {new Date().getFullYear()} Copyright: Nhinh Dao</p>
      </Container>
    </Segment>
  )
}

export function MyHeader() {
  return (
    <header className='banner'>
      <Menu>
        <Container fluid>
          <Menu.Item header>
            <img src={logo} className="App-logo" alt="logo" />
            NEW YORK BREWERIES
          </Menu.Item>
        </Container>
      </Menu>
      <Header as='h1' textAlign='center' icon className='logoHeader'>
        <Icon circular inverted color='teal' name='beer' />
        <Header className='content'>EXPLORE NEW YORK FINEST BREWING COMPANIES...</Header>
        <Button color='orange' onClick={scrollDown} id='btn-header'>Learn more</Button>
      </Header>
    </header>
  )
}