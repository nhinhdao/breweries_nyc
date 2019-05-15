import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';

class NameSuggestion extends Component {
  constructor () {
    super();
    this.state = {
      value: '',
      suggestions: []
    };
  }

  // pass input value to async fetch and setstate with returned data
  getSuggestions = (value) => {
    const input = value.trim().toLowerCase();
    axios.get(`https://api.openbrewerydb.org/breweries?by_state=new_york&by_name=${input}`)
      .then(res => {
        if (res.data.length === 0) {
          this.setState({suggestions: [{isAddNew: true}]})
        }
        else {
          this.setState({suggestions: res.data})
        }
      })
      .catch(error => {
        this.setState({suggestions: []})
      })
  };

  // get the name value of the suggestion
  getSuggestionValue = suggestion => {
    if (suggestion.isAddNew) {
      return `Name not found: ${this.state.value}`;
    }
    return suggestion.name;
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
        {suggestion.name}
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
    this.getSuggestions(value);
  };

  // Autosuggest will call this function every time clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (_event, {suggestion}) => {
    if (suggestion.isAddNew) {
      // debugger
      const input = document.getElementsByClassName('react-autosuggest__input');
      input[0].style.cssText = "color: red; border: 1px solid red";
    }
    else {
      document.getElementsByClassName('react-autosuggest__input')[0].removeAttribute("style")
      this.props.setBrewery(suggestion)
    }
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
        getSuggestionValue={this.getSuggestionValue}
        onSuggestionSelected={this.onSuggestionSelected}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default NameSuggestion;