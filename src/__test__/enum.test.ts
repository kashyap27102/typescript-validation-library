import v from '../';

describe('Enum Schema', () => {
  test('should validate enum', () => {
    const enumSchema = v.enum(['a', 'b', 'c']).parse('a');
    expect(enumSchema).toEqual({ data: 'a', success: true });
  });
});
