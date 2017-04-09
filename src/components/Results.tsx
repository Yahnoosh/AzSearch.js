import * as React from "react";
import { PropsType } from "../containers/ResultsContainer";
import * as objAssign from "object-assign";

let css = {
    "maxWidth": "200px",
    "maxHeight": "200px"
};

export type State = {};

class Results extends React.Component<PropsType, State> {

    render() {
        const { results } = this.props;

        const renderedResults = results.map((result: any, index: number) => {
            let summary = result.summary;
            result.summary = summary.length < 200 ? summary :  result.summary.substring(0, 200) + "...";
            return (
                <div className={"searchResults__result col-xs-12 col-sm-12"}  key={index} >
                    <div className="col-xs-12 col-sm-5 col-md-3 result_img">
                        <img style={css} className="img-responsive" src={result.previewImage} alt="image not found" />
                    </div>
                    <div className={"col-xs-12 col-sm-7 col-md-9"}>
                        <a href={`https://channel9.msdn.com${result.groupUrl}`}>
                           {result.groupName}
                        </a>
                        <a href={`https://channel9.msdn.com${result.url}`}>
                            <h4>{result.title}</h4>
                        </a>
                        <div className="resultDescription" dangerouslySetInnerHTML={{__html: result.summary}}>
                        </div>
                        <div>
                            views: {result.totalViewCount}
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div>
                {renderedResults}
            </div>
        );
    }
}

export default Results;


