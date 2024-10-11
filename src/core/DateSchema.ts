import { SchemaErrorType, ValidationErrorType } from "../error/ErrorTypes";
import {
  DateFormate,
  TransformerFn,
  ValidationFn,
  ValidationResult,
} from "../utils/UtilityTypes";
import { DefaultValidationError, transform, validate } from "../utils/helper";
import { BaseSchemaImpl } from "./BaseSchema";
import { DateSchema, ValidBoolean, ValidDate } from "./SchemaType";

export class DateSchemaImpl
  extends BaseSchemaImpl<ValidDate>
  implements DateSchema
{
  // private validators: ValidationFn<Date>[] = [];
  // private transormations: TransformerFn<Date>[] = [];

  constructor(private obj: SchemaErrorType = {} as SchemaErrorType) {
    super();
  }

  validateType(value: unknown): ValidationResult<ValidDate> {
    const date = new Date(value as string);
    // check if the date is valid
    if (isNaN(date.getTime())) {
      return {
        success: false,
        error: this.obj.invalidTypeMsg || "Invalid date format",
      };
    }
    return { success: true, data: new Date(value as string) };
  }

  // parse(value: unknown): ValidationResult<Date> {
  //   // check string type first
  //   if (typeof value !== "string") {
  //     return {
  //       success: false,
  //       error: this.obj.invalidTypeMsg || "Date should be a string",
  //     };
  //   }

  // const date = new Date(value);
  // // check if the date is valid
  // if (isNaN(date.getTime())) {
  //   return {
  //     success: false,
  //     error: this.obj.invalidTypeMsg || "Invalid date format",
  //   };
  // }

  //   if (this.validators.length > 0) {
  //     const error = validate(date, this.validators);
  //     if (error) return { success: false, error };
  //   }
  //   if (this.transormations.length > 0) {
  //     const result = transform(date, this.transormations);
  //     return { success: true, data: result };
  //   }
  //   return { success: true, data: new Date(value as string) };
  // }

  past(
    obj: ValidationErrorType = DefaultValidationError.DATE_PAST
  ): DateSchema {
    this.validators.push((value: Date) => {
      const currentDate = new Date();
      return value.getTime() < currentDate.getTime() ? null : obj.message;
    });
    return this;
  }

  future(
    obj: ValidationErrorType = DefaultValidationError.DATE_PAST
  ): DateSchema {
    this.validators.push((value: Date) => {
      const currentDate = new Date();
      return value.getTime() > currentDate.getTime() ? null : obj?.message;
    });
    return this;
  }

  //   formate(format: DateFormate):string {
  //     this.transormations.push((value: Date) => {
  //       let result: string;
  //       let day = value.getDate();
  //       let month = value.getMonth() + 1;
  //       const year = value.getFullYear();

  //       const padZero = (num: number) => (num < 10 ? `0${num}` : `${num}`);

  //       if (format === "DD-MM-YYYY") {
  //         result = `${padZero(day)}-${padZero(month)}-${year}`;
  //       } else if (format === "MM-DD-YYYY") {
  //         result = `${padZero(month)}-${padZero(day)}-${year}`;
  //       } else if (format === "YYYY-MM-DD") {
  //         result = `${year}-${padZero(month)}-${padZero(day)}`;
  //       } else if (format === "YYYY-DD-MM") {
  //         result = `${year}-${padZero(day)}-${padZero(month)}`;
  //       } else if (format === "DD-YYYY-MM") {
  //         result = `${padZero(day)}-${year}-${padZero(month)}`;
  //       } else if (format === "MM-YYYY-DD") {
  //         result = `${padZero(month)}-${year}-${padZero(day)}`;
  //       } else {
  //         throw new Error("Invalid date format");
  //       }
  //       return result;
  //     });
  //   }
}
