import * as React from "react";
import { PropsType } from "../containers/FilterBarContainer";
import * as objAssign from "object-assign";
import { Store } from "azsearchstore";
import { defaultCss } from "../utils/css";

export type State = {};

class FilterBar extends React.Component<PropsType, State> {
  render() {
    const { onClear, hasSelectedFacets } = this.props;
    const text = "clear filter(s)";

    return (
      <div className="text-right">
        { hasSelectedFacets ?
          <a
            href="#"
            onClick={ e => {
              e.preventDefault();
              if (onClear) onClear();
            }}
          >{text}</a>
        :
          <span
          className="text-muted"
          >{text}</span>
        }
      </div>
    );
  }
}

export default FilterBar;