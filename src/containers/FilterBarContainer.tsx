import { connect } from "react-redux";
import * as React from "react";
import { Store, asyncActions, facetsActions, searchParameterActions } from "azsearchstore";
import * as redux from "redux";
import FilterBar from "../components/FilterBar";

function getReturnType<RT>(expression: (...params: any[]) => RT): RT {
    return {} as RT;
}

export interface OwnProps {
}

const mapDispatchToProps = (dispatch: redux.Dispatch<any>, ownProps: OwnProps) => {
  return {
    onClear: () => {
      dispatch(facetsActions.clearFacetsSelections);
      dispatch(searchParameterActions.setPage(1));
      dispatch(asyncActions.fetchSearchResults);
    }
  };
};

function mapStateToProps(state: Store.SearchState, ownProps: OwnProps) {
  return {
    hasSelectedFacets: checkForAppliedFacets(state.facets.facets)
  };
}

function checkForAppliedFacets(facets: { [key: string]: Store.Facet }) {
  for (let facetKey in facets) {
    let checkboxFacet = facets[facetKey] as Store.CheckboxFacet;
    for (let checkboxFacetItemKey in checkboxFacet.values) {
      let item = checkboxFacet.values[checkboxFacetItemKey];
      if (item.selected) {;
        return true;
      }
    }
  }
  return false;
}

export const stateProps = getReturnType(mapStateToProps);
export const dispatchProps = getReturnType(mapDispatchToProps);

export type PropsType = typeof stateProps & typeof dispatchProps & OwnProps;

type State = {};

export const FilterBarContainer = connect(mapStateToProps, mapDispatchToProps)(FilterBar);