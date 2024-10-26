import {
  BooleanSchema,
  DateSchema,
  NumberSchema,
  StringSchema,
  ValidTypes,
} from "../core/SchemaType";

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

export type DateFormate = "DD-MM-YYYY" | "YYYY-MM-DD" | "MM-DD-YYYY";

export type isVObject = (value: unknown) => boolean;

export type SchemaToType<T> = T extends StringSchema
  ? "string"
  : T extends NumberSchema
  ? "number"
  : T extends BooleanSchema
  ? "boolean"
  : T extends DateSchema
  ? "Date"
  : never;
