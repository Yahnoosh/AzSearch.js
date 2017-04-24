import * as React from "react";
import { PropsType } from "../containers/CheckboxFacetContainer";
import * as objAssign from "object-assign";
import { Store } from "azsearchstore";
import { defaultCss } from "../utils/css";

export type State = {};

class CheckboxFacet extends React.Component<PropsType, State> {
    render() {
        const facet = this.props.facet as Store.CheckboxFacet;
        let css = objAssign({}, defaultCss, this.props.css);
        let toggleFacet = this.props.toggleFacet;
        // input props

        if (!facet || Object.keys(facet.values).length < 1) {
            return <div></div>;
        }

        let checkboxes = Object.keys(facet.values).map((valueKey: string, index: number) => {
            const value = facet.values[valueKey];
            const countDisplay = value.count ? `(${value.count})` : "";

            return (
                <li key={index + 1} className={css.searchFacets__facetControl}>
                    <div className={css.searchFacets__facetControlCheckboxWrapper}>
                        <label className="checkboxLabel">
                            <input type="checkbox" className={css.searchFacets__facetControlCheckbox} onChange={toggleFacet.bind(null, valueKey)} checked={value.selected}/> {value.value + " "}{countDisplay}
                        </label>
                    </div>
                </li>
            );
        });


        return (
            <div className={css.searchFacets__checkboxFacet}>
                <div className={css.searchFacets__facetHeaderContainer}>
                    <h4 className={css.searchFacets__facetHeader}>
                        <a data-toggle="collapse" className={css.searchFacets__facetHeaderLink}  >
                            <span className={css.searchFacets__facetHeaderIconOpen} aria-hidden="true"></span> {facet.key}
                        </a>
                    </h4>
                </div>
                <div className={css.searchFacets__facetControlContainer}>
                    <ul className={css.searchFacets__facetControlList}>
                        {checkboxes}
                    </ul>
                </div>
            </div>
        );
    }
}

export default CheckboxFacet;


