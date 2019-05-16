import React, {Component} from 'react';
import './styles/App.scss';
import {MyHeader} from './components/HeaderFooter';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Breweries from './components/Breweries';
import GetBreweries from './containers/GetBreweries';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path="/" component={MyHeader} />
          <Route path="/breweries" component={GetBreweries} />
        </Router>
      </div>
    );
  }
}

export default App;

