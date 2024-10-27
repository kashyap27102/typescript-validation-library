import v from '../core/SchemaCreator';

describe('Object Schema', () => {
  test('object schema validation', () => {
    expect(
      v
        .object({
          name: v.string(),
          age: v.number(),
          isAdult: v.boolean(),
          email: v.string().email(),
        })
        .parse({
          name: 'Jhone',
          age: 20,
          isAdult: true,
          email: 'Jhone@gmail.com',
        }),
    ).toEqual({
      success: true,
      data: {
        name: 'Jhone',
        age: 20,
        isAdult: true,
        email: 'Jhone@gmail.com',
      },
    });
  });

  // Test with missing fields
  test('object schema validation with missing fields', () => {
    expect(
      v
        .object({
          name: v.string(),
          age: v.number(),
          isAdult: v.boolean(),
          email: v.string().email(),
        })
        .parse({
          name: 'Jhone',
          age: 20,
        }),
    ).toEqual({
      success: false,
      error: 'Some fields are missing', // Replace with a specific error message if needed
    });
  });

  // Test with invalid email format
  test('object schema validation with invalid email', () => {
    expect(
      v
        .object({
          name: v.string(),
          age: v.number(),
          isAdult: v.boolean(),
          email: v.string().email(),
        })
        .parse({
          name: 'Jhone',
          age: 20,
          isAdult: true,
          email: 'Jhone.com', // Invalid email format
        }),
    ).toEqual({
      success: false,
      error: 'Email is not in valid format', // Replace with a specific error message if needed
    });
  });
});
