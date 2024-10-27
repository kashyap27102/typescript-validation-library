import { SchemaErrorType } from '../error/ErrorTypes';
import { ValidationResult } from '../utils/typeUtils';
import { BaseSchemaImpl } from './BaseSchema';
import { ValidBoolean } from './SchemaType';
import { BooleanSchema } from './SchemaType';

export class BooleanSchemaImpl
  extends BaseSchemaImpl<ValidBoolean>
  implements BooleanSchema
{
  constructor(private obj: SchemaErrorType = {} as SchemaErrorType) {
    super();
  }

  validateType(value: unknown): ValidationResult<boolean> {
    if (typeof value !== 'boolean') {
      return {
        success: false,
        error:
          this.obj.invalidTypeMsg ||
          `Expected a boolean, but got ${typeof value}`,
      };
    }
    return { success: true, data: value };
  }
}
