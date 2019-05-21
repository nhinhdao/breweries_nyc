export default function nycBreweriesReducer(state = defaultState, action) {
  let list, types, brewery;
  switch (action.type) {
    //fire when the main query is loading 
    case 'LOADING_QUERY':
      return {
        ...state,
        loading: true
      }
    //add all nyc breweries to store
    case 'GET_NYC_BREWERIES':
      types = getType(action.payload)
      return {
        ...state,
        types: types,
        breweries: action.payload,
        loading: false
      };
    //add breweries by type to store
    case 'SEARCH_BREWERIES_BY_TYPE':
      list = action.payload.map(place => getPlace(place))
      return {
        ...state,
        breweries: list,
        loading: false
      };
    //added brewery when user search by name to store
    case 'SEARCH_BREWERIES_BY_NAME':
      brewery = getPlace(action.payload)
      return {
        ...state,
        breweryByName: brewery,
        loading: false
      };
    //set a brewery when user click on a name from suggestion
    case 'SET_BREWERY':
      brewery = getPlace(action.payload)
      return {
        ...state,
        breweryByName: brewery,
        loading: false
      };
    default:
      return state;
  }
}

//default store with empty arrays
const defaultState = {
  breweries: [],
  types: [],
  breweryByName: {},
  loading: false
}

//capitalize brewery type
const setCap = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

// get full address of a brewery
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

//get full details of a brewery
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
    phone: place.phone ? place.phone : 'N/A',
    website_url: place.website_url ? place.website_url : 'N/A'
  }
}

// get all types to display on the type suggestion dropdown box
const getType = places => {
  let mixTypes = places.map(place => setCap(place.brewery_type));
  return [...new Set(mixTypes)]
}