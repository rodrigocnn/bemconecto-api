export type Result<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };

export const Result = {
  ok<T>(data: T): Result<T> {
    return {
      success: true,
      data,
    };
  },

  fail<T>(error: string): Result<T> {
    return {
      success: false,
      error,
    };
  },
};
