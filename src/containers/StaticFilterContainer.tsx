import { connect} from "react-redux";
import * as React from "react";
import { Store, searchParameterActions, facetsActions, asyncActions } from "azsearchstore";
import * as redux from "redux";
import StaticFilter from "../components/StaticFilter";

function getReturnType<RT>(expression: (...params: any[]) => RT): RT {
    return {} as RT;
}

export interface OwnProps {
  filterKey: string;
  filters: {filter: string, displayName?: string}[];
  css: { [key: string]: string };
  title: string;
}

const mapDispatchToProps = (dispatch: redux.Dispatch<any>, ownProps: OwnProps) => {
  return {
    onFilterChange: (filter: string) => {
      dispatch(facetsActions.setGlobalFilter(ownProps.filterKey, filter));
      dispatch(searchParameterActions.setPage(1));
      dispatch(asyncActions.fetchSearchResultsFromFacet);
    }
  };
};

function mapStateToProps(state: Store.SearchState, ownProps: OwnProps) {
  return {
    beforeFirstRequest: state.results.lastUpdated < 1,
    css: ownProps.css,
    activeFilter: state.facets.globalFilters[ownProps.filterKey]
  };
}

export const stateProps = getReturnType(mapStateToProps);
export const dispatchProps = getReturnType(mapDispatchToProps);

export type PropsType = typeof stateProps & typeof dispatchProps & OwnProps;

type State = {};

export const StaticFilterContainer = connect(mapStateToProps, mapDispatchToProps)(StaticFilter);