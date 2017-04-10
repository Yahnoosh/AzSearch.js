import { connect } from "react-redux";
import * as React from "react";
import { Store, asyncActions, searchParameterActions as spActions } from "azsearchstore";
import * as redux from "redux";
import Pager from "../components/Pager";

function getReturnType<RT>(expression: (...params: any[]) => RT): RT {
    return {} as RT;
}

export interface OwnProps {
    css: { [key: string]: string; };
}

const mapDispatchToProps = (dispatch: redux.Dispatch<any>, ownProps: OwnProps) => {
    return {
        pageUp: () => {
            dispatch(spActions.incrementSkip());
            // fetchSearchResultsFromFacets maintains current facet selections
            dispatch(asyncActions.fetchSearchResultsFromFacet);
        },
        pageDown: () => {
            dispatch(spActions.decrementSkip());
            dispatch(asyncActions.fetchSearchResultsFromFacet);
        },
        loadPage: (page: number) => {
            dispatch(spActions.setPage(page));
            dispatch(asyncActions.fetchSearchResultsFromFacet);
        }
    };
};

function mapStateToProps(state: Store.SearchState, ownProps: OwnProps) {
    return {
        top: state.parameters.searchParameters.top,
        skip: state.parameters.searchParameters.skip,
        count: state.results.count,
        loadedResultsCount: state.results.results.length,
        css: ownProps.css
    };
};

export const stateProps = getReturnType(mapStateToProps);
export const dispatchProps = getReturnType(mapDispatchToProps);

export type PropsType = typeof stateProps & typeof dispatchProps;
type State = {};

export const PagerContainer = connect(mapStateToProps, mapDispatchToProps)(Pager);