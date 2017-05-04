import * as React from "react";
import * as TestUtils from "react-dom/test-utils";
import Results from "../Results";

describe("Dummy snapshot test for <Results/>", () => {
    it("renders", () => {
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
        expect(TestUtils.createRenderer().render(
            <Results template={null} css={null} results={results} top={50} skip={0} count={results.length} />
        )).toMatchSnapshot();
    });
});