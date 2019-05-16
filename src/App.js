import React, {Component} from 'react';
import './styles/App.scss';
import {MyHeader} from './components/HeaderFooter';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Breweries from './containers/Breweries';
import LinkToBrewery from './containers/LinkToBrewery';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/breweries/:breweryID" component={LinkToBrewery} />
            <Route exact path="/breweries" component={Breweries} />
            <Route exact path="/" component={MyHeader} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;

