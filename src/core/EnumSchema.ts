import { SchemaErrorType } from "../error/ErrorTypes";
import { ValidationResult } from "../utils/UtilityTypes";
import { BaseSchemaImpl } from "./BaseSchema";
import { EnumSchema, ValidEnum } from "./SchemaType";

export class EnumSchemaImpl
  extends BaseSchemaImpl<ValidEnum>
  implements EnumSchema
{
  public values: Record<string, string> = {};
  public options: string[] = [];

  constructor(enumInput: ValidEnum, private obj = {} as SchemaErrorType) {
    super();
    for (const value of enumInput) {
      this.values[value] = value;
    }
    this.options = enumInput;
  }

  validateType(value: unknown): ValidationResult<ValidEnum> {
    // check if value is a string
    if (typeof value !== "string") {
      return {
        success: false,
        error: this.obj.invalidTypeMsg || "Invalid type",
      };
    }
    // check if value is in the enum
    if (!Object.values(this.values).includes(value)) {
      return {
        success: false,
        error: "Invalid enum value",
      };
    }

    return { success: true, data: value as unknown as ValidEnum };
  }
}
