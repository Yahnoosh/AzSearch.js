import * as React from "react";
import { PropsType } from "../containers/ResultsContainer";
import * as objAssign from "object-assign";
import { defaultCss } from "../utils/css";

export type State = {};

class Results extends React.Component<PropsType, State> {
    render() {
        const { results, template } = this.props;
        let css = objAssign({}, defaultCss, this.props.css);

        const renderedResults = results.map((result: any, index: number) => {
            let html = template ? template.render(result) : null;
            if (html) {
                return (
                    <div className={css.searchResults__result} key={index} dangerouslySetInnerHTML={{ __html: html }} />
                );
            }
            else {
                return (
                    <div className={css.searchResults__result} key={index} >
                        <pre>
                            <code>
                                {JSON.stringify(result, null, 4)}
                            </code>
                        </pre>
                    </div>
                );
            }
        });

        return (
            <div>
                {renderedResults}
            </div>
        );
    }
}

export default Results;