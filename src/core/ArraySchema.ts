import { SchemaErrorType } from "../error/ErrorTypes";
import { ValidationResult } from "../utils/UtilityTypes";
import { DefaultValidationError } from "../utils/helper";
import { BaseSchemaImpl } from "./BaseSchema";
import { ArraySchema, BaseSchema, ValidTypes } from "./SchemaType";

export class ArraySchemaImpl<T extends ValidTypes>
  extends BaseSchemaImpl<T>
  implements ArraySchema<T>
{
  constructor(private schema: BaseSchema<T>) {
    super();
    this.schema = schema;
  }

  validateType(values: unknown): ValidationResult<T> {
    // Check if the value is an array
    if (!Array.isArray(values)) {
      return {
        success: false,
        error: "Expeacted an array",
      };
    }

    // Check if the values in the array are of the correct type
    for (const value of values) {
      const result = this.schema.parse(value);
      if (!result.success) {
        return {
          success: false,
          error: result.error,
        };
      }
    }

    return {
      success: true,
      data: values,
    };
  }

  nonempty(validationError = DefaultValidationError.ARR_EMPTY): ArraySchema<T> {
    this.validators.push((value: T | T[]) => {
      if (Array.isArray(value)) {
        return value.length > 0 ? null : validationError.message;
      }
      return "Expected an array";
    });
    return this;
  }

  min(
    length: number,
    validationError = DefaultValidationError.ARR_MIN(length)
  ): ArraySchema<T> {
    this.validators.push((value: T | T[]) => {
      if (Array.isArray(value)) {
        return value.length >= length ? null : validationError.message;
      }
      return "Expected an array";
    });
    return this;
  }

  max(
    length: number,
    validationError = DefaultValidationError.ARR_MAX(length)
  ): ArraySchema<T> {
    this.validators.push((value: T | T[]) => {
      if (Array.isArray(value)) {
        return value.length <= length ? null : validationError.message;
      }
      return "Expected an array";
    });
    return this;
  }

  length(
    length: number,
    validationError = DefaultValidationError.ARR_LENGTH(length)
  ) {
    this.validators.push((value: T | T[]) => {
      if (Array.isArray(value)) {
        return value.length === length ? null : validationError.message;
      }
      return "Expected an array";
    });
    return this;
  }
}
