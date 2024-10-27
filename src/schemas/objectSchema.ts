import { SchemaErrorType } from '../error/ErrorTypes';
import { ValidationResult } from '../utils/typeUtils';
import { BaseSchemaImpl } from './BaseSchema';
import { ObjectSchema, ValidObject, InferType } from '../utils/typeUtils';

export class ObjectSchemaImpl<Shape extends ValidObject>
  extends BaseSchemaImpl<{ [K in keyof Shape]: InferType<Shape[K]> }>
  implements ObjectSchema<Shape>
{
  constructor(
    public shape: Shape,
    private obj: SchemaErrorType = {} as SchemaErrorType,
  ) {
    super();
  }

  keyof(): string[] {
    return Object.keys(this.shape);
  }

  validateType(
    value: unknown,
  ): ValidationResult<{ [K in keyof Shape]: InferType<Shape[K]> }> {
    if (typeof value === 'object' && value !== null) {
      const inputKeys = Object.keys(value as object);
      const schemaKeys = Object.keys(this.shape);

      if (schemaKeys.length > inputKeys.length) {
        return { success: false, error: 'Some fields are missing' };
      }

      if (schemaKeys.length < inputKeys.length) {
        return { success: false, error: 'Some extra fields are present' };
      }

      for (const [key, schema] of Object.entries(this.shape)) {
        const result = schema.parse((value as Record<string, unknown>)[key]);

        if (!result.success) {
          return { success: false, error: result.error };
        }
      }

      return {
        success: true,
        data: value as { [K in keyof Shape]: InferType<Shape[K]> },
      };
    }

    return { success: false, error: 'Invalid object type' };
  }

  extends<NewShape extends ValidObject>(
    newShape: NewShape,
  ): ObjectSchemaImpl<Shape & NewShape> {
    const extendedShape = { ...this.shape, ...newShape } as Shape & NewShape;
    return new ObjectSchemaImpl(extendedShape, this.obj);
  }

  merge<OtherShape extends ValidObject>(
    schema: ObjectSchema<OtherShape>,
  ): ObjectSchemaImpl<Shape & OtherShape> {
    const mergedShape = { ...this.shape, ...schema.shape } as Shape &
      OtherShape;
    return new ObjectSchemaImpl(mergedShape, this.obj);
  }
}
