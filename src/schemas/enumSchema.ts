import { SchemaErrorType } from '../error/ErrorTypes';
import { ValidationResult } from '../utils/typeUtils';
import { BaseSchemaImpl } from './BaseSchema';
import { EnumSchema, ValidEnum } from '../utils/typeUtils';

export class EnumSchemaImpl<T extends readonly string[]>
  extends BaseSchemaImpl<ValidEnum<T>>
  implements EnumSchema<T>
{
  public options: string[] = [];

  constructor(
    private values: T,
    private obj = {} as SchemaErrorType,
  ) {
    super();

    // this.options = Object.keys(this.values);
  }

  validateType(value: unknown): ValidationResult<ValidEnum<T>> {
    // check if value is a string
    if (typeof value !== 'string') {
      return {
        success: false,
        error: this.obj.invalidTypeMsg || 'Invalid type',
      };
    }
    // check if value is in the enum
    if (!Object.values(this.values).includes(value)) {
      return {
        success: false,
        error: 'Invalid enum value',
      };
    }

    return { success: true, data: value as unknown as ValidEnum<T> };
  }
}
