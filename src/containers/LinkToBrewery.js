import React, {Component} from 'react';
import {connect} from 'react-redux';
import {GoogleMap} from '../components/RenderBrewery';
import {Link} from 'react-router-dom';
import {searchBreweriesByID} from '../actions/HandleAPIs';
import {Container, Header, Icon, Grid, Feed, Segment, Button} from 'semantic-ui-react';

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
      <Container fluid style={{backgroundColor: '#b4bad2', minHeight: '100vh'}} className='br-container'>
        <Container>
          <Grid centered>
            <Header className='br-header' textAlign='center'>{brewery.name}</Header>
            <Grid.Row>
            <Grid.Column width={9}>
              <Feed className='br-des'>
                <Feed.Extra text><Icon name='tag' />{" "}{brewery.brewery_type}</Feed.Extra>
                <Feed.Extra text><Icon name='map marker alternate' />{" "}{brewery.address}</Feed.Extra>
                <Feed.Extra text><Icon name='globe' />{" "}{brewery.country}</Feed.Extra>
                <Feed.Extra text><Icon name='barcode' />{" "}{brewery.postal_code}</Feed.Extra>
                <Feed.Extra text><Icon name='phone' />{" "}{brewery.phone}</Feed.Extra>
                <Feed.Extra text><Icon name='linkify' />{" "}<a href={`${brewery.website_url}`} rel="noopener noreferrer" target='_blank'>{brewery.website_url}</a></Feed.Extra>
              </Feed>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={12}>
                <GoogleMap brewery={brewery} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
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
