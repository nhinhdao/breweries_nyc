import React, {Component} from 'react';
import './styles/App.scss';
import {MyHeader} from './components/HeaderFooter';
import Breweries from './containers/Breweries';
import LinkToBrewery from './containers/LinkToBrewery';
import {getNYCBreweries} from './actions/HandleAPIs';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class App extends Component {

  //load all nyc breweries for rendering by map, list or grid later
  componentDidMount() {
    this.props.getNYCBreweries();
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/breweries/:breweryCODE" component={LinkToBrewery} />
            <Route exact path="/breweries" component={Breweries} />
            <Route exact path="/" component={MyHeader} />
          </Switch>
        </Router>
      </div>
    );
  }
}

//access dispatch functions to update store
const mapDispatchToProps = dispatch => {
  return {
    getNYCBreweries: () => dispatch(getNYCBreweries())
  }
}

export default connect(null, mapDispatchToProps)(App);

