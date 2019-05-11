Front End Page displays 2 components: ListBreweries for all breweries and Brewery for individual Brewery

1. ListBreweries use Axios to get data from back end for static list and from OpenBreweriesBD for dynamic search
  - componentDidMount() for fetching all breweries
  - searchBreweriesByName(name) and searchBreweriesByType(type) for name and type search
  -

<Form onSubmit={this.handleSubmit}>
  <Form.Group>
    { this.state.byName &&
      <React.Fragment>
        <Label color='teal' pointing='right'>Enter name</Label>
        <Form.Input size='mini' name='name' value={this.state.name} onChange={this.handleChange} required />
      </React.Fragment>
    }
    { this.state.byType &&
      <React.Fragment>
        <Label color='teal' pointing='right'>Enter type</Label>
        <Form.Input size='mini' name='type' value={this.state.type} onChange={this.handleChange} required />
      </React.Fragment>
    } 
    <Form.Button content='Search' size='mini' />
  </Form.Group>
</Form>