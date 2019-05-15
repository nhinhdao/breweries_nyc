import React, {Component} from 'react';
import './App.css';
import GetBreweries from './containers/GetBreweries'
import {Container} from 'semantic-ui-react';
import {BrowserRouter as Router} from 'react-router-dom';
import {MyHeader, MyFooter} from './components/HeaderFooter';

class App extends Component {

  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div className="App">
        <Router>
          <MyHeader />
          <Container id='listBreweries'>
            <GetBreweries />
          </Container>
          <MyFooter />
        </Router>
      </div>
    );
  }
}

export default App;

