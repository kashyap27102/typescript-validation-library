import { BaseSchemaImpl } from './baseSchema';
import { BaseSchema, ValidationResult, ValidTypes } from '../utils/typeUtils';

export class TupleSchemaImpl<T extends ValidTypes[]> extends BaseSchemaImpl<T> {
  constructor(private tuple: { [K in keyof T]: BaseSchema<T[K]> }) {
    super();
  }

  protected validateType(value: unknown): ValidationResult<T> {
    // Check if the value is an array
    if (!Array.isArray(value)) {
      return {
        success: false,
        error: `Expected an array, but got ${typeof value}`,
      };
    }

    // Check if the array has the same length as the tuple
    if (value.length !== this.tuple.length) {
      return {
        success: false,
        error: `Expected an array of length ${this.tuple.length}, but got ${value.length}`,
      };
    }

    // Validate each element in the array
    for (let i = 0; i < this.tuple.length; i++) {
      const result = this.tuple[i].parse(value[i]);
      if (!result.success) {
        return {
          success: false,
          error: `Error at index ${i}: ${result.error}`,
        };
      }
    }

    return {
      success: true,
      data: value as T,
    };
  }
}
