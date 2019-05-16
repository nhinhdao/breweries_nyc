import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {RenderBrewery} from '../components/RenderBrewery';
import {searchBreweriesByID} from '../actions/HandleAPIs';
import {Container, Segment, Button, Divider} from 'semantic-ui-react';

class LinkToBrewery extends Component {
  state = {brewery: null};

  async componentDidMount() {
    const id = parseInt(this.props.match.params.breweryID);
    await this.props.searchBreweriesByID(id);
    this.setState({brewery: this.props.brewery})
  }

  handleNextBrewery = () => {
    const {breweries} = this.props;
    const id = this.state.brewery.id;
    const index = breweries.findIndex(brewery => brewery.id === id)
    if (index < breweries.length - 1){
      this.setState({brewery: breweries[index+1]})
    }
  }

  render() {
    const {brewery} = this.state; 

    if (!brewery) {
      return null;
    }

    return (
      <Container fluid id='br-container'>
        <Container>
          <RenderBrewery brewery={brewery} />
          <Divider />
          <Segment basic>
            <Link to='/breweries'><Button color='teal'>Go Back</Button></Link>
            <Button primary floated='right' onClick={this.handleNextBrewery}>Next Brewery</Button>
          </Segment>
        </Container>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    brewery: state.breweryByName,
    breweries: state.breweries
  }
}

const mapDispatchToProps = dispatch => {
  return {
    searchBreweriesByID: id => dispatch(searchBreweriesByID(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkToBrewery);
