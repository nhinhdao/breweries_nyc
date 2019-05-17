import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {RenderBrewery} from '../components/RenderBrewery';
import {searchBreweriesByID} from '../actions/HandleAPIs';
import {Container, Button, Divider, Grid} from 'semantic-ui-react';

class LinkToBrewery extends Component {
  state = {brewery: null};

  async componentDidMount() {
    const id = parseInt(this.props.match.params.breweryID);
    await this.props.searchBreweriesByID(id);
    this.setState({brewery: this.props.brewery})
  }
  
  getBreweryIndex = () => {
    const {breweries} = this.props;
    const id = this.state.brewery.id;
    return breweries.findIndex(brewery => brewery.id === id)
  }

  handleNextBrewery = () => {
    const {breweries} = this.props;
    const index = this.getBreweryIndex();
    if (index < breweries.length - 1){
      this.setState({brewery: breweries[index + 1]});
    }
  }

  handlePreviousBrewery = () => {
    const index = this.getBreweryIndex();
    if (index > 0) {
      this.setState({brewery: this.props.breweries[index - 1]});
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
          <Grid>
            <Grid.Row>
              <Grid.Column widths={14}>
                <RenderBrewery brewery={brewery} />
              </Grid.Column>
            </Grid.Row>
            <Divider hidden />
            <Grid.Row columns={3} textAlign='center'>
              <Grid.Column>
                <Button color='teal' onClick={this.handlePreviousBrewery} className='btn-individual'>Previous Brewery</Button>
              </Grid.Column>
              <Grid.Column>
                <Link to='/breweries'><Button color='orange' className='btn-individual'>Go Back</Button></Link>
              </Grid.Column>
              <Grid.Column>
                <Button color='blue' onClick={this.handleNextBrewery} className='btn-individual'>Next Brewery</Button>
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
