import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {RenderBrewery} from '../components/RenderBrewery';
import {searchBreweriesByID} from '../actions/HandleAPIs';
import {Container, Button, Divider, Grid} from 'semantic-ui-react';

class LinkToBrewery extends Component {
  state = {
    brewery: null
  };

  // get brewery then update state with the returned brewery
  componentDidMount() {
    this.getBrewery();
  }

  //compare the pathname to force react to get the new brewery
  componentDidUpdate(prevProps) {
    // debugger
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.getBrewery();
    }
  }
  
  //get brewery based on ID from browser
  getBrewery = async () => {
    const id = this.props.match.params.breweryID;
    await this.props.searchBreweriesByID(id);
    this.setState({
      brewery: this.props.brewery
    })
  }

  //get brewery index in the store to display previous or next brewery on click
  getCurrentBreweryIndex = () => {
    const {breweries} = this.props;
    const id = this.state.brewery.id;
    return breweries.findIndex(brewery => brewery.id === id)
  }

  // get next brewery
  handleNextBrewery = () => {
    const {breweries, history} = this.props;
    const index = this.getCurrentBreweryIndex() + 1;
    // debugger
    if (index < breweries.length) {
      const nextID = breweries[index].id;
      history.push(`/breweries/${nextID}`);
    }
  }

  //get previous brewery
  handlePreviousBrewery = () => {
    const {breweries, history} = this.props;
    const index = this.getCurrentBreweryIndex() - 1;
    if (index >= 0) {
      const previousID = breweries[index].id;
      history.push(`/breweries/${previousID}`);
    }
  }

  render() {
    const {brewery} = this.state; 

    // prevent runtime error when brewery is not availabe to display
    if (!brewery) {
      return null;
    }

    return (
      <Container fluid id='br-container'>
        <Container>
          <Grid>
            <Grid.Row>
              {/* display single brewery */}
              <Grid.Column widths={14}>
                <RenderBrewery brewery={brewery} />
              </Grid.Column>
            </Grid.Row>
            <Divider hidden />
            <Grid.Row columns={3} textAlign='center'>
              {/* display previous, back and next button */}
              <Grid.Column>
                <Button color='teal' className='btn-individual' onClick={this.handlePreviousBrewery}>Previous Brewery</Button>
              </Grid.Column>
              <Grid.Column>
                <Link to='/breweries'><Button color='orange' className='btn-individual'>Go Back</Button></Link>
              </Grid.Column>
              <Grid.Column>
                <Button color='blue' className='btn-individual' onClick={this.handleNextBrewery}>Next Brewery</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
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
