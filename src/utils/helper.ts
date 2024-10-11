import { ValidationError } from "../error/error";
import { TransformerFn, ValidationFn } from "./UtilityTypes";

export const DefaultValidationError = {
  STRING_MIN: (length: number) =>
    new ValidationError(`String must be at least ${length} characters long`),
  STRING_MAX: (length: number) =>
    new ValidationError(`String must be at most ${length} characters long`),
  STRING_EMAIL: new ValidationError("Email is not in valid format"),
  NUMBER_INT: new ValidationError("value must be an integer"),
  NUMBER_POSITIVE: new ValidationError("value must be positive"),
  NUMBER_NEGATIVE: new ValidationError("value must be negative"),

  DATE_PAST: new ValidationError("Date must be in the past"),
  DATE_FUTURE: new ValidationError("Date must be in the future"),

  ARR_VALUE_NOT_MATCH: new ValidationError("Array values does not match"),
  ARR_EMPTY: new ValidationError("Array must not be empty"),
  ARR_MAX: (length: number) =>
    new ValidationError(`Array must have at most ${length} elements`),
  ARR_MIN: (length: number) =>
    new ValidationError(`Array must have at least ${length} elements`),
  ARR_LENGTH: (length: number) =>
    new ValidationError(`Array must have ${length} elements`),
};

export const validate = <T>(value: T, fn: ValidationFn<T>[]) => {
  for (const validation of fn) {
    const error = validation(value);
    if (error) {
      return error;
    }
  }
  return null;
};

export const transform = <T>(value: T, fn: TransformerFn<T>[]) => {
  let result = value;
  for (const transform of fn) {
    result = transform(result);
  }
  return result;
};
