import axios from 'axios';

export function getNYCBreweries() {
  const url = 'https://localhost:3001/api/v1/places'
  return dispatch => {
    dispatch({type: "LOADING_QUERY"});
    return axios.get(url)
      .then(resp => dispatch({type: 'GET_NYC_BREWERIES', payload: resp.data}))
      .catch(error => console.log(error));
  }
}

export function searchBreweriesByName(name) {
  const url = `https://api.openbrewerydb.org/breweries?by_state=new_york&by_name=${name}`
  return dispatch => {
    dispatch({type: "LOADING_QUERY"});
    return axios.get(url)
      .then(resp => dispatch({type: 'SEARCH_BREWERIES_BY_NAME', payload: resp.data}))
      .catch(error => console.log(error));
  }
}

export function searchBreweriesByType(type) {
  const url = `https://api.openbrewerydb.org/breweries?by_state=new_york&by_type=${type}`
  return dispatch => {
    dispatch({type: "LOADING_QUERY"});
    return axios.get(url)
      .then(resp => dispatch({type: 'SEARCH_BREWERIES_BY_TYPE', payload: resp.data.reviews}))
      .catch(error => console.log(error));
  }
}
