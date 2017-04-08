import { connect } from 'react-redux';
import * as React from "react";
import { Store, asyncActions, facetsActions } from "azsearchstore";
import * as redux from "redux";
import CheckboxFacet from "../components/CheckboxFacet";

function getReturnType<RT>(expression: (...params: any[])=>RT): RT {
    return {} as RT;
}          

export interface OwnProps {
    facet: string
}

const mapDispatchToProps = (dispatch: redux.Dispatch<any>, ownProps: OwnProps) => {
    return {
        toggleFacet: (value: string) => {
            dispatch(facetsActions.toggleCheckboxFacetSelection(ownProps.facet, value));
            dispatch(asyncActions.fetchSearchResultsFromFacet);
        },
    }
}

function mapStateToProps(state: Store.SearchState, ownProps: OwnProps) {
    return {
        facet: state.facets.facets[ownProps.facet],
    }
}

export const stateProps = getReturnType(mapStateToProps);
export const dispatchProps = getReturnType(mapDispatchToProps);

export type PropsType = typeof stateProps & typeof dispatchProps;
type State = {};

const FacetContainer = connect(mapStateToProps, mapDispatchToProps)(CheckboxFacet);

export default FacetContainer;