/// <reference path="../../../dist/hogan.js.d.ts" />
import * as React from "react";
import Results from "../Results";
import { shallow } from "enzyme";
import { compile } from "hogan.js";

let results = [
    {
        key: "foo",
        text: "bar"
    },
    {
        key: "fizz",
        text: "buzz"
    }
];
const template = compile("{{key}}");

describe("<Results/>", () => {
    it("renders dummy snapshot", () => {
        expect(shallow(
            <Results template={null} css={null} results={results} top={50} skip={0} count={results.length} />
        )).toMatchSnapshot();
    });
    it("renders two results", () => {
        const wrapper = shallow(
            <Results template={null} css={null} results={results} top={50} skip={0} count={results.length} />
        );
        expect(wrapper.find(".searchResults__result").length).toBe(2);
        expect(wrapper.find(".results__blurb").text()).toEqual("1 - 2 of 2");
    });
    it("renders empty div for zero results", () => {
        const wrapper = shallow(
            <Results template={null} css={null} results={[]} top={50} skip={0} count={results.length} />
        );
        expect(wrapper.find(".searchResults__result").length).toBe(0);
        expect(wrapper.find("div").length).toBe(2);
    });
    it("renders two results with custom template", () => {
        const wrapper = shallow(
            <Results template={template} css={null} results={results} top={50} skip={0} count={results.length} />
        );
        const resultsElms = wrapper.find(".searchResults__result");
        expect(resultsElms.length).toBe(2);
        expect(resultsElms.first().html()).toEqual("<div class=\"searchResults__result col-xs-12 col-sm-12\">foo</div>");
        expect(wrapper.find(".results__blurb").text()).toEqual("1 - 2 of 2");
    });
});