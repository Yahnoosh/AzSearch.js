import * as React from "react";
import { PropsType } from "../containers/StaticFilterContainer";
import * as objAssign from "object-assign";
import { Store } from "azsearchstore";
import { defaultCss } from "../utils/css";

export type State = {};

class StaticFilter extends React.PureComponent<PropsType, State> {
  render() {
    const { filters, beforeFirstRequest, onFilterChange, activeFilter, title, filterKey } = this.props;
    let css = objAssign({}, defaultCss, this.props.css);

    if (beforeFirstRequest) return <div></div>;

    let options = filters.map((filter, index) => {
      return <option key={index} selected={filter.filter === activeFilter} value={filter.filter}>{filter.displayName ? filter.displayName : filter.filter}</option>;
    });

    let onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      onFilterChange(event.target.value);
    };

    let container = <div className={css.sorting__sortBy}>
      <div className={css.searchFacets__facetHeaderContainer}>
          <h4 className={css.searchFacets__facetHeader}>
              <a data-toggle="collapse" className={css.searchFacets__facetHeaderLink}  >
                  <span className={css.searchFacets__facetHeaderIconOpen} aria-hidden="true"></span> { title ? title : filterKey}
              </a>
          </h4>
      </div>
      <div className={css.searchFacets__facetControlContainer}>
        <div className={css.searchFacets__facetControlList}>
          <select className={css.sorting__sortByControl} onChange={onChange}>
            {options}
          </select>
        </div>
      </div>
    </div>;

    return (container);
  }
}

export default StaticFilter;