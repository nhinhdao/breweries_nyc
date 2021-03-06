import axios from 'axios';

// dispatch all NYC breweries to store
export function getNYCBreweries() {
  const url = 'https://breweries-api.herokuapp.com/api/v1/places'
  return dispatch => {
    dispatch({type: "LOADING_QUERY"});
    return axios.get(url)
      .then(resp => dispatch({
        type: 'GET_NYC_BREWERIES',
        payload: resp.data
      }))
      .catch(error => console.log(error));
  }
}

// dispatch breweries by type to store
export function searchBreweriesByType(type) {
  const url = `https://api.openbrewerydb.org/breweries?by_state=new_york&by_type=${type}`
  return dispatch => {
    dispatch({type: "LOADING_QUERY"});
    return axios.get(url)
      .then(resp => dispatch({
        type: 'SEARCH_BREWERIES_BY_TYPE',
        payload: resp.data
      }))
      .catch(error => console.log(error));
  }
}

//dispatch brewery by name to store
export function searchBreweriesByID(code) {
  const url = `https://api.openbrewerydb.org/breweries/${code}`
  return dispatch => {
    dispatch({type: "LOADING_QUERY"});
    return axios.get(url)
      .then(resp => dispatch({
        type: 'SEARCH_BREWERIES_BY_NAME',
        payload: resp.data
      }))
      .catch(error => console.log(error));
  }
}