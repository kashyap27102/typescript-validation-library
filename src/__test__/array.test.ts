import v from '../';

describe('Array', () => {
  test('Array Schema validation', () => {
    expect(v.array(v.number()).parse([1, 2, 3])).toStrictEqual({
      success: true,
      data: [1, 2, 3],
    });
  });
  test('Array Schema validation with error', () => {
    expect(
      v
        .array(v.number({ invalidTypeMsg: 'Number required' }))
        .parse([1, 2, '3']),
    ).toStrictEqual({
      success: false,
      error: 'Number required',
    });
  });
  test('Array Schema validation with empty array', () => {
    expect(v.array(v.number()).parse([])).toStrictEqual({
      success: true,
      data: [],
    });
  });

  test('Array Schema validation with nonempty array', () => {
    expect(v.array(v.number()).nonempty().parse([])).toStrictEqual({
      success: false,
      error: 'Array must not be empty',
    });
  });
});
