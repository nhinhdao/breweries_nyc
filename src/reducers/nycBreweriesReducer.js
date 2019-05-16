export default function nycBreweriesReducer(state = defaultState, action) {
  let list, types, brewery;
  switch (action.type) {
    case 'LOADING_QUERY':
      return {
        ...state,
        loading: true
      }
    case 'GET_NYC_BREWERIES':
      types = getType(action.payload)
      return {
        ...state,
        types: types,
        breweries: action.payload,
        loading: false
      };
    case 'SEARCH_BREWERIES_BY_TYPE':
      list = action.payload.map(place => getPlace(place))
      return {
        ...state,
        breweries: list,
        loading: false
      };
    case 'SEARCH_BREWERIES_BY_NAME':
      brewery = getPlace(action.payload)
      return {
        ...state,
        breweryByName: brewery,
        loading: false
      };
    case 'SET_BREWERY':
      brewery = getPlace(action.payload)
      return {
        ...state,
        breweryByName: brewery,
        loading: false
      };
    case 'GET_SUGGESTION':
      return {
        ...state,
        suggestion: action.payload,
        loading: false
      };
    default:
      return state;
  }
}

const defaultState = {
  breweries: [],
  suggestion: [],
  types: [],
  breweryByName: {},
  loading: false
}

const setCap = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

const getAddress = (place) => {
  if (place.street.length > 0 && place.city.length > 0) {
    return `${place.street}, ${place.city}, New York`
  }
  else if (place.street.length === 0 && place.city.length > 0) {
    return `${place.city}, New York`
  }
  else {
    return "New York"
  }
}

const getPlace = place => {
  return {
    id: place.id,
    name: place.name,
    brewery_type: setCap(place.brewery_type),
    address: getAddress(place),
    postal_code: place.postal_code,
    country: place.country,
    longitude: place.longitude ? place.longitude : -73.935242,
    latitude: place.latitude ? place.latitude : 40.730610,
    phone: place.phone,
    website_url: place.website_url
  }
}

const getType = places => {
  let mixTypes = places.map(place => setCap(place.brewery_type));
  return [...new Set(mixTypes)]
}