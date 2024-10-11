import { SchemaErrorType, ValidationErrorType } from "../error/ErrorTypes";
import { ValidationFn, ValidationResult } from "../utils/UtilityTypes";
import { DefaultValidationError, validate } from "../utils/helper";
import { BaseSchemaImpl } from "./BaseSchema";
import { BaseSchema } from "./SchemaType";
import { NumberSchema, ValidNumber } from "./SchemaType";

export class NumberSchemaImpl
  extends BaseSchemaImpl<ValidNumber>
  implements NumberSchema
{
  constructor(private obj: SchemaErrorType = {} as SchemaErrorType) {
    super();
  }

  validateType(value: unknown): ValidationResult<number> {
    if (typeof value !== "number") {
      return {
        success: false,
        error: this.obj.invalidTypeMsg || "Invalid type, Expected Number",
      };
    }
    return { success: true, data: value };
  }

  int(
    validateError: ValidationErrorType = DefaultValidationError.NUMBER_INT
  ): NumberSchema {
    this.validators.push((value: number) =>
      Number.isInteger(value) ? null : validateError.message
    );
    return this;
  }

  positive(
    validateError: ValidationErrorType = DefaultValidationError.NUMBER_INT
  ): NumberSchema {
    this.validators.push((value: number) =>
      value >= 0 ? null : validateError.message
    );
    return this;
  }
  negative(
    validateError: ValidationErrorType = DefaultValidationError.NUMBER_INT
  ): NumberSchema {
    this.validators.push((value: number) =>
      value <= 0 ? null : validateError.message
    );
    return this;
  }
}
