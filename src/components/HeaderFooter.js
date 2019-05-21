import React from 'react';
import logo from '../logo.svg';
import {Link} from 'react-router-dom';
import {Segment, Container, Header, Button, Icon, Menu} from 'semantic-ui-react';

// footer
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

// header
export function MyHeader() {

  return (
    <header className='bg-header'>
      <Header as='h1' textAlign='center' icon className='logoHeader'>
        <Icon circular inverted color='teal' name='beer' />
        <Header className='content'>EXPLORE NEW YORK FINEST BREWING COMPANIES...</Header>
        <Link to='/breweries'><Button color='orange' id='btn-header'>Learn more</Button></Link>
      </Header>
    </header>
  )
}

//stickymenu (replaces by burger bar)
export function StickyMenu() {

  return (
    <Menu>
      <Container fluid className='btns'>
        <Link to='/'>
          <Menu.Item header>
            <img src={logo} className="App-logo" alt="logo" />
            NEW YORK BREWERIES
          </Menu.Item>
        </Link>
      </Container>
    </Menu>
  )
}