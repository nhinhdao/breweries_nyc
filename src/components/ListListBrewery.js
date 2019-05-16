import React, {Component} from 'react';
import {connect} from 'react-redux';
import Brewery from '../components/Brewery';
import {Grid} from 'semantic-ui-react';
import ListBreweries from '../components/ListBreweries';

class ListListBrewery extends Component {
  state = {
    brewery: null
  };

  getBreweryOnClick = (id) => {
    const place = this.props.breweries.find(place => place.id === id)
    this.setState({brewery: place})
  }

  render() {
    return (
      <div>
        <Grid columns='equal'>
          <Grid.Row stretched>
            <Grid.Column width={6}>
              <ListBreweries breweries={this.props.breweries} getBrewery={this.getBreweryOnClick} />
            </Grid.Column>
            <Grid.Column width={10}>
              {this.state.brewery && <Brewery brewery={this.state.brewery} />}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    breweries: state.breweries,
  }
}

export default connect(mapStateToProps)(ListListBrewery);
