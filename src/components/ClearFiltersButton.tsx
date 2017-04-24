import * as React from "react";
import { PropsType } from "../containers/ClearFiltersButtonContainer";
import * as objAssign from "object-assign";
import { Store } from "azsearchstore";
import { defaultCss } from "../utils/css";

export type State = {};

class ClearFiltersButton extends React.Component<PropsType, State> {
  render() {
    const { onClear, hasSelectedFacets } = this.props;
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
      className="text-muted"
      >{text}</span>;

    return (
      <div className="text-right">
        {clearAnchor}
      </div>
    );
  }
}

export default ClearFiltersButton;