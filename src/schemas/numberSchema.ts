import { SchemaErrorType, ValidationErrorType } from '../error/ErrorTypes';
import { ValidationResult } from '../utils/typeUtils';
import { DefaultValidationError } from '../utils/helper';
import { BaseSchemaImpl } from './BaseSchema';
import { NumberSchema, ValidNumber } from './SchemaType';

export class NumberSchemaImpl
  extends BaseSchemaImpl<ValidNumber>
  implements NumberSchema
{
  constructor(private obj: SchemaErrorType = {} as SchemaErrorType) {
    super();
  }

  validateType(value: unknown): ValidationResult<number> {
    if (typeof value !== 'number') {
      return {
        success: false,
        error:
          this.obj.invalidTypeMsg ||
          `Expected a number, but got ${typeof value}`,
      };
    }
    return { success: true, data: value };
  }

  int(
    validateError: ValidationErrorType = DefaultValidationError.NUMBER_INT,
  ): NumberSchema {
    this.validators.push((value: number) =>
      Number.isInteger(value) ? null : validateError.message,
    );
    return this;
  }

  positive(
    validateError: ValidationErrorType = DefaultValidationError.NUMBER_INT,
  ): NumberSchema {
    this.validators.push((value: number) =>
      value >= 0 ? null : validateError.message,
    );
    return this;
  }
  negative(
    validateError: ValidationErrorType = DefaultValidationError.NUMBER_INT,
  ): NumberSchema {
    this.validators.push((value: number) =>
      value <= 0 ? null : validateError.message,
    );
    return this;
  }
}
