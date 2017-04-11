import { Store, AzSearchStore } from "azsearchstore";
import { Automagic } from "./AzSearchReactSamples";

let automagic = new Automagic({ index: "channel9", queryKey: "", service: "azs-demos" });

let suggestionsProcessor = (suggestions: {}[]) => {
    return suggestions.map((suggestion: any) => {
        suggestion.searchText = suggestion["@search.text"];
        return suggestion;
    });
};

let resultsProcessor = (results: {}[]) => {
    return results.map((result: any) => {
        let summary = result.summary;
        result.summary = summary.length < 200 ? summary : result.summary.substring(0, 200) + "...";
        return result;
    });
};

let resultTemplate =
    `<div class="col-xs-12 col-sm-5 col-md-3 result_img">
        <img class="img-responsive result_img" src={{previewImage}} alt="image not found" />
    </div>
    <div class="col-xs-12 col-sm-7 col-md-9">
        <a href="https://channel9.msdn.com{{groupUrl}}">
            {{result.groupName}}
        </a>
        <a href="https://channel9.msdn.com{{url}}">
            <h4>{{title}}</h4>
        </a>
        <div class="resultDescription">
            {{{summary}}}
        </div>
        <div>
            views: {{totalViewCount}}
        </div>
    </div>`;
let suggestionsTemplate = "{{{searchText}}}";
automagic.store.setSuggestionsProcessor(suggestionsProcessor);
automagic.store.setResultsProcessor(resultsProcessor);
automagic.addSearchBox("searchBox",
    {
        highlightPreTag: "<b>",
        highlightPostTag: "</b>",
        suggesterName: "sg"
    },
    suggestionsTemplate);
automagic.addResults("results", { count: true }, resultTemplate);
automagic.addPager("pager");
automagic.addCheckboxFacet("groupNameFacet", "groupName", false);
automagic.addCheckboxFacet("languageFacet", "language", false);
automagic.addCheckboxFacet("typeFacet", "type", false);
automagic.addRangeFacet("viewsFacet", "totalViewCount", 0, 1200000);