import * as React from "react";
import { PropsType } from "../containers/LoadingIndicatorContainer";
import * as objAssign from "object-assign";
import { defaultCss } from "../utils/css";
import * as Spinner from "react-spinkit";

export type State = {};

var style = {
    "height": "0em"
}

class LoadingIndicator extends React.PureComponent<PropsType, State> {
    render() {
        const isLoading = this.props.isLoading;
        return isLoading ? <div style={style}><Spinner spinnerName="three-bounce" /> </div>: <div style={style}/>
    }
}

export default LoadingIndicator;