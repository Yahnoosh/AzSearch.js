import * as React from "react";
import * as TestUtils from "react-dom/test-utils";
import StaticFilter from "../StaticFilter";

const filters = [
    { displayName: "Any", filter: "" },
    { displayName: "House", filter: "type eq 'House'" },
    { displayName: "Apartment", filter: "type eq 'Apartment'" }
];
const defaultFilter = "";
const title = "Home Type";

describe("<StaticFilter/>", () => {
    it("renders against dummy snapshot", () => {

        expect(TestUtils.createRenderer().render(
            <StaticFilter  css={null} filters={filters} activeFilter={defaultFilter} filterKey={"type"} beforeFirstRequest={false} onFilterChange={function(foo){}} title={title} />
        )).toMatchSnapshot();
    });
});