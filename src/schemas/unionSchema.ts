import { BaseSchemaImpl } from './baseSchema';
import { BaseSchema, ValidTypes, ValidationResult } from '../utils/typeUtils';

export class UnionSchemaImpl<T extends ValidTypes[]> extends BaseSchemaImpl<
  T[number]
> {
  constructor(private schemas: BaseSchema<ValidTypes>[]) {
    super();
  }

  protected validateType(value: unknown): ValidationResult<T[number]> {
    for (const schema of this.schemas) {
      const result = schema.parse(value);
      if (result.success) {
        return {
          success: true,
          data: result.data as T,
        };
      }
    }
    return {
      success: false,
      error: 'Value does not match any schema in the union',
    };
  }
}
