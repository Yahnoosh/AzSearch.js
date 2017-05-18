import * as React from "react";
import * as TestUtils from "react-dom/test-utils";
import SortBy from "../SortBy";

const fields = [
    { displayName: "Relevance", orderbyClause: "" },
    { displayName: "Beds", orderbyClause: "beds desc" },
    { displayName: "Baths", orderbyClause: "baths desc" }
];
const orderby = "";

describe("<SortBy/>", () => {
    it("renders against dummy snapshot", () => {

        expect(TestUtils.createRenderer().render(
            <SortBy  beforeFirstRequest={false} onSortChange={function(foo){}} fields={fields} css={null} orderby={orderby} />
        )).toMatchSnapshot();
    });
});