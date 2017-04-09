import { Provider } from "react-redux";
import { Store, AzSearchStore } from "azsearchstore";
import { render } from "react-dom";
import * as React from "react";
import SearchBoxContainer from "./containers/SearchBoxContainer";
import ResultsContainer from "./containers/ResultsContainer";
import { CheckboxFacetContainer, OwnProps }from "./containers/CheckboxFacetContainer";

import SearchBox from "./components/SearchBox";
import CheckboxFacet from "./components/CheckboxFacet";
import Results from "./components/Results";

let Components = { SearchBox, CheckboxFacet, Results };
let Containers = { CheckboxFacetContainer, ResultsContainer, SearchBoxContainer };

class Automagic {
    public store: AzSearchStore;

    constructor(config: Store.Config) {
        this.store = new AzSearchStore();
        this.store.setConfig(config);
    }

    public addSearchBox(htmlId: string, parameters?: Store.SuggestionsParametersUpdate) {
        this.store.updateSuggestionsParameters(parameters);
        render(
            <Provider store={this.store.store}>
                <SearchBoxContainer />
            </Provider>,
            document.getElementById(htmlId)
        );
    }

    public addCheckboxFacet(htmlId: string, fieldName: string, isNumeric: boolean) {
        this.store.addCheckboxFacet(fieldName, isNumeric);
        render(
            <Provider store={this.store.store}>
                <CheckboxFacetContainer facet={fieldName} />
            </Provider>,
            document.getElementById(htmlId)
        );
    }

    public addResults(htmlId: string, parameters?: Store.SearchParametersUpdate) {
        render(
            <Provider store={this.store.store}>
                <ResultsContainer />
            </Provider>,
            document.getElementById(htmlId)
        );
    }
}

export { Components, Containers, Automagic };
