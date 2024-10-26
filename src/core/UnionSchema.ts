import { ValidationResult } from "../utils/UtilityTypes";
import { BaseSchemaImpl } from "./BaseSchema";
import { BaseSchema, InferType, ValidString, ValidTypes } from "./SchemaType";

export class UnionSchemaImpl<
  T extends BaseSchema<ValidTypes>[]
> extends BaseSchemaImpl<T> {
  constructor(private schemas: BaseSchema<ValidTypes>[]) {
    super();
  }

  protected validateType(value: unknown): ValidationResult<any> {
    for (const schema of this.schemas) {
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
