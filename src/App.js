import React, {Component} from 'react';
import './App.css';
import logo from './logo.svg';
import GetBreweries from './containers/GetBreweries'
import {Container, Menu, Button, Header} from 'semantic-ui-react';
import {BrowserRouter as Router, Link} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <header className='banner'>
            <Menu inverted>
              <Menu.Item as={Link} to='/' header>
                <img src={logo} className="App-logo" alt="logo" />
                NEW YORK BREWERIES
              </Menu.Item>
            </Menu>
            <Header as='h1' color='grey'>NEW YORK BREWERIES</Header>
            <Button>Learn More</Button>
          </header>
          <Container id='listBreweries' style={{marginTop: '1em'}}>
            <GetBreweries />
          </Container>
        </Router>
      </div>
    );
  }
}

export default App;
