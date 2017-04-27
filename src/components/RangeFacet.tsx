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
        const { onRangeChange, afterRangeChange, loadedResultsCount, lastUpdated } = this.props;
        let lowerValue;
        let upperValue;
        let lowerLabel;
        let upperLabel;
        let minValue;
        let maxValue;
        switch (facet.dataType) {
            case "number":
                lowerValue = facet.filterLowerBound as number;
                upperValue = facet.filterUpperBound as number;
                lowerLabel = Numeral(facet.filterLowerBound).format("0.0a");
                upperLabel = Numeral(facet.filterUpperBound).format("0.0a");
                minValue = facet.min as number;
                maxValue = facet.max as number;
                break;
            case "date":
                lowerValue = (facet.filterLowerBound as Date).getTime();
                upperValue = (facet.filterUpperBound as Date).getTime();
                lowerLabel = <span> {(facet.filterLowerBound as Date).toISOString()} <br /> </span>;
                upperLabel = <span> <br /> {(facet.filterUpperBound as Date).toISOString()} </span>;
                minValue = (facet.min as Date).getTime();
                maxValue = (facet.max as Date).getTime();
                break;
        }
        let onChange = (value: number[]) => {
            const isDate = facet.dataType === "date";
            let lower = isDate ? new Date(value[0]) : value[0];
            let upper = isDate ? new Date(value[1]) : value[1];
            onRangeChange(lower, upper);
        };
        let upperBoundLabel = facet.filterUpperBound === facet.max ? " <" : "";

        // todo with advanced faceting make display condition: !(facet.lowerBucketCount + facet.middleBucketCount + facet.upperBucketCount)
        if (!facet || !lastUpdated) {
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
                                value={[lowerValue,
                                    upperValue]}
                                min={minValue}
                                max={maxValue}
                                onChange={onChange}
                                onAfterChange={afterRangeChange}
                                step={1}
                                pushable={true}
                                className={css.searchFacets__sliderContainer} />
                        </li>
                        <li className={css.searchFacets__facetControlRangeLabel}>
                            <span className={css.searchFacets__facetControlRangeLabelMin}>
                                {lowerLabel}
                            </span>
                            <span className={css.searchFacets__facetControlRangeLabelRange}>  <b> {"< " + numeral(facet.middleBucketCount).format("0,0") + " <"} </b> </span>
                            <span className={css.searchFacets__facetControlRangeLabelMax}>
                                {upperLabel} {upperBoundLabel}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default RangeFacet;


