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

