import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';

//component to display name on autosuggestion
class NameSuggestion extends Component {
  state = {
      value: '', //name when user type
      suggestions: [] //list of name returned by API autocomplete
    };

  // pass input value to async fetch and setstate with returned data
  getSuggestions = (value) => {
    const input = value.trim().toLowerCase();
    axios.get(`https://api.openbrewerydb.org/breweries?by_state=new_york&by_name=${input}`)
      .then(res => {
        if (res.data.length === 0) {
          this.setState({
            suggestions: [{
              notFound: true
            }]
          })
        }
        else {
          this.setState({
            suggestions: res.data
          })
        }
      })
      .catch(error => {
        this.setState({
          suggestions: []
        })
      })
  };

  // get the name value of the suggestion
  getSuggestionValue = suggestion => {
    if (suggestion.notFound) {
      return `Name not found: ${this.state.value}`;
    }
    return suggestion.name;
  };

  // render suggestions and give it some style.
  renderSuggestion = suggestion => {
    if (suggestion.notFound) {
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

  //name change on type
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

  //fired when user click (select) a name from the suggestion box
  onSuggestionSelected = (_event, {suggestion}) => {
    const input = document.getElementsByClassName('react-autosuggest__input')[0];
    if (suggestion.notFound) {
      // debugger
      input.style.cssText = "color: red; border: 1px solid red";
    }
    else {
      input.removeAttribute("style");
      // input.value = "";
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
        focusInputOnSuggestionClick={false}
        inputProps={inputProps}
      />
    );
  }
}

export default NameSuggestion;