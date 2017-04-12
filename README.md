# AzSearch.js
Automagical UI and sample react controls for [Azure Search](https://docs.microsoft.com/en-us/azure/search/) using [AzSearchStore](https://github.com/EvanBoyle/AzSearchStore). Written in [TypeScript](https://www.typescriptlang.org/).

## Quick note on data
Samples and documentation assume the real estate sample index available through the portal. A demo account is provided for the samples. To create your own service and load the real estate sample [see this guide](https://docs.microsoft.com/en-us/azure/search/search-get-started-portal).

## Contents
* [Installation]()
    * [Node]()
    * [CDN]()
* [Automagic]()
    * [Basic usage]()
* [Components & Containers]()
* [Development]()

## Installation

### CDN

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/azsearch.js/0.0.2/AzSearch.css">
<!-- Dependencies -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/react/15.5.0/react.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/react/15.5.0/react-dom.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/redux/3.6.0/redux.min.js"></script>
<!-- Main -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/azsearch.js/0.0.2/AzSearch.bundle.js"></script>
```

### NPM

```
npm install azsearch.js --save
```

## Automagic

Automagic provides a set of simple APIs to generate a sample search UI. Automagic is a wrapper of [AzSearchStore](https://github.com/EvanBoyle/AzSearchStore) (for state management) and the sample react components in this repo. 

### Basic usage

```js
    // Initialize
    var automagic = new AzSearch.Automagic({ 
        index: "realestate-us-sample", 
        queryKey: "D1CD08C7AC6A1886024E0F23B1824417", 
        service: "azs-playground" });

    // Add a search box on id #seachBox that uses suggester "sg", grabbing some additional fields to display during suggestions.
    automagic.addSearchBox("searchBox",
        {
            highlightPreTag: "<b>",
            highlightPostTag: "</b>",
            suggesterName: "sg",
            select: "number,street,city,region,countryCode"
        });
    // add a results view
    automagic.addResults("results");
    // Adds a pager control << 1 2 3 ... >>
    automagic.addPager("pager");
    // range facet for sqft
    automagic.addRangeFacet("sqftFacet", "sqft", "number", 0, 17000);
    // checkbox facet for numeric field beds
    automagic.addCheckboxFacet("bedsFacet", "beds", "number");
    // checkbox facet for numeric field baths
    automagic.addCheckboxFacet("bathsFacet", "baths", "number");
    // checkbox facet for string field type
    automagic.addCheckboxFacet("typeFacet", "type", "string");
    // checkbox facet for collection field tags
    automagic.addCheckboxFacet("tagsFacet", "tags", "collection");
```

### constructor
* ```constructor(config)```

Sets basic configuration to connect to service. Expects an object of type Config from AzSearchStore

```js
    var automagic = new AzSearch.Automagic({ 
        index: "realestate-us-sample", 
        queryKey: "D1CD08C7AC6A1886024E0F23B1824417", 
        service: "azs-playground" });
```

```ts
    type Config = {
        index: string;
        queryKey: string;
        service: string;
        suggestCallback?: (state: Store.SearchState, postBody: {
            [key: string]: any;
        }) => Promise<any>;
        searchCallback?: (state: Store.SearchState, postBody: {
            [key: string]: any;
        }) => Promise<any>;
    };
```
### addSearchBox
Adds a input field capable of suggestions/autocomplete and executing text searches on the specified htmlID. Optionally takes SuggestionUpdateParameters (from AzSearchStore), a mustache template to customize rendering, or css overrides. When template is not specified, a json representation of the suggestions is shown in stead

```js
    // css class overrides
    var css = {
            searchBox__button: "searchBox__button btn btn-default",
    };
    // mustache template for custom suggestion rendering. Default is formatted JSON when not specified
    var suggestionsTemplate = "{{displayText}} <br/> {{{searchText}}}";
    // Add a search box that uses suggester "sg", grabbing some additional fields to display during suggestions. Use the template defined above
    automagic.addSearchBox("searchBox",
        {
            highlightPreTag: "<b>",
            highlightPostTag: "</b>",
            suggesterName: "sg",
            select: "number,street,city,region,countryCode"
        },
        suggestionsTemplate,
        css);
```

```ts
type SuggestionsParametersUpdate = {
        top?: number;
        filter?: string;
        orderby?: string;
        fuzzy?: boolean;
        highlightPreTag?: string;
        highlightPostTag?: string;
        select?: string;
        searchFields?: string;
        minimumCoverage?: string;
        apiVersion?: SearchApiVersion;
        suggesterName?: string;
    };
```
### addResults
### addPager
### addRangeFacet
### addCheckboxFacet