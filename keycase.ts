/**
 * Converts object keys from kebab-case to camelCase.
 * @param {Record<string, unknown>} obj - The object with kebab-case keys.
 * @returns {Record<string, unknown>} - The object with camelCase keys.
 */
export function kebabToCamel(
  obj: Record<string, unknown>,
): Record<string, unknown> {
  return Object.entries(obj).reduce((result, [key, value]) => {
    result[key.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = value;
    return result;
  }, {} as Record<string, unknown>);
}

/**
 * Converts object keys from camelCase to kebab-case.
 * @param {Record<string, unknown>} obj - The object with camelCase keys.
 * @returns {Record<string, unknown>} - The object with kebab-case keys.
 */
export function camelToKebab(
  obj: Record<string, unknown>,
): Record<string, unknown> {
  return Object.entries(obj).reduce((result, [key, value]) => {
    result[key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()] = value;
    return result;
  }, {} as Record<string, unknown>);
}

/**
 * Converts object keys from snake_case to camelCase.
 * @param {Record<string, unknown>} obj - The object with snake_case keys.
 * @returns {Record<string, unknown>} - The object with camelCase keys.
 */
export function snakeToCamel(
  obj: Record<string, unknown>,
): Record<string, unknown> {
  return Object.entries(obj).reduce((result, [key, value]) => {
    result[key.replace(/_([a-z])/g, (_, c) => c.toUpperCase())] = value;
    return result;
  }, {} as Record<string, unknown>);
}

/**
 * Converts object keys from camelCase to snake_case.
 * @param {Record<string, unknown>} obj - The object with camelCase keys.
 * @returns {Record<string, unknown>} - The object with snake_case keys.
 */
export function camelToSnake(
  obj: Record<string, unknown>,
): Record<string, unknown> {
  return Object.entries(obj).reduce((result, [key, value]) => {
    result[key.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase()] = value;
    return result;
  }, {} as Record<string, unknown>);
}

/**
 * Converts object keys from PascalCase to camelCase.
 * @param {Record<string, unknown>} obj - The object with PascalCase keys.
 * @returns {Record<string, unknown>} - The object with camelCase keys.
 */
export function pascalToCamel(
  obj: Record<string, unknown>,
): Record<string, unknown> {
  return Object.entries(obj).reduce((result, [key, value]) => {
    result[key.charAt(0).toLowerCase() + key.slice(1)] = value;
    return result;
  }, {} as Record<string, unknown>);
}

/**
 * Converts object keys from camelCase to PascalCase.
 * @param {Record<string, unknown>} obj - The object with camelCase keys.
 * @returns {Record<string, unknown>} - The object with PascalCase keys.
 */
export function camelToPascal(
  obj: Record<string, unknown>,
): Record<string, unknown> {
  return Object.entries(obj).reduce((result, [key, value]) => {
    result[key.charAt(0).toUpperCase() + key.slice(1)] = value;
    return result;
  }, {} as Record<string, unknown>);
}

/**
 * Converts object keys from kebab-case to snake_case.
 * @param {Record<string, unknown>} obj - The object with kebab-case keys.
 * @returns {Record<string, unknown>} - The object with snake_case keys.
 */
export function kebabToSnake(
  obj: Record<string, unknown>,
): Record<string, unknown> {
  return Object.entries(obj).reduce((result, [key, value]) => {
    result[key.replace(/-/g, "_")] = value;
    return result;
  }, {} as Record<string, unknown>);
}

/**
 * Converts object keys from snake_case to kebab-case.
 * @param {Record<string, unknown>} obj - The object with snake_case keys.
 * @returns {Record<string, unknown>} - The object with kebab-case keys.
 */
export function snakeToKebab(
  obj: Record<string, unknown>,
): Record<string, unknown> {
  return Object.entries(obj).reduce((result, [key, value]) => {
    result[key.replace(/_/g, "-")] = value;
    return result;
  }, {} as Record<string, unknown>);
}

/**
 * Converts object keys from PascalCase to snake_case.
 * @param {Record<string, unknown>} obj - The object with PascalCase keys.
 * @returns {Record<string, unknown>} - The object with snake_case keys.
 */
export function pascalToSnake(
  obj: Record<string, unknown>,
): Record<string, unknown> {
  return Object.entries(obj).reduce((result, [key, value]) => {
    result[key.replace(/([A-Z])/g, "_$1").toLowerCase().slice(1)] = value;
    return result;
  }, {} as Record<string, unknown>);
}

/**
 * Converts object keys from snake_case to PascalCase.
 * @param {Record<string, unknown>} obj - The object with snake_case keys.
 * @returns {Record<string, unknown>} - The object with PascalCase keys.
 */
export function snakeToPascal(
  obj: Record<string, unknown>,
): Record<string, unknown> {
  return Object.entries(obj).reduce((result, [key, value]) => {
    result[key.replace(/(^\w|_\w)/g, (m) => m.replace("_", "").toUpperCase())] =
      value;
    return result;
  }, {} as Record<string, unknown>);
}

/**
 * Converts object keys from kebab-case to PascalCase.
 * @param {Record<string, unknown>} obj - The object with kebab-case keys.
 * @returns {Record<string, unknown>} - The object with PascalCase keys.
 */
export function kebabToPascal(
  obj: Record<string, unknown>,
): Record<string, unknown> {
  return Object.entries(obj).reduce((result, [key, value]) => {
    result[key.replace(/(^\w|-\w)/g, (m) => m.replace("-", "").toUpperCase())] =
      value;
    return result;
  }, {} as Record<string, unknown>);
}

/**
 * Converts object keys from PascalCase to kebab-case.
 * @param {Record<string, unknown>} obj - The object with PascalCase keys.
 * @returns {Record<string, unknown>} - The object with kebab-case keys.
 */
export function pascalToKebab(
  obj: Record<string, unknown>,
): Record<string, unknown> {
  return Object.entries(obj).reduce((result, [key, value]) => {
    result[key.replace(/([A-Z])/g, "-$1").toLowerCase().slice(1)] = value;
    return result;
  }, {} as Record<string, unknown>);
}
