# TypeScript Validation Library

A flexible and powerful TypeScript-first validation library for building schema-based validation in JavaScript and TypeScript applications. Inspired by libraries like **Zod**, this library supports a wide range of data types and provides customizable, chainable methods for building robust validation pipelines.

![typescript-validation-library](https://img.shields.io/badge/typescript-v4.0+-blue)
![npm](https://img.shields.io/npm/v/your-package-name)
![license](https://img.shields.io/badge/license-MIT-green)

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Schema Types](#schema-types)
- [Usage Examples](#usage-examples)
- [API Reference](#api-reference)
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
npm install your-package-name
# or
yarn add your-package-name
```

## Quick Start

```javascript
import { Schema } from 'your-package-name';

const userSchema = Schema.object({
  username: Schema.string().min(3).max(20).trim(),
  age: Schema.number().int().positive(),
  email: Schema.string().email(),
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

## Contributing

We welcome contributions! Please read our contribution guidelines and code of conduct for details on how to contribute to the project.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
