import React, { Component } from 'react'
import {connect} from 'react-redux';
import {getNYCBreweries, searchBreweriesByName, searchBreweriesByType} from '../actions/HandleAPIs';

class ListBreweries extends Component {
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    nycBrewries: state.allBreweries,
    breweriesByName: state.breweriesByName,
    breweriesByType: state.breweriesByType
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getNYCBreweries: () => dispatch(getNYCBreweries()),
    searchBreweriesByName: name => dispatch(searchBreweriesByName(name)),
    searchBreweriesByType: type => dispatch(searchBreweriesByType(type))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListBreweries);