import { createOrderByClause } from "../utils";

describe("utils", () => {
    const order = "desc";
    it("creates empty orderby for empty fieldname", () => {
        const field: {fieldName: string, displayName?: string, latitude?: number, longitude?: number } = {
            fieldName: "",
        };
        expect(
            createOrderByClause(field, order)
        ).toEqual("");
    });
    it("creates orderby for normal fieldname", () => {
        const field: {fieldName: string, displayName?: string, latitude?: number, longitude?: number } = {
            fieldName: "foo",
            displayName: "Foo"
        };
        expect(
            createOrderByClause(field, order)
        ).toEqual("foo desc");
    });
    it("creates geo orderby for  field that includes lat/long", () => {
        const field: {fieldName: string, displayName?: string, latitude?: number, longitude?: number } = {
            fieldName: "foo",
            displayName: "Foo",
            latitude: 47.673988099999995,
            longitude: -122.12151199999998
        };
        expect(
            createOrderByClause(field, order)
        ).toEqual("geo.distance(foo, geography'POINT(-122.12151199999998 47.673988099999995)')");
    });
});