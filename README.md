# TypeScript Validation Library

A flexible and powerful TypeScript-first validation library for building schema-based validation in JavaScript and TypeScript applications. Inspired by libraries like **Zod**, this library supports a wide range of data types and provides customizable, chainable methods for building robust validation pipelines.

![typescript-validation-library](https://img.shields.io/badge/typescript-v4.0+-blue)
![npm](https://img.shields.io/npm/v/ts-validation-library)
![license](https://img.shields.io/badge/license-MIT-green)

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Schema Types](#schema-types)
- [Error Handling & Custom Messages](#error-handling--custom-messages)
- [Usage Examples](#usage-examples)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- ✅ **Strongly Typed**: Built with TypeScript, allowing for end-to-end type safety.
- 🛠️ **Customizable Validations**: Chainable methods for flexible validation.
- 🔥 **Wide Data Type Support**: Supports strings, numbers, booleans, dates, objects, enums, and more.
- 🕹️ **Composability**: Create complex schemas by combining basic and custom schemas.
- 🌐 **Lightweight and Fast**: Optimized for performance and minimal footprint.

---

## Installation

Install via npm or yarn:

```bash
npm install ts-validation-library
# or
yarn add ts-validation-library
```

## Quick Start

```javascript
import v from 'ts-validation-library';

const userSchema = v.object({
  username: v.string().min(3).max(20),
  age: v.number().int().positive(),
  email: v.string().email(),
});

const result = userSchema.parse({
  username: 'JaneDoe',
  age: 25,
  email: 'janedoe@example.com',
});

if (result.success) {
  console.log('Valid user data:', result.data);
} else {
  console.error('Validation error:', result.error);
}
```

## Schema Types

### String

- `string()`: Ensures the value is a string.
  - `min(length: number)`: Ensures the string is at least the specified length.
  - `max(length: number)`: Ensures the string is at most the specified length.
  - `email()`: Validates the string as an email address.

### Number

- `number()`: Ensures the value is a number.
  - `positive()`: Ensures the number is positive.
  - `negative()`: Ensures the number is negative.
  - `int()`: Ensures the number is an integer.

### Boolean

- `boolean()`: Ensures the value is a boolean.

### Date

- `date()`: Ensures the value is a date.
  - `past()`: Ensures the date is in the past.
  - `future()`: Ensures the date is in the future.

### Enum

- `enum(values: string[])`: Ensures the value is one of the specified values.

### Object

- `object(schema: Schema)`: Ensures the value is an object and validates its properties using the provided schema.
  - `shape`: Defines the structure of the object schema
  - `extends(shape: Schema)`: Method to extend the object schema with additional fields
  - `keyof()`:Method to get the keys of the object schema

### Array

- `array(schema: Schema)`: Ensures the value is an array and validates its elements using the provided schema.
  - `min(length: number)`: Ensures the array has at least the specified length.
  - `max(length: number)`: Ensures the array has at most the specified length.
  - `nonEmpty()`: Ensures the array is not empty.
  - `length(length: number)`: Ensures the array has the specified length.

### Union

- `union(schemas: Schema[])`: Ensures the value matches one of the provided schemas.

### Tuple

- `tuple(schemas: Schema[])`: Ensures the value is a tuple of the provided schemas.

### Optional

- `optional()`: Ensures the value is optional and validates it using the provided schema.

### Nullable

- `nullable()`: Ensures the value is nullable and validates it using the provided schema.

### Validation Methods

- `parse(data: any): { success: boolean; data?: any; error?: string }`: Parses the data and returns a validation result.

## Error Handling & Custom Messages

```javascript
// Example of custom error messages
const userSchema = v.object({
  username: v
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .max(20),
  age: v.number().int().positive().min(18, 'Age must be at least 18'),
  email: v.string().email('Please enter a valid email address'),
});

const result = userSchema.parse({
  username: 'Jo',
  age: 17,
  email: 'invalid-email',
});

if (result.success) {
  console.log('Valid user data:', result.data);
} else {
  console.error('Validation error:', result.error); // Display the error messages
}
```

## Usage Examples

```javascript
const userProfileSchema = v.object({
  name: v.string().min(3).max(50), // Name: string between 3 to 50 characters
  email: v.string().email(), // Email: valid email format
  age: v.number().positive().int(), // Age: positive integer
  isActive: v.boolean(), // isActive: boolean (active or not)
  birthdate: v.date().past().optioal(), // Birthdate: must be a past date
  role: v.enum(['admin', 'user', 'guest']), // Role: one of "admin", "user", or "guest"
  hobbies: v.array(v.string()).min(1), // Hobbies: array of strings, with at least one hobby
  address: v.object({
    street: v.string().min(5), // Street: string with at least 5 characters
    city: v.string().min(3), // City: string with at least 3 characters
    postalCode: v.number().positive().int(), // Postal Code: positive integer
  }), // Nested object schema for address
  preferences: v.object({
    receiveNewsletter: v.boolean(), // Receive newsletter: boolean
    theme: v.enum(['light', 'dark']), // Theme: "light" or "dark"
  }), // Nested object schema for preferences
});
```

## Contributing

We welcome contributions! Please read our contribution guidelines and code of conduct for details on how to contribute to the project.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
