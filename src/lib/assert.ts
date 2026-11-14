export function assert(
  condition: unknown,
  message = "no additional info provided",
): asserts condition {
  if (!condition) {
    throw new Error("Assertion Error: " + message);
  }
}
