import * as React from "react";
import StaticFilter from "../StaticFilter";
import { shallow } from "enzyme";

const filters = [
    { displayName: "Any", filter: "" },
    { displayName: "House", filter: "type eq 'House'" },
    { displayName: "Apartment", filter: "type eq 'Apartment'" }
];
const defaultFilter = "";
const title = "Home Type";

describe("<StaticFilter/>", () => {
    it("renders against dummy snapshot", () => {

        expect(shallow(
            <StaticFilter  css={null} filters={filters} activeFilter={defaultFilter} filterKey={"type"} beforeFirstRequest={false} onFilterChange={function(foo){}} title={title} />
        )).toMatchSnapshot();
    });
});