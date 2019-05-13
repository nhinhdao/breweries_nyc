export default function nycBreweriesReducer(state = defaultState, action) {
  let list;
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
      list = getPlaces(action.payload);
      return {
        ...state,
        breweriesByName: list,
        loading: false
      };
    case 'SEARCH_BREWERIES_BY_TYPE':
      list = getPlaces(action.payload);
      return {
        ...state,
        breweriesByType: list,
        loading: false
      };
    default:
      return state;
  }
}

const defaultState = {
  allBreweries: [],
  breweriesByName: [],
  breweriesByType: [],
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

const getPlaces = places => {
  return places.map(place => place = {
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
  })
}