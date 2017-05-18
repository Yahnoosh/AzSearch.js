import { connect} from "react-redux";
import * as React from "react";
import { Store, searchParameterActions, asyncActions } from "azsearchstore";
import * as redux from "redux";
import SortBy from "../components/SortBy";

function getReturnType<RT>(expression: (...params: any[]) => RT): RT {
    return {} as RT;
}

export interface OwnProps {
  fields: {displayName: string, orderbyClause: string }[];
  css: { [key: string]: string };
}

const mapDispatchToProps = (dispatch: redux.Dispatch<any>, ownProps: OwnProps) => {
  return {
    onSortChange: (fieldName: string) => {
      const orderby = fieldName ? fieldName : "";
      dispatch(searchParameterActions.updateSearchParameters({orderby}));
      dispatch(searchParameterActions.setPage(1));
      dispatch(asyncActions.fetchSearchResultsFromFacet);
    }
  };
};

function mapStateToProps(state: Store.SearchState, ownProps: OwnProps) {
  return {
    beforeFirstRequest: state.results.lastUpdated < 1,
    css: ownProps.css,
    orderby: state.parameters.searchParameters.orderby
  };
}

export const stateProps = getReturnType(mapStateToProps);
export const dispatchProps = getReturnType(mapDispatchToProps);

export type PropsType = typeof stateProps & typeof dispatchProps & OwnProps;

type State = {};

export const SortByContainer = connect(mapStateToProps, mapDispatchToProps)(SortBy);