/// <reference path="./types/hogan.js.d.ts" />

import { Provider } from "react-redux";
import { Store, AzSearchStore } from "azsearchstore";
import { render } from "react-dom";
import { compile } from "hogan.js";
import * as React from "react";
import { SearchBoxContainer, OwnProps as BoxOwnProps} from "./containers/SearchBoxContainer";
import { ResultsContainer, OwnProps as ResultsOwnProps }from "./containers/ResultsContainer";
import { CheckboxFacetContainer, OwnProps as CheckboxOwnProps } from "./containers/CheckboxFacetContainer";
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

    public addSearchBox(htmlId: string, parameters?: Store.SuggestionsParametersUpdate, mustacheTemplate?: string, cssClasses?: { [key: string]: string; } ) {
        this.store.updateSuggestionsParameters(parameters);
        let template = mustacheTemplate ? compile(mustacheTemplate) : null;
        render(
            <Provider store={this.store.store}>
                <SearchBoxContainer template={template} css={cssClasses}/>
            </Provider>,
            document.getElementById(htmlId)
        );
    }

    public addCheckboxFacet(htmlId: string, fieldName: string, isNumeric: boolean, cssClasses?: { [key: string]: string; }) {
        this.store.addCheckboxFacet(fieldName, isNumeric);
        render(
            <Provider store={this.store.store}>
                <CheckboxFacetContainer facet={fieldName} css={cssClasses}/>
            </Provider>,
            document.getElementById(htmlId)
        );
    }

    public addResults(htmlId: string, parameters?: Store.SearchParametersUpdate, mustacheTemplate?: string, cssClasses?: { [key: string]: string; }) {
        let template = mustacheTemplate ? compile(mustacheTemplate) : null;
        render(
            <Provider store={this.store.store}>
                <ResultsContainer template={template} css={cssClasses}/>
            </Provider>,
            document.getElementById(htmlId)
        );
    }
}

export { Components, Containers, Automagic };