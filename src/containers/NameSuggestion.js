import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import {connect} from 'react-redux';
import {getSuggestionFromDB} from '../actions/HandleAPIs';

// get the name value of the suggestion
const getSuggestionValue = suggestion => suggestion.name;

// render suggestions and give it some style.
const renderSuggestion = suggestion => (
  <span className="renderSuggestion">
    {suggestion.name}
  </span>
);

class NameSuggestion extends Component {
  constructor () {
    super();
    this.state = {
      value: '',
      suggestions: []
    };
    this.getSuggestions = this.getSuggestions.bind(this)
  }

  // pass input value to async fetch and setstate with returned data
  async getSuggestions(value){
    const input = value.trim().toLowerCase();
    await this.props.getSuggestionFromDB(input)
    this.setState({suggestions: this.props.suggestion})
  };

  onChange = (event, {newValue}) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time update suggestions.
  onSuggestionsFetchRequested = ({value}) => {
    this.getSuggestions(value);
  };

  // Autosuggest will call this function every time clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (_event, {suggestion}) => {
    console.log(suggestion);
    this.setState({value: suggestion.name})
  }

  render() {
    const {value, suggestions} = this.state;
    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Enter Brewery Name',
      value,
      onChange: this.onChange
    };

    // Render input box
    return (
      <Autosuggest
        suggestions={suggestions}
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
    suggestion: state.suggestion
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSuggestionFromDB: (query) => dispatch(getSuggestionFromDB(query))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NameSuggestion);