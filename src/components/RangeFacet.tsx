import * as React from "react";
import { PropsType } from "../containers/RangeFacetContainer";
import * as objAssign from "object-assign";
import { Store } from "azsearchstore";
import { defaultCss } from "../utils/css";
import { Range } from "rc-slider";
import * as Numeral from "numeral";

export type State = {};

class RangeFacet extends React.Component<PropsType, State> {
    render() {
        const facet = this.props.facet as Store.RangeFacet;
        let css = objAssign({}, defaultCss, this.props.css);
        const { onRangeChange, afterRangeChange, loadedResultsCount } = this.props;

        let onChange = (value: number[]) => {
            onRangeChange(value[0], value[1]);
        };

        let upperBoundLabel = facet.filterUpperBound === facet.max ? " <" : "";

        if (!facet || loadedResultsCount < 1) {
            return <div></div>;
        }

        return (
            <div className={css.searchFacets__rangeFacet}>
                <div className={css.searchFacets__facetHeaderContainer}>
                    <h4 className={css.searchFacets__facetHeader}>
                        <a data-toggle="collapse" className={css.searchFacets__facetHeaderLink}  >
                            <span className={css.searchFacets__facetHeaderIconOpen} aria-hidden="true"></span> {facet.key}
                        </a>
                    </h4>
                </div>
                <div className={css.searchFacets__facetControlContainer}>
                    <ul className={css.searchFacets__facetControlList}>
                        <li className={css.searchFacets__facetControl}>
                            <Range
                                value={[facet.filterLowerBound,
                                facet.filterUpperBound]}
                                min={facet.min}
                                max={facet.max}
                                onChange={onChange}
                                onAfterChange={afterRangeChange}
                                className={css.searchFacets__sliderContainer}/>
                        </li>
                        <li className={css.searchFacets__facetControlRangeLabel}>
                            <span className={css.searchFacets__facetControlRangeLabelMin}>
                                {Numeral(facet.filterLowerBound).format("0.0a")}
                            </span>
                            <span className={css.searchFacets__facetControlRangeLabelRange}>  <b> {"< " + facet.middleBucketCount + " <"} </b> </span>
                            <span className={css.searchFacets__facetControlRangeLabelMax}>
                                {Numeral(facet.filterUpperBound).format("0.0a") + upperBoundLabel}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default RangeFacet;


