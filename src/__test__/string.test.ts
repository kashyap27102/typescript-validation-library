import v from "../core/SchemaCreator";

describe("String Schema", () => {
  test("string schema validation", () => {
    expect(v.string().parse("Hello")).toStrictEqual({
      success: true,
      data: "Hello",
    });
  });

  test("string schema validation with error", () => {
    expect(
      v.string({ invalidTypeMsg: "Expected string, got number" }).parse(123)
    ).toStrictEqual({
      success: false,
      error: "Expected string, got number",
    });
  });

  test("string schema with minimum length", () => {
    expect(v.string().min(2).parse("Om")).toStrictEqual({
      success: true,
      data: "Om",
    });
  });

  test("string schema with maximum length error", () => {
    expect(v.string().max(4).parse("Adarsh")).toStrictEqual({
      success: false,
      error: "String must be at most 4 characters long",
    });
  });

  test("string schema with email validation", () => {
    expect(v.string().email().parse("adarsh@gmail.com")).toStrictEqual({
      success: true,
      data: "adarsh@gmail.com",
    });
  });

  test("string schema with email validation error", () => {
    expect(v.string().email().parse("adarshgmail.com")).toStrictEqual({
      success: false,
      error: "Email is not in valid format",
    });
  });
});
