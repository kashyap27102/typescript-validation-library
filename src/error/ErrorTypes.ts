// Validation Error
export type ValidationErrorType = { message: string };

// Schema Error
export type SchemaErrorType = {
  requiredMsg?: string;
  invalidTypeMsg?: string;
};
