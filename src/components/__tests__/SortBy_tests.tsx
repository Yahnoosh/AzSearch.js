import * as React from "react";
import { shallow } from "enzyme";
import SortBy from "../SortBy";

const fields = [
    { displayName: "Relevance", orderbyClause: "" },
    { displayName: "Beds", orderbyClause: "beds desc" },
    { displayName: "Baths", orderbyClause: "baths desc" }
];
const orderby = "";

describe("<SortBy/>", () => {
    it("renders against dummy snapshot", () => {

        expect(shallow(
            <SortBy  beforeFirstRequest={false} onSortChange={function(foo){}} fields={fields} css={null} orderby={orderby} />
        )).toMatchSnapshot();
    });
});