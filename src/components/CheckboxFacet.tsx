import * as React from "react";
import { PropsType } from "../containers/CheckboxFacetContainer";
import * as objAssign from "object-assign";
import { Store } from "azsearchstore";

let facetCssClasses = {
    searchFacets__checkboxFacet: "panel-body",
    searchFacets__rangeFacet: "panel-body",
    searchFacets__facetHeaderContainer: "panel-heading",
    searchFacets__facetHeader: "panel-title",
    searchFacets__facetHeaderIconCollapsed: "indicator glyphicon glyphicon glyphicon-triangle-right",
    searchFacets__facetHeaderIconOpen: "indicator glyphicon glyphicon glyphicon-triangle-bottom",
    searchFacets__facetControlContainer: "panel-collapse collapse in",
    searchFacets__facetControlList: "list-group",
    searchFacets__facetControl: "list-group-item",
    searchFacets__facetControlCheckboxWrapper: "checkbox",
    searchFacets__facetControlRangeLabel: "list-group-item center-block text-center",
};

let defaultCss = {
    searchFacets__rangeFacet: "searchResults__rangeFacet",
    searchFacets__checkboxFacet: "searchResults__checkboxFacet",
    searchFacets__facetHeaderContainer: "searchResults__facetHeader-container",
    searchFacets__facetHeader: "searchResults__facetHeader",
    searchFacets__facetHeaderLink: "searchResults__facetHeader-link",
    searchFacets__facetHeaderIconCollapsed: "searchResults__facetHeader-icon--collapsed",
    searchFacets__facetHeaderIconOpen: "searchResults__facetHeader-icon--open",
    searchFacets__facetControlContainer: "searchResults__facetControl-container",
    searchFacets__facetControlList: "searchResults__facetControl-list",
    searchFacets__facetControl: "searchResults__facetControl",
    searchFacets__facetControlCheckboxWrapper: "searchResults__facetControl-checkbox-wrapper",
    searchFacets__facetControlCheckboxChecked: "searchResults__facetControl-checkbox--checked",
    searchFacets__facetControlCheckboxCheckedHover: "searchResults__facetControl-checkbox--checkedHover",
    searchFacets__facetControlCheckboxUnchecked: "searchResults__facetControl-checkbox--unchecked",
    searchFacets__facetControlCheckboxUncheckedHover: "searchResults__facetControl-checkbox--uncheckedHover",
    searchFacets__facetControlCheckbox: "searchResults__facetControl-checkbox",
    searchFacets__facetControlRangeLabel: "searchResults__facetControl-rangeLabel",
    searchFacets__facetControlRangeLabelMin: "searchResults__facetControl-rangeLabelMin",
    searchFacets__facetControlRangeLabelMax: "searchResults__facetControl-rangeLabelMax",
    searchFacets__facetControlRangeLabelRange: "searchResults__facetControl-rangeLabelRange"
};
const cssClasses = objAssign(defaultCss, facetCssClasses);


export type State = {};

class CheckboxFacet extends React.Component<PropsType, State> {
    render() {
        const facet = this.props.facet as Store.CheckboxFacet;
        let toggleFacet = this.props.toggleFacet;
        // input props

        if (!facet || Object.keys(facet.values).length < 1) {
            return <div></div>;
        }

        let checkboxes = Object.keys(facet.values).map((valueKey: string, index: number) => {
            const value = facet.values[valueKey];
            return (
                <li key={index + 1} className={cssClasses.searchFacets__facetControl}>
                    <div className={cssClasses.searchFacets__facetControlCheckboxWrapper}>
                        <label>
                            <input type="checkbox" className={cssClasses.searchFacets__facetControlCheckbox} onChange={toggleFacet.bind(null, valueKey)} checked={value.selected} /> {value.value}({value.count})
                                        </label>
                    </div>
                </li>
            );
        });


        return (
            <div className={cssClasses.searchFacets__checkboxFacet}>
                <div className={cssClasses.searchFacets__facetHeaderContainer}>
                    <h4 className={cssClasses.searchFacets__facetHeader}>
                        <a data-toggle="collapse" className={cssClasses.searchFacets__facetHeaderLink}  >
                            <span className={cssClasses.searchFacets__facetHeaderIconOpen} aria-hidden="true"></span> {facet.key}
                        </a>
                    </h4>
                </div>
                <div className={cssClasses.searchFacets__facetControlContainer}>
                    <ul className={cssClasses.searchFacets__facetControlList}>
                        {checkboxes}
                    </ul>
                </div>
            </div>
        );
    }
}

export default CheckboxFacet;


