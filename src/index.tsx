import { connect, Provider } from 'react-redux';
import * as React from "react";
import { Store, AzSearchStore } from "azsearchstore";
import * as redux from "redux";
import SearchBoxContainer from "./containers/SearchBoxContainer";
import ResultsContainer from "./containers/ResultsContainer";
import FacetContainer from "./containers/FacetContainer";
import { render } from "react-dom";

const store = new AzSearchStore();

store.setConfig({ index: "channel9", queryKey: "insert key here", service: "azs-demos" });
let suggestionsProcessor = (suggestions: {}[]) => {
    return suggestions.map((suggestion: any) => {
        suggestion.searchText = suggestion["@search.text"];
        return suggestion;
    });
};

store.setSuggestionsProcessor(suggestionsProcessor);
store.updateSuggestionsParameters({highlightPreTag: "<b>", highlightPostTag: "</b>", suggesterName: "sg"});
store.addCheckboxFacet("groupName", false);
store.addCheckboxFacet("language", false);
store.addCheckboxFacet("type", false);

render(
    <Provider store={store.store}>
        <SearchBoxContainer />
    </Provider>,
    document.getElementById("searchBox")
);

render(
    <Provider store={store.store}>
        <ResultsContainer />
    </Provider>,
    document.getElementById("results")
);

render(
    <Provider store={store.store}>
        <FacetContainer facet={"groupName"} />
    </Provider>,
    document.getElementById("groupNameFacet")
);

render(
    <Provider store={store.store}>
        <FacetContainer facet={"language"} />
    </Provider>,
    document.getElementById("languageFacet")
);

render(
    <Provider store={store.store}>
        <FacetContainer facet={"type"} />
    </Provider>,
    document.getElementById("typeFacet")
);