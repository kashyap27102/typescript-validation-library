import { SchemaErrorType } from "../error/ErrorTypes";
import { ValidationResult } from "../utils/UtilityTypes";
import { BaseSchemaImpl } from "./BaseSchema";
import { EnumSchemaImpl } from "./EnumSchema";
import { EnumSchema, ObjectSchema, ValidObject } from "./SchemaType";

export class ObjectSchemaImpl
  extends BaseSchemaImpl<ValidObject>
  implements ObjectSchema
{
  constructor(
    public shape: ValidObject,
    private obj: SchemaErrorType = {} as SchemaErrorType
  ) {
    super();
  }

  keyof(): EnumSchema {
    return new EnumSchemaImpl(Object.keys(this.shape));
  }

  validateType(value: unknown): ValidationResult<ValidObject> {
    if (typeof value === "object" && value !== null) {
      const inputKeysLength = Object.entries(value).length;
      const schemaKeysLength = Object.entries(this.shape).length;

      if (schemaKeysLength > inputKeysLength)
        return { success: false, error: "Some of fields are missing" };

      if (schemaKeysLength < inputKeysLength)
        return { success: false, error: "Some of fields are extra" };

      for (const [key, schema] of Object.entries(this.shape)) {
        const result = schema.parse((value as Record<string, unknown>)[key]);

        if (!result.success) {
          return { success: false, error: result.error };
        }
      }
    }

    return { success: true, data: value as ValidObject };
  }

  extends(shape: object): ObjectSchema {
    this.shape = { ...this.shape, ...shape };
    return this;
  }

  merge(schema: ObjectSchema): ObjectSchema {
    this.shape = { ...this.shape, ...schema.shape };
    return this;
  }
}
