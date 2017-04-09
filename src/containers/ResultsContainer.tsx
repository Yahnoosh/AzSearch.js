/// <reference path="../types/hogan.js.d.ts" />
import { Template } from "hogan.js";
import { connect } from "react-redux";
import * as React from "react";
import { Store, inputActions, suggestionsActions, asyncActions, facetsActions } from "azsearchstore";
import * as redux from "redux";
import Results from "../components/Results";

function getReturnType<RT>(expression: (...params: any[]) => RT): RT {
    return {} as RT;
}

export interface OwnProps {
    template: Template;
    css: { [key: string]: string; };
}

const mapDispatchToProps = (dispatch: redux.Dispatch<any>) => {
    return {};
};

const mapStateToProps = (state: Store.SearchState, ownProps: OwnProps) => {
    return {
        results: state.results.results,
        template: ownProps.template,
        css: ownProps.css
    };
};

export const stateProps = getReturnType(mapStateToProps);
export const dispatchProps = getReturnType(mapDispatchToProps);

export type PropsType = typeof stateProps & typeof dispatchProps;
type State = {};

export const ResultsContainer = connect(mapStateToProps, mapDispatchToProps)(Results);