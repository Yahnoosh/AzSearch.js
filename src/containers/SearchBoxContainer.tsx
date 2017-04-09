/// <reference path="../types/hogan.js.d.ts" />
import { Template } from "hogan.js";
import { connect } from "react-redux";
import * as React from "react";
import { Store, inputActions, suggestionsActions, asyncActions, facetsActions } from "azsearchstore";
import * as redux from "redux";
import SearchBox from "../components/SearchBox";

function getReturnType<RT>(expression: (...params: any[]) => RT): RT {
    return {} as RT;
}

export interface OwnProps {
    template: Template;
}

const mapDispatchToProps = (dispatch: redux.Dispatch<any>) => {
    return {
        onInputChange: (input: string) => {
            dispatch(inputActions.setInput(input));
        },
        suggest: () => {
            dispatch(asyncActions.suggest);
        },
        clearSuggestions: () => {
            dispatch(suggestionsActions.clearSuggestions());
        },
        clearFacetsAndSearch: () => {
            dispatch(facetsActions.clearFacetsSelections());
            dispatch(asyncActions.fetchSearchResults);
        }
    };
};

function mapStateToProps(state: Store.SearchState, ownProps: OwnProps) {
    return {
        input: state.parameters.input,
        preTag: state.parameters.suggestionsParameters.highlightPreTag,
        postTag: state.parameters.suggestionsParameters.highlightPostTag,
        suggestions: state.suggestions.suggestions,
        template: ownProps.template
    };
}

export const stateProps = getReturnType(mapStateToProps);
export const dispatchProps = getReturnType(mapDispatchToProps);

export type PropsType = typeof stateProps & typeof dispatchProps;
type State = {};

export const SearchBoxContainer = connect(mapStateToProps, mapDispatchToProps)(SearchBox);