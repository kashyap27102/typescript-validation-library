import v from "../core/SchemaCreator"; // Assuming this is where the schema creation utility resides.

describe("Tuple Schema", () => {
  test("valid tuple schema validation", () => {
    // Correct types and length
    expect(
      v.tuple([v.number(), v.string(), v.boolean()]).parse([123, "Hello", true])
    ).toStrictEqual({
      success: true,
      data: [123, "Hello", true],
    });
  });

  test("invalid tuple schema - incorrect type", () => {
    // One of the types is incorrect (string instead of number)
    expect(
      v.tuple([v.number(), v.string(), v.boolean()]).parse(["Hello", 123, true])
    ).toStrictEqual({
      success: false,
      error: "Error at index 0: Expected a number, but got string", // Customize based on your error messages
    });
  });

  test("invalid tuple schema - incorrect length", () => {
    // The tuple is shorter than expected
    expect(
      v.tuple([v.number(), v.string(), v.boolean()]).parse([123, "Hello"])
    ).toStrictEqual({
      success: false,
      error: "Expected an array of length 3, but got 2", // Error for length mismatch
    });
  });

  test("empty tuple validation", () => {
    // Empty tuple (no elements expected)
    expect(v.tuple([]).parse([])).toStrictEqual({
      success: true,
      data: [],
    });
  });

  test("invalid empty tuple - wrong input", () => {
    // Tuple expects no elements but receives some
    expect(v.tuple([]).parse([123])).toStrictEqual({
      success: false,
      error: "Expected an array of length 0, but got 1",
    });
  });

  // test("nested tuple validation", () => {
  //   // Nested tuple with valid types
  //   expect(
  //     v
  //       .tuple([v.number(), v.tuple([v.string(), v.boolean()])])
  //       .parse([42, ["Nested", true]])
  //   ).toStrictEqual({
  //     success: true,
  //     data: [42, ["Nested", true]],
  //   });
  // });

  // test("nested tuple validation - invalid inner tuple", () => {
  //   // Nested tuple with incorrect type inside the inner tuple
  //   expect(
  //     v
  //       .tuple([v.number(), v.tuple([v.string(), v.boolean()])])
  //       .parse([42, [false, "Invalid"]])
  //   ).toStrictEqual({
  //     success: false,
  //     error:
  //       "Error at index 1: Error at index 0: Expected a string, but got boolean",
  //   });
  // });
});
