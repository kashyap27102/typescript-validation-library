// write a test cases for boolean schema
import v from '../';

describe('Boolean Schema', () => {
  test('boolean schema validation', () => {
    expect(v.boolean().parse(true)).toEqual({
      success: true,
      data: true,
    });
  });
  test('boolean schema validation with error message', () => {
    expect(
      v.boolean({ invalidTypeMsg: 'Value is not a boolean' }).parse(20)
    ).toEqual({
      success: false,
      error: 'Value is not a boolean',
    });
  });
});
