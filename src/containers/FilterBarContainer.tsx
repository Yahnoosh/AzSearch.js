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
      dispatch(facetsActions.clearFacetsSelections());
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
  return !Object.keys(facets).every((key) => {
    const facet = facets[key];
    switch (facet.type) {
      case "CheckboxFacet":
        return Object.keys(facet.values).every((valueKey) => {
          return !facet.values[valueKey].selected;
        });
      case "RangeFacet":
        return facet.filterClause === "";
    }
  });
}

export const stateProps = getReturnType(mapStateToProps);
export const dispatchProps = getReturnType(mapDispatchToProps);

export type PropsType = typeof stateProps & typeof dispatchProps & OwnProps;

type State = {};

export const FilterBarContainer = connect(mapStateToProps, mapDispatchToProps)(FilterBar);