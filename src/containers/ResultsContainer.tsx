import { connect } from 'react-redux';
import * as React from "react";
import { Store, inputActions, suggestionsActions, asyncActions, facetsActions } from "azsearchstore";
import * as redux from "redux";
import Results from "../components/Results";

function getReturnType<RT>(expression: (...params: any[])=>RT): RT {
    return {} as RT;
}        

const mapDispatchToProps = (dispatch: redux.Dispatch<any>) => {
    return {};
}

function mapStateToProps(state: Store.SearchState) {
    return {
        results: state.results.results
    }
}

export const stateProps = getReturnType(mapStateToProps);
export const dispatchProps = getReturnType(mapDispatchToProps);

export type PropsType = typeof stateProps & typeof dispatchProps;
type State = {};

const ResultsContainer = connect(mapStateToProps, mapDispatchToProps)(Results);

export default ResultsContainer;