import * as AutoSuggest from "react-autosuggest";
import * as React from "react";
import { PropsType } from "../containers/SearchBoxContainer";
import * as objAssign from "object-assign";
import { defaultCss } from "../utils/css";

export type State = {};

class SearchBox extends React.Component<PropsType, State> {
    onInputChange(changeEvent: React.ChangeEvent<HTMLInputElement>, newValue: any) {
        if (newValue.method === "up" || newValue.method === "down") {
            return;
        }
        const input = newValue.newValue;
        // remove highlight tags for the stored input
        this.props.onInputChange(input);
        if (newValue.method === "click" || newValue.method === "enter") {
            this.props.clearFacetsAndSearch();
        }
    }
    handleKeyDown(evt: any) {
        if (evt.key === "Enter") {
            return this.props.clearFacetsAndSearch();
        }
    }
    getSuggestionValue(suggestion: any) {
        return suggestion.searchText.replace(this.props.preTag, "").replace(this.props.postTag, "");
    }
    renderInputComponent(inputProps: any) {
        let css = objAssign({}, defaultCss, this.props.css);
        return (
            <div className={css.searchBox__inputContainer}>
                <input {...inputProps} type="text" autoFocus></input>
                <span className={css.searchBox__buttonContainer}>
                    <button className={css.searchBox__button} type="button" onClick={this.props.clearFacetsAndSearch}><span className={css.searchBox__buttonIcon}></span>&nbsp;</button>
                </span>
            </div>

        );
    }
    renderSuggestion(suggestion: any) {
        let template = this.props.template;
        let html = template ? template.render(suggestion) : null;
        if (html) {
            return (
                <div dangerouslySetInnerHTML={{ __html: html }} />
            );
        }
        else {
            return (
                <div>
                    <pre>
                        <code>
                            {JSON.stringify(suggestion, null, 4)}
                        </code>
                    </pre>
                </div>
            );
        }
    }
    render() {
        const { input, onInputChange, suggestions, suggest, clearSuggestions, postTag, preTag, clearFacetsAndSearch, template } = this.props;

        let css = objAssign({}, defaultCss, this.props.css);

        let theme = {
            container: css.searchBox__container,
            containerOpen: css.searchBox__containerOpen,
            input: css.searchBox__input,
            suggestionsContainer: css.searchBox__suggestionsContainer,
            suggestionsList: css.searchBox__suggestionsList,
            suggestion: css.searchBox__suggestion,
            suggestionFocused: css.searchBox__suggestionFocused,
            sectionContainer: css.searchBox__sectionContainer,
            sectionTitle: css.searchBox__sectionTitle
        };

        // input props
        const inputProps = {
            placeholder: "Search...",
            value: input,
            onChange: this.onInputChange.bind(this),
            type: "search",
            onKeyPress: this.handleKeyDown.bind(this)
        };
        return (
            <AutoSuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={suggest}
                onSuggestionsClearRequested={clearSuggestions}
                onSuggestionSelected={clearFacetsAndSearch}
                inputProps={inputProps}
                getSuggestionValue={this.getSuggestionValue.bind(this)}
                theme={theme}
                renderInputComponent={this.renderInputComponent.bind(this)}
                renderSuggestion={this.renderSuggestion.bind(this)}
            />
        );
    }
}

export default SearchBox;


