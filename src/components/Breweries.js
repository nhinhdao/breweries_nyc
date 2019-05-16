import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, Button} from 'semantic-ui-react';
import {getNYCBreweries} from '../actions/HandleAPIs';
import LinkToBrewery from '../components/LinkToBrewery';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {MyFooter} from '../components/HeaderFooter';
import MapBreweries from './MapBreweries';
import GridBreweries from './GridBreweries';
import ListListBrewery from './ListListBrewery';
import StickyMenu from './StickyMenu';
import {slide as Menu} from 'react-burger-menu';

class Breweries extends Component {

  componentDidMount() {
    this.props.getNYCBreweries();
  }

  render() {
    return (
      <div className='bg-main'>
        <Router>
          <Menu>
            <a id="home" className="menu-item" href="/">Home</a>
            <a id="about" className="menu-item" href="/about">About</a>
            <a id="contact" className="menu-item" href="/contact">Contact</a>
          </Menu>
          <StickyMenu />
          <Container id='listBreweries'>
            <Switch>
              <Route exact path="/breweries" component={MapBreweries} />
              <Route exact path="/breweries/list" component={ListListBrewery} />
              <Route exact path="/breweries/grid" component={GridBreweries} />
              <Route path="/breweries/grid/:breweryID" component={LinkToBrewery} />
            </Switch>
          </Container>
          <MyFooter />
        </Router>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getNYCBreweries: () => dispatch(getNYCBreweries()),
  }
}

export default connect(null, mapDispatchToProps)(Breweries);