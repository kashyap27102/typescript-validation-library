import { SchemaErrorType, ValidationErrorType } from "../error/ErrorTypes";
import { ValidationResult } from "../utils/UtilityTypes";
import { DefaultValidationError, transform, validate } from "../utils/helper";
import { BaseSchemaImpl } from "./BaseSchema";
import { DateSchema, ValidBoolean, ValidDate } from "./SchemaType";

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
        error: this.obj.invalidTypeMsg || "Invalid date format",
      };
    }
    return { success: true, data: new Date(value as string) };
  }

  past(
    obj: ValidationErrorType = DefaultValidationError.DATE_PAST
  ): DateSchema {
    this.validators.push((value: Date) => {
      const currentDate = new Date();
      return value.getTime() < currentDate.getTime() ? null : obj.message;
    });
    return this;
  }

  future(
    obj: ValidationErrorType = DefaultValidationError.DATE_PAST
  ): DateSchema {
    this.validators.push((value: Date) => {
      const currentDate = new Date();
      return value.getTime() > currentDate.getTime() ? null : obj?.message;
    });
    return this;
  }
}
