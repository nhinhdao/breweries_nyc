import React, {Component} from 'react';
import {Grid, Segment} from 'semantic-ui-react';
import {RenderBrewery, GoogleMap} from './RenderBrewery';

export class Brewery extends Component {
  
  render() {
    const {brewery} = this.props
    return (
      <Segment basic>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <RenderBrewery brewery={brewery} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <GoogleMap brewery={brewery} />
          </Grid.Row>
        </Grid>
      </Segment>

    )
  }
}

export default Brewery
