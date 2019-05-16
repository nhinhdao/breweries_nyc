import React, {Component} from 'react';
import {connect} from 'react-redux';
import Brewery from './Brewery';

class LinkToBrewery extends Component {
  state = {brewery: null};

  componentDidMount() {
    const id = parseInt(this.props.match.params.breweryID);
    const place = this.props.breweries.find(place => place.id === id);
    // debugger
    this.setState({brewery: place})
  }

  render() {

    if (!this.state.brewery) {
      return null;
    }

    return (
      <Brewery brewery={this.state.brewery} />
    )
  }
}


const mapStateToProps = state => {
  return {
    breweries: state.breweries
  }
}

export default connect(mapStateToProps)(LinkToBrewery);
