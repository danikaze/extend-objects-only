const checkDom = typeof Element !== 'undefined';

/**
 * Check if a value is an DOM element
 * The check is only done in DOM environments
 *
 * @param value value to check
 * @returns `true` if `obj` is an DOM element
 */
export function isDom(value: unknown): value is Element {
  return checkDom && value instanceof Element;
}
