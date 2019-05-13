import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import {connect} from 'react-redux';

// get the name value of the suggestion
const getSuggestionValue = suggestion => suggestion;

// render suggestions and give it some style.
const renderSuggestion = suggestion => (
  <span className="renderSuggestion">
    {suggestion}
  </span>
);

class TypeSuggestion extends Component {
  constructor () {
    super();
    this.state = {
      value: '',
      types: []
    };
  }

  // pass input value to async fetch and setstate with returned data
  getSuggestions = (value) => {
    const input = value.trim().toLowerCase();
    return input.length === 0 ? [] : this.props.types.filter(brewery =>
      brewery.toLowerCase().slice(0, input.length) === input
    );
  };

  onChange = (event, {newValue}) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time update suggestions.
  onSuggestionsFetchRequested = ({value}) => {
    this.setState({types: this.getSuggestions(value)})
  };

  // Autosuggest will call this function every time clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      types: []
    });
  };

  onSuggestionSelected = (_event, {suggestion}) => {
    console.log(suggestion);
    this.setState({value: suggestion})
    console.log(this.state.value)
  }

  render() {
    const {value, types} = this.state;
    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Enter Brewery Type',
      value,
      onChange: this.onChange
    };

    // Render input box
    return (
      <Autosuggest
        suggestions={types}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        onSuggestionSelected={this.onSuggestionSelected}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    types: state.types
  }
}

export default connect(mapStateToProps)(TypeSuggestion);