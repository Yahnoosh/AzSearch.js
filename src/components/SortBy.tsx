import * as React from "react";
import { PropsType } from "../containers/SortByContainer";
import * as objAssign from "object-assign";
import { Store } from "azsearchstore";
import { defaultCss } from "../utils/css";

export type State = {};

class SortBy extends React.Component<PropsType, State> {
  render() {
    return (
      <div>Sort!</div>
    );
  }
}

export default SortBy;