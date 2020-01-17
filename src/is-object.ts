const objectToString = Object.prototype.toString;

/**
 * Check if a value is an object
 *
 * @param value value to check
 * @returns `true` if `obj` is an object
 */
export function isObject(value: unknown): value is object {
  const type = typeof value;

  return (
    value != null && // tslint:disable-line:triple-equals
    (type === 'object' || type === 'function') &&
    objectToString.call(value) !== '[object Array]'
  );
}
