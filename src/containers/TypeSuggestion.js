import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import {connect} from 'react-redux';

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
    const suggestions = this.props.types.filter(brewery =>
      brewery.toLowerCase().slice(0, input.length) === input
    );
    if (suggestions.length === 0) {
      return [
        {isAddNew: true}
      ];
    }
    return suggestions;
  };

  // get the name value of the suggestion
  getSuggestionValue = suggestion => {
    if (suggestion.isAddNew) {
      return `Type not found: ${this.state.value}`;
    }

    return suggestion;
  };

  // render suggestions and give it some style.
  renderSuggestion = suggestion => {
    if (suggestion.isAddNew) {
      return (
        <span>
          <strong>{this.state.value}</strong>
        </span>
      );
    }

    return (
      <span className="renderSuggestion">
        {suggestion}
      </span>
    );
  };

  onChange = (event, {newValue}) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time update suggestions.
  onSuggestionsFetchRequested = ({value}) => {
    this.setState({
      types: this.getSuggestions(value)
    })
  };

  // Autosuggest will call this function every time clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      types: []
    });
  };

  onSuggestionSelected = (_event, {suggestion}) => {
    if (suggestion.isAddNew) {
      const input = document.getElementsByClassName('react-autosuggest__input');
      input[0].style.cssText = "color: red; border: 1px solid red";
    }
    else {
      document.getElementsByClassName('react-autosuggest__input')[0].removeAttribute("style")
      this.props.searchByType(suggestion)
    }
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
        getSuggestionValue={this.getSuggestionValue}
        onSuggestionSelected={this.onSuggestionSelected}
        renderSuggestion={this.renderSuggestion}
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