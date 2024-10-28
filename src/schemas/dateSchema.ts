import { SchemaErrorType, ValidationErrorType } from '../error/ErrorTypes';
import { DateSchema, ValidationResult, ValidDate } from '../utils/typeUtils';
import { DefaultValidationError } from '../utils/helper';
import { BaseSchemaImpl } from './baseSchema';

export class DateSchemaImpl
  extends BaseSchemaImpl<ValidDate>
  implements DateSchema
{
  constructor(private obj: SchemaErrorType = {} as SchemaErrorType) {
    super();
  }

  validateType(value: unknown): ValidationResult<ValidDate> {
    const date = new Date(value as string);
    // check if the date is valid
    if (isNaN(date.getTime())) {
      return {
        success: false,
        error:
          this.obj.invalidTypeMsg || `Expected a date, but got ${typeof value}`,
      };
    }
    return { success: true, data: new Date(value as string) };
  }

  past(
    obj: ValidationErrorType = DefaultValidationError.DATE_PAST,
  ): DateSchema {
    this.validators.push((value: Date) => {
      const currentDate = new Date();
      return value.getTime() < currentDate.getTime() ? null : obj.message;
    });
    return this;
  }

  future(
    obj: ValidationErrorType = DefaultValidationError.DATE_PAST,
  ): DateSchema {
    this.validators.push((value: Date) => {
      const currentDate = new Date();
      return value.getTime() > currentDate.getTime() ? null : obj?.message;
    });
    return this;
  }
}
