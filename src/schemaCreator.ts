import { ArraySchemaImpl } from '.';
import { BooleanSchemaImpl } from '.';
import { DateSchemaImpl } from '.';
import { EnumSchemaImpl } from '.';
import { NumberSchemaImpl } from '.';
import { ObjectSchemaImpl } from '.';
import {
  ArraySchema,
  BaseSchema,
  BooleanSchema,
  DateSchema,
  EnumSchema,
  NumberSchema,
  ObjectSchema,
  SchemaCreator,
  StringSchema,
  TupleSchema,
  UnionSchema,
  ValidNull,
  ValidObject,
  ValidTypes,
  ValidUndefined,
} from '.';
import { StringSchemaImpl } from '.';
import { UnionSchemaImpl } from '.';
import { SchemaErrorType } from '.';
import { TupleSchemaImpl } from '.';

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
  enum<T extends readonly string[]>(
    values: T,
    obj = {} as SchemaErrorType,
  ): EnumSchema<T> {
    return new EnumSchemaImpl(values, obj);
  }
  object<Shape extends ValidObject>(
    shape: Shape,
    obj = {} as SchemaErrorType,
  ): ObjectSchema<Shape> {
    return new ObjectSchemaImpl(shape, obj);
  }
  optional<T extends ValidTypes>(
    schema: BaseSchema<T> | ArraySchema<T>,
  ): BaseSchema<T | ValidUndefined> {
    return schema.optional();
  }
  nullable<T extends ValidTypes>(
    schema: BaseSchema<T>,
  ): BaseSchema<T | ValidNull> {
    return schema.nullable();
  }
  array<T extends ValidTypes>(schema: BaseSchema<T>): ArraySchema<T> {
    return new ArraySchemaImpl(schema);
  }
  union<T extends ValidTypes[]>(schemas: {
    [K in keyof T]: BaseSchema<T[K]>;
  }): UnionSchema<T> {
    return new UnionSchemaImpl(schemas);
  }
  tuple<T extends ValidTypes[]>(tuple: {
    [K in keyof T]: BaseSchema<T[K]>;
  }): TupleSchema<T> {
    return new TupleSchemaImpl(tuple);
  }
}
