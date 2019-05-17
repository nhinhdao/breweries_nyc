# Breweries NYC Front End Page 

**Front end page** isplays 2 components: **ListBreweries** for all breweries and **Brewery** for individual brewery

1. **ListBreweries** use `Axios` to get data from back end for static list.
  - `componentDidMount()` for fetching all breweries from back-end
  - List is displayed on left panel with name, type, address and website (**clickable**)
  - Upon click, each place on list will pass a Brewery as a prop to Brewery component.

2. **Brewery** take a brewery as prop and is rendered on right panel
  - Includes a full list of details and a preview picture (**Microlink Package**)
  - Includes a map display the position of that brewery (**Google react map**)

**Extra contents** (worth considering)

3. A full map of all breweries upon clicking on button `Learn More` with a marker and a popup of brewery's information

4. Option for searching for breweries by name or type and use the above components to display.
  -  Use `axios` for fetching data from `OpenBreweriesBD` for dynamic search
  - `searchBreweriesByName(name)` and `searchBreweriesByType(type)` for name and type search

5. Suggestion/Autocomplete when client type in a name or a type of a brewery

# Task list:

- [x] Build a component to displays a list of breweries
- [x] Build a component to display the details of a brewery
- [x] Components show a correspondent map with markers.
- [x] Apply SASS and Semantic UI React for styling
- [x] Build Rails API back end to seed and return static data
- [x] Host back end site to Heroku ([Breweries API back end](https://breweries-api.herokuapp.com/api/v1/places))
- [x] Add View Breweries by Map, List, Grid
- [x] Add dynamiccally search for breweries by Name and Type
- [x] Add Autosuggest when user search for breweries using real data
- [x] Use redux to handle data fetching and persist data to store
- [x] Host front end site to Heroku ([Breweries Front End](https://nycbreweries.herokuapp.com/))
