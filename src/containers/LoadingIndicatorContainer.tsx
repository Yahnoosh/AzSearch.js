import { connect } from "react-redux";
import * as React from "react";
import { Store, asyncActions, facetsActions, searchParameterActions } from "azsearchstore";
import * as redux from "redux";
import LoadingIndicator from "../components/LoadingIndicator";

function getReturnType<RT>(expression: (...params: any[]) => RT): RT {
    return {} as RT;
}

export interface OwnProps {
}

const mapDispatchToProps = (dispatch: redux.Dispatch<any>, ownProps: OwnProps) => {
    return {};
};

function mapStateToProps(state: Store.SearchState, ownProps: OwnProps) {
    return {
        isLoading: state.results.isFetching
    };
};

export const stateProps = getReturnType(mapStateToProps);
export const dispatchProps = getReturnType(mapDispatchToProps);

export type PropsType = typeof stateProps & typeof dispatchProps & OwnProps;
type State = {};

export const LoadingIndicatorContainer = connect(mapStateToProps, mapDispatchToProps)(LoadingIndicator);