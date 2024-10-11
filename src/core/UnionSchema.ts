import { ValidationResult } from "../utils/UtilityTypes";
import { BaseSchemaImpl } from "./BaseSchema";
import {
  BaseSchema,
  InferType,
  UnionSchema,
  ValidString,
  ValidTypes,
} from "./SchemaType";

export class UnionSchemaImpl
  extends BaseSchemaImpl<ValidString>
  implements UnionSchema
{
  constructor(private schemaArray: BaseSchema<ValidTypes>[]) {
    super();
    this.schemaArray = schemaArray;
  }

  protected validateType(value: unknown): ValidationResult<any> {
    for (const schema of this.schemaArray) {
      const result = schema.parse(value);
      if (result.success) {
        return {
          success: true,
          data: result.data as any,
        };
      }
    }
    return {
      success: false,
      error: "Value does not match any schema in the union",
    };
  }
}
