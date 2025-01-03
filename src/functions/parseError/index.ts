/** @format */

export function parseError<T>(error: T) {
  if (error instanceof Error) {
    return {
      message: error.message,
      stack: error.stack,
      name: error.name,
    };
  } else {
    return {
      message: String(error),
      stack: "Unknown error",
      name: "Unknown",
    };
  }
}
export default parseError;
