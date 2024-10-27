import { SchemaErrorType, ValidationErrorType } from '../error/ErrorTypes';
import {
  StringSchema,
  ValidString,
  ValidationResult,
} from '../utils/typeUtils';
import { DefaultValidationError } from '../utils/helper';
import { BaseSchemaImpl } from './BaseSchema';

export class StringSchemaImpl
  extends BaseSchemaImpl<ValidString>
  implements StringSchema
{
  constructor(private obj: SchemaErrorType = {} as SchemaErrorType) {
    super();
  }

  validateType(value: unknown): ValidationResult<ValidString> {
    if (typeof value !== 'string') {
      return {
        success: false,
        error:
          this.obj.invalidTypeMsg ||
          `Expected a string, but got ${typeof value}`,
      };
    }
    return { success: true, data: value };
  }

  min(
    length: number,
    validation: ValidationErrorType = DefaultValidationError.STRING_MIN(length),
  ): StringSchema {
    this.validators.push((value: string) =>
      value.length >= length ? null : validation.message,
    );

    return this;
  }

  max(
    length: number,
    validation: ValidationErrorType = DefaultValidationError.STRING_MAX(length),
  ): StringSchema {
    this.validators.push((value: string) =>
      value.length <= length ? null : validation.message,
    );

    return this;
  }

  email(
    validation: ValidationErrorType = DefaultValidationError.STRING_EMAIL,
  ): StringSchema {
    this.validators.push((value: string) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : validation.message,
    );
    return this;
  }

  trim(): StringSchema {
    this.transformers.push((value) => value.trim());
    return this;
  }
}
