export default function nycBreweries(state = defaultState, action) {
  switch (action.type) {
    case 'LOADING_QUERY':
      return {
        ...state,
        loading: true
      }
    case 'GET_NYC_BREWERIES':
      return {
        ...state,
        allBreweries: action.payload,
        loading: false
      };
    case 'SEARCH_BREWERIES_BY_NAME':
      return {
        ...state,
        breweriesByName: action.payload,
        loading: false
      };
    case 'SEARCH_BREWERIES_BY_TYPE':
      return {
        ...state,
        breweriesByType: action.payload,
        loading: false
      };
    default:
      return state;
  }
}

const defaultState = {
  allBrewries: [],
  breweriesByName: [],
  breweriesByType: [],
  loading: false
}

