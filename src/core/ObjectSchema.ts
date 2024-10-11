import { SchemaErrorType } from "../error/ErrorTypes";
import { ValidationResult } from "../utils/UtilityTypes";
import { EnumSchemaImpl } from "./EnumSchema";
import { EnumSchema, ObjectSchema, ValidObject } from "./SchemaType";

export class ObjectSchemaImpl implements ObjectSchema {
  constructor(
    public shape: ValidObject,
    private obj: SchemaErrorType = {} as SchemaErrorType
  ) {}

  keyof(): EnumSchema {
    return new EnumSchemaImpl(Object.keys(this.shape));
  }

  parse(value: unknown): ValidationResult<ValidObject> {
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
