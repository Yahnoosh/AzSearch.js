import { Store, AzSearchStore } from "azsearchstore";
import { Automagic } from "./AzSearchReactSamples";

let automagic = new Automagic({ index: "channel9", queryKey: "", service: "azs-demos" });

let suggestionsProcessor = (suggestions: {}[]) => {
    return suggestions.map((suggestion: any) => {
        suggestion.searchText = suggestion["@search.text"];
        return suggestion;
    });
};

automagic.store.setSuggestionsProcessor(suggestionsProcessor);

automagic.addSearchBox("searchBox", {highlightPreTag: "<b>", highlightPostTag: "</b>", suggesterName: "sg"});
automagic.addResults("results");
automagic.addCheckboxFacet("groupNameFacet", "groupName", false);
automagic.addCheckboxFacet("languageFacet", "language", false);
automagic.addCheckboxFacet("typeFacet", "type", false);