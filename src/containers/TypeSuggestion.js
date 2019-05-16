import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dropdown} from 'semantic-ui-react';

class TypeSuggestion extends Component {

  handleChange = (e, { value}) => {
    this.props.searchByType(value)
  }

  render() {
    const types = this.props.types.map(type => type = {
      key: type,
      text: type,
      value: type
    })
    return (
      <Dropdown
        placeholder='Choose a type'
        selection
        options={types}
        onChange={this.handleChange}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    types: state.types
  }
}

export default connect(mapStateToProps)(TypeSuggestion);



