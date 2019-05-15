import React, {Component} from 'react';
import './styles/App.scss';
import GetBreweries from './containers/GetBreweries'
import {Container} from 'semantic-ui-react';
import {MyHeader, MyFooter} from './components/HeaderFooter';

class App extends Component {

  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div className="App">
        <MyHeader />
        <Container id='listBreweries'>
          <GetBreweries />
        </Container>
        <MyFooter />
      </div>
    );
  }
}

export default App;

