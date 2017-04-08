import * as AutoSuggest from "react-autosuggest";
import * as React from "react";
import { PropsType } from "../containers/SearchBoxContainer";
import * as objAssign from "object-assign";

let defaultCss = {
    searchBox__container:            'searchBox__container',
    searchBox__containerOpen:        'searchBox__container--open',
    searchBox__input:                'searchBox__input',
    searchBox__suggestionsContainer: 'searchBox__suggestions-container',
    searchBox__suggestionsList:      'searchBox__suggestions-list',
    searchBox__suggestion:           'searchBox__suggestion',
    searchBox__suggestionFocused:    'searchBox__suggestion--focused',
    searchBox__sectionContainer:     'searchBox__section-container',
    searchBox__sectionTitle:         'searchBox__section-title',  
    searchBox__inputContainer:       'searchBox__input-container',
    searchBox__buttonContainer:      'searchBox__button-container',
    searchBox__button:               'searchBox__button',
    searchBox__buttonIcon:           'searchBox__button-icon'
};

var searchBoxCssClasses = {
        searchBox__input: 'searchBox__input form-control',
        searchBox__inputContainer: 'searchBox__input-container input-group',
        searchBox__buttonContainer: 'input-group-btn',
        searchBox__button: 'btn btn-default',
        searchBox__buttonIcon: 'glyphicon glyphicon-search'
    };

const css = objAssign(defaultCss, searchBoxCssClasses);

var theme = {
            container:            css.searchBox__container,
            containerOpen:        css.searchBox__containerOpen,
            input:                css.searchBox__input,
            suggestionsContainer: css.searchBox__suggestionsContainer,
            suggestionsList:      css.searchBox__suggestionsList,
            suggestion:           css.searchBox__suggestion,
            suggestionFocused:    css.searchBox__suggestionFocused,
            sectionContainer:     css.searchBox__sectionContainer,
            sectionTitle:         css.searchBox__sectionTitle            
        };

export type State = {};

class SearchBox extends React.Component<PropsType, State>{
    onInputChange(changeEvent: React.ChangeEvent<HTMLInputElement>, newValue: any){
        if(newValue.method === "up" || newValue.method === "down"){
            return;
        }
        const input = newValue.newValue;
        // remove highlight tags for the stored input
        this.props.onInputChange(input);
        if(newValue.method === "click" || newValue.method === "enter") {
            this.props.clearFacetsAndSearch();
        }
    }
    handleKeyDown(evt: any) {
        if (evt.key === "Enter" ) {
            return this.props.clearFacetsAndSearch();
        }
    }
    getSuggestionValue(suggestion: any) {
        return suggestion.searchText.replace(this.props.preTag, "").replace(this.props.postTag, ""); 
    }
    renderInputComponent(inputProps: any){
        return (
                <div className={css.searchBox__inputContainer}>
                    <input {...inputProps} type="text"></input>
                    <span className={css.searchBox__buttonContainer}>
                        <button className={css.searchBox__button} type="button" onClick={this.props.clearFacetsAndSearch}><span className={css.searchBox__buttonIcon}></span>&nbsp;</button>
                    </span>
                </div>

        ); 
    }
    renderSuggestion(suggestion: any) {
        return <div dangerouslySetInnerHTML={{__html: suggestion.searchText}} ></div>
    }
    render() {
        const { input, onInputChange, suggestions, suggest, clearSuggestions, postTag, preTag, clearFacetsAndSearch }= this.props

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


