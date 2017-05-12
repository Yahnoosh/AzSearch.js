import { connect } from "react-redux";
import * as React from "react";
import { Store, asyncActions, facetsActions, searchParameterActions } from "azsearchstore";
import * as redux from "redux";
import ClearFiltersButton from "../components/ClearFiltersButton";

function getReturnType<RT>(expression: (...params: any[]) => RT): RT {
    return {} as RT;
}

export interface OwnProps {
  css: { [key: string]: string; };
}

const mapDispatchToProps = (dispatch: redux.Dispatch<any>, ownProps: OwnProps) => {
  return {
    onClear: () => {
      dispatch(facetsActions.clearFacetsSelections());
      dispatch(searchParameterActions.setPage(1));
      dispatch(asyncActions.fetchSearchResults);
    }
  };
};

function mapStateToProps(state: Store.SearchState, ownProps: OwnProps) {
  return {
    hasSelectedFacets: checkForAppliedFacets(state.facets.facets),
    beforeFirstRequest: state.results.lastUpdated < 1,
  };
}

function checkForAppliedFacets(facets: { [key: string]: Store.Facet }): boolean {
  return Object.keys(facets).some((key) => {
    const facet = facets[key];
    const hasFilter = facet.filterClause ? true : false;
    return hasFilter;
  });
}

export const stateProps = getReturnType(mapStateToProps);
export const dispatchProps = getReturnType(mapDispatchToProps);

export type PropsType = typeof stateProps & typeof dispatchProps & OwnProps;

type State = {};

export const ClearFiltersButtonContainer = connect(mapStateToProps, mapDispatchToProps)(ClearFiltersButton);