import {
  TransformerFn,
  ValidationFn,
  ValidationResult,
} from "../utils/UtilityTypes";
import { transform, validate } from "../utils/helper";
import { ArraySchemaImpl } from "./ArraySchema";
import { ArraySchema, BaseSchema, ValidTypes } from "./SchemaType";

export abstract class BaseSchemaImpl<T> implements BaseSchema<T> {
  isOptional: boolean = false;
  isNullable: boolean = false;
  protected validators: ValidationFn<T>[] = [];
  protected transformers: TransformerFn<T>[] = [];

  protected abstract validateType(value: unknown): ValidationResult<T>;

  parse(value: unknown): ValidationResult<T> {
    // Check if the value is undefined
    if (this.isOptional && typeof value === "undefined") {
      return { success: true, data: undefined as T };
    }

    // Check if the value is null
    if (this.isNullable && value === null) {
      return { success: true, data: null as T };
    }

    // Check if the value is of the correct type
    const result = this.validateType(value);
    if (result.success === false) {
      return { success: false, error: result.error };
    }

    if (this.validators.length !== 0) {
      const error = validate(value as T, this.validators);

      if (error) {
        return { success: false, error: error };
      }
    }

    if (this.transformers.length !== 0) {
      const result = transform(value as T, this.transformers);
      return { success: true, data: result };
    }

    // If the value is of the correct type, return it
    return result;
  }
  optional(): BaseSchema<T | undefined> | ArraySchema<T> {
    this.isOptional = true;
    return this;
  }
  nullable(): BaseSchema<T | null> {
    this.isNullable = true;
    return this;
  }
}
