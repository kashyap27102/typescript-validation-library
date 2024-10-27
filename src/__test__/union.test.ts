import v from '../index';

describe('Union Schema', () => {
  test('valid union schema validation', () => {
    const union_schema = v.union([v.string(), v.number()]);
    expect(union_schema.parse('hello')).toStrictEqual({
      success: true,
      data: 'hello',
    });
  });
});
