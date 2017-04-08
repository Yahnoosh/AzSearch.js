import { connect, Provider } from "react-redux";
import * as React from "react";
import { Store, AzSearchStore } from "azsearchstore";
import * as redux from "redux";
import SearchBoxContainer from "./containers/SearchBoxContainer";
import ResultsContainer from "./containers/ResultsContainer";
import CheckboxFacetContainer from "./containers/CheckboxFacetContainer";
import { render } from "react-dom";

import SearchBox from "./components/SearchBox";
import CheckboxFacet from "./components/CheckboxFacet";
import Results from "./components/Results";

let Components = { SearchBox, CheckboxFacet, Results };
let Containers = { CheckboxFacetContainer, ResultsContainer, SearchBoxContainer };

class Automagic {
    public searchStore: AzSearchStore;

    constructor(config: Store.Config) {
        this.searchStore = new AzSearchStore();
        this.searchStore.setConfig(config);
    }

    public addSearchBox() {
    }
}

export { Components, Containers, Automagic };
