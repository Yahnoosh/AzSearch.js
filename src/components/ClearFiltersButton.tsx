import * as React from "react";
import { PropsType } from "../containers/ClearFiltersButtonContainer";
import * as objAssign from "object-assign";
import { Store } from "azsearchstore";
import { defaultCss } from "../utils/css";

export type State = {};

class ClearFiltersButton extends React.PureComponent<PropsType, State> {
  render() {
    const { lastUpdated, onClear, hasSelectedFacets } = this.props;
    let css = objAssign({}, defaultCss, this.props.css);

    if (!lastUpdated) { return <div></div>; }

    const text = "clear filter(s)";
    const clearAnchor = hasSelectedFacets ?
      <a
        href="#"
        onClick={ e => {
          e.preventDefault();
          onClear();
        }}
      >{text}</a>
    :
      <span
      className={css.searchFacets__clearFiltersButtonDisabled}
      >{text}</span>;

    return (
      <div className={css.searchFacets__clearFiltersButtonControl}>
        {clearAnchor}
      </div>
    );
  }
}

export default ClearFiltersButton;