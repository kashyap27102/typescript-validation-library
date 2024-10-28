/* eslint-disable @typescript-eslint/no-empty-object-type */
// Import error and validation result types
import { SchemaErrorType, ValidationErrorType } from '../error/ErrorTypes';

// Defining primitive types that schemas can validate
export type ValidString = string; // Represents a string type
export type ValidNumber = number; // Represents a number type
export type ValidBoolean = boolean; // Represents a boolean type
export type ValidDate = Date; // Represents a Date object
export type ValidUndefined = undefined; // Represents an undefined type
export type ValidNull = null; // Represents a null type

// union of all types that can be validated by a schema
export type ValidTypes =
  | ValidString
  | ValidNumber
  | ValidBoolean
  | ValidDate
  | ValidUndefined
  | ValidNull
  | ValidObject;

// A valid enum type is defined as an array of strings
// This will be used to create an enum schema
export type ValidEnum<T extends readonly string[]> = T[number];

// A valid object type for an object schema
// The object contains properties with different possible schema types
// The schema types can be StringSchema, NumberSchema, DateSchema, BooleanSchema, or even another ObjectSchema
export type ValidObject = {
  [key: string]: BaseSchema<ValidTypes>;
};

export type ValidUnion = ValidTypes[];

// Infers the type that a schema is validating
// This helps extract the type that each schema is supposed to validate
// Example: if `S` is a `StringSchema`, it returns `ValidString` (i.e., `string`)
export type InferType<S> =
  S extends ArraySchema<infer T>
    ? T[]
    : S extends BaseSchema<infer T>
      ? T
      : S extends StringSchema
        ? ValidString // If it's a StringSchema, the type is string
        : S extends NumberSchema
          ? ValidNumber // If it's a NumberSchema, the type is number
          : S extends BooleanSchema
            ? ValidBoolean // If it's a BooleanSchema, the type is boolean
            : S extends DateSchema
              ? ValidDate // If it's a DateSchema, the type is Date
              : S extends EnumSchema<infer T>
                ? T // If it's an EnumSchema, the type is string[]
                : S extends ArraySchema<infer T>
                  ? T // If it's an ArraySchema, infer the element type (T) from the array
                  : S extends ObjectSchema<infer Shape>
                    ? { [K in keyof Shape]: InferType<Shape[K]> }
                    : // If it's an ObjectSchema, recursively infer types for each property in the shape
                      S extends ValidUndefined
                      ? undefined // If it's undefined, return undefined
                      : S extends ValidNull
                        ? null // If it's null, return null
                        : never; // For any other case, return `never`

// Generic interface for defining a schema
// T is the type the schema is expected to validate (string, number, etc.)
// It contains a `parse` method that takes an unknown value and returns a validation result of type T
export interface BaseSchema<T> {
  isOptional: ValidBoolean;
  isNullable: ValidBoolean;
  parse(value: unknown): ValidationResult<T>;
  optional(): BaseSchema<T | undefined>;
  nullable(): BaseSchema<T | null>;
}

// Interface for defining a schema for strings
// It extends `BaseSchema<ValidString>` indicating that it validates strings
// It includes methods for string-specific validation (e.g., `min`, `max`, `email`) and transformations like `trim`
export interface StringSchema extends BaseSchema<ValidString> {
  // Validation methods for string schema
  min: (length: number, obj?: ValidationErrorType) => StringSchema;
  max: (length: number, obj?: ValidationErrorType) => StringSchema;
  email: (obj?: ValidationErrorType) => StringSchema;
  // Transformation methods for string schema
  trim: () => StringSchema;
}

// Interface for defining a schema for numbers
// It extends `BaseSchema<number>`, indicating that it validates numbers
// It includes number-specific validation methods like `int`, `positive`, and `negative`
export interface NumberSchema extends BaseSchema<ValidNumber> {
  // Validation methods for number schema
  int: (obj?: ValidationErrorType) => NumberSchema;
  positive: (obj?: ValidationErrorType) => NumberSchema;
  negative: (obj?: ValidationErrorType) => NumberSchema;
}

// Interface for defining a schema for booleans
// Extends `BaseSchema<boolean>`, meaning it validates boolean values
export interface BooleanSchema extends BaseSchema<ValidBoolean> {}

// Interface for defining a schema for dates
// Extends `BaseSchema<Date>`, meaning it validates Date objects
// Includes date-specific validation methods like `past` and `future`
export interface DateSchema extends BaseSchema<ValidDate> {
  // Validation methods for date schema
  past(obj?: ValidationErrorType): DateSchema;
  future(obj?: ValidationErrorType): DateSchema;
}

// Interface for defining a schema for enums
// Extends `BaseSchema<ValidEnum>`, meaning it validates enums (arrays of strings)
export interface EnumSchema<T extends readonly string[]>
  extends BaseSchema<ValidEnum<T>> {}

// Interface for defining a schema for objects
// Extends `BaseSchema<ValidObject>`, meaning it validates objects
// Includes a `shape` property that defines the structure of the object and an `extends` method to extend the shape
export interface ObjectSchema<Shape extends ValidObject>
  extends BaseSchema<{ [K in keyof Shape]: InferType<Shape[K]> }> {
  shape: Shape; // Defines the structure of the object schema
  extends: (shape: ValidObject) => ObjectSchema<Shape & ValidObject>; // Method to extend the object schema with additional fields
  keyof: () => EnumSchema<string[]>; // Method to get the keys of the object schema
}

// Interface for defining a schema for arrays
// Extends `BaseSchema<ValidArr<T>>`, where `T` is the type of the elements inside the array
// It means the schema will validate arrays where all elements are of type `T`
export interface ArraySchema<T> extends BaseSchema<T> {
  nonempty(): ArraySchema<T>;
  min(length: number, obj?: ValidationErrorType): ArraySchema<T>;
  max(length: number, obj?: ValidationErrorType): ArraySchema<T>;
  length(length: number, obj?: ValidationErrorType): ArraySchema<T>;
}

// Interface for defining a schema for unions
// Extends `BaseSchema<ValidUnion>`, meaning it validates values that can be any of the types in the union
export interface UnionSchema<T extends ValidTypes[]>
  extends BaseSchema<T[number]> {}

// Interface for defining a schema for tuples
// Extends `BaseSchema<[ValidTypes]>`, meaning it validates arrays with fixed types at each index
export interface TupleSchema<T extends ValidTypes[]> extends BaseSchema<T> {
  // length: T["length"]; // The fixed length of the tuple
}

// Main Schema Creator Interface
// Provides factory methods to create different schemas (string, number, boolean, etc.)
export interface SchemaCreator {
  string: (obj?: SchemaErrorType) => BaseSchema<ValidString>; // Creates a string schema
  number: (obj?: SchemaErrorType) => BaseSchema<ValidNumber>; // Creates a number schema
  boolean: (obj?: SchemaErrorType) => BaseSchema<ValidBoolean>; // Creates a boolean schema
  date: (obj?: SchemaErrorType) => BaseSchema<ValidDate>; // Creates a date schema
  enum: <T extends readonly string[]>(
    values: T,
    obj?: SchemaErrorType,
  ) => EnumSchema<T>; // Creates an enum schema
  optional: <T extends ValidTypes>(
    schema: BaseSchema<T>,
  ) => BaseSchema<T | ValidUndefined>; // Creates an optional schema
  nullable: <T extends ValidTypes>(
    schema: BaseSchema<T>,
  ) => BaseSchema<T | ValidNull>;
  object: <Shape extends ValidObject>(
    shape: Shape,
    obj?: SchemaErrorType,
  ) => ObjectSchema<Shape>; // Creates an object schema
  array: <T extends ValidTypes>(
    schema: BaseSchema<T>, // Pass the schema for array elements
  ) => ArraySchema<T>; // Creates an array schema
  union: <T extends ValidTypes[]>(schemas: {
    [K in keyof T]: BaseSchema<T[K]>;
  }) => UnionSchema<T>;
  tuple: <T extends ValidTypes[]>(schemas: {
    [K in keyof T]: BaseSchema<T[K]>;
  }) => TupleSchema<T>; // Creates a tuple schema
}
// Validation result
export type ValidationResult<T> =
  | {
      success: true;
      data: T | T[];
    }
  | {
      success: false;
      error: string;
    };

// Validation function
export type ValidationFn<T> = (value: T) => string | null;

// Transformer function
export type TransformerFn<T> = (value: T) => T;
