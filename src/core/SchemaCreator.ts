import { ArraySchemaImpl } from "./ArraySchema";
import { BooleanSchemaImpl } from "./BooleanSchema";
import { DateSchemaImpl } from "./DateSchema";
import { EnumSchemaImpl } from "./EnumSchema";
import { NumberSchemaImpl } from "./NumberSchema";
import { ObjectSchemaImpl } from "./ObjectSchema";
import {
  ArraySchema,
  BaseSchema,
  BooleanSchema,
  DateSchema,
  NumberSchema,
  ObjectSchema,
  SchemaCreator,
  StringSchema,
  UnionSchema,
  ValidEnum,
  ValidNull,
  ValidObject,
  ValidTypes,
  ValidUndefined,
} from "./SchemaType";
import { StringSchemaImpl } from "./StringSchema";
import { UnionSchemaImpl } from "./UnionSchema";
import { SchemaErrorType } from "../error/ErrorTypes";

// Main Entry Point as a Class
export class SchemaCreatorImpl implements SchemaCreator {
  string(obj = {} as SchemaErrorType): StringSchema {
    return new StringSchemaImpl(obj);
  }
  number(obj = {} as SchemaErrorType): NumberSchema {
    return new NumberSchemaImpl(obj);
  }
  boolean(obj = {} as SchemaErrorType): BooleanSchema {
    return new BooleanSchemaImpl(obj);
  }
  date(obj = {} as SchemaErrorType): DateSchema {
    return new DateSchemaImpl(obj);
  }
  enum(input: ValidEnum, obj = {} as SchemaErrorType) {
    return new EnumSchemaImpl(input, obj);
  }
  object(shape: ValidObject, obj = {} as SchemaErrorType): ObjectSchema {
    return new ObjectSchemaImpl(shape, obj);
  }
  optional<T extends ValidTypes>(
    schema: BaseSchema<T> | ArraySchema<T>
  ): BaseSchema<T | ValidUndefined> {
    return schema.optional();
  }
  nullable<T extends ValidTypes>(
    schema: BaseSchema<T>
  ): BaseSchema<T | ValidNull> {
    return schema.nullable();
  }
  array<T extends ValidTypes>(schema: BaseSchema<T>): ArraySchema<T> {
    return new ArraySchemaImpl(schema);
  }
  union(schemaArray: BaseSchema<ValidTypes>[]): UnionSchema {
    return new UnionSchemaImpl(schemaArray);
  }
}

export default new SchemaCreatorImpl();
