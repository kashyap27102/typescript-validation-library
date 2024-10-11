import { SchemaErrorType } from "../error/ErrorTypes";
import { ValidationResult } from "../utils/UtilityTypes";
import { BaseSchemaImpl } from "./BaseSchema";
import { ValidBoolean } from "./SchemaType";
import { BooleanSchema } from "./SchemaType";

export class BooleanSchemaImpl
  extends BaseSchemaImpl<ValidBoolean>
  implements BooleanSchema
{
  constructor(private obj: SchemaErrorType = {} as SchemaErrorType) {
    super();
  }

  validateType(value: unknown): ValidationResult<boolean> {
    if (typeof value !== "boolean") {
      return {
        success: false,
        error: this.obj.invalidTypeMsg || "Invalid type",
      };
    }
    return { success: true, data: value };
  }
}
