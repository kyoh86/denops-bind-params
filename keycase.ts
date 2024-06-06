/**
 * Converts object keys from kebab-case to camelCase.
 * @param obj - The object with kebab-case keys.
 * @returns  - The object with camelCase keys.
 */
export function kebabToCamel<T = unknown>(
  obj: Record<string, T>,
): Record<string, T> {
  return Object.entries(obj).reduce((result, [key, value]) => {
    result[key.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = value;
    return result;
  }, {} as Record<string, T>);
}

/**
 * Converts object keys from camelCase to kebab-case.
 * @param obj - The object with camelCase keys.
 * @returns  - The object with kebab-case keys.
 */
export function camelToKebab<T = unknown>(
  obj: Record<string, T>,
): Record<string, T> {
  return Object.entries(obj).reduce((result, [key, value]) => {
    result[key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()] = value;
    return result;
  }, {} as Record<string, T>);
}

/**
 * Converts object keys from snake_case to camelCase.
 * @param  obj - The object with snake_case keys.
 * @returns  - The object with camelCase keys.
 */
export function snakeToCamel<T = unknown>(
  obj: Record<string, T>,
): Record<string, T> {
  return Object.entries(obj).reduce((result, [key, value]) => {
    result[key.replace(/_([a-z])/g, (_, c) => c.toUpperCase())] = value;
    return result;
  }, {} as Record<string, T>);
}

/**
 * Converts object keys from camelCase to snake_case.
 * @param  obj - The object with camelCase keys.
 * @returns  - The object with snake_case keys.
 */
export function camelToSnake<T = unknown>(
  obj: Record<string, T>,
): Record<string, T> {
  return Object.entries(obj).reduce((result, [key, value]) => {
    result[key.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase()] = value;
    return result;
  }, {} as Record<string, T>);
}

/**
 * Converts object keys from PascalCase to camelCase.
 * @param  obj - The object with PascalCase keys.
 * @returns  - The object with camelCase keys.
 */
export function pascalToCamel<T = unknown>(
  obj: Record<string, T>,
): Record<string, T> {
  return Object.entries(obj).reduce((result, [key, value]) => {
    result[key.charAt(0).toLowerCase() + key.slice(1)] = value;
    return result;
  }, {} as Record<string, T>);
}

/**
 * Converts object keys from camelCase to PascalCase.
 * @param  obj - The object with camelCase keys.
 * @returns  - The object with PascalCase keys.
 */
export function camelToPascal<T = unknown>(
  obj: Record<string, T>,
): Record<string, T> {
  return Object.entries(obj).reduce((result, [key, value]) => {
    result[key.charAt(0).toUpperCase() + key.slice(1)] = value;
    return result;
  }, {} as Record<string, T>);
}

/**
 * Converts object keys from kebab-case to snake_case.
 * @param  obj - The object with kebab-case keys.
 * @returns  - The object with snake_case keys.
 */
export function kebabToSnake<T = unknown>(
  obj: Record<string, T>,
): Record<string, T> {
  return Object.entries(obj).reduce((result, [key, value]) => {
    result[key.replace(/-/g, "_")] = value;
    return result;
  }, {} as Record<string, T>);
}

/**
 * Converts object keys from snake_case to kebab-case.
 * @param  obj - The object with snake_case keys.
 * @returns  - The object with kebab-case keys.
 */
export function snakeToKebab<T = unknown>(
  obj: Record<string, T>,
): Record<string, T> {
  return Object.entries(obj).reduce((result, [key, value]) => {
    result[key.replace(/_/g, "-")] = value;
    return result;
  }, {} as Record<string, T>);
}

/**
 * Converts object keys from PascalCase to snake_case.
 * @param  obj - The object with PascalCase keys.
 * @returns  - The object with snake_case keys.
 */
export function pascalToSnake<T = unknown>(
  obj: Record<string, T>,
): Record<string, T> {
  return Object.entries(obj).reduce((result, [key, value]) => {
    result[key.replace(/([A-Z])/g, "_$1").toLowerCase().slice(1)] = value;
    return result;
  }, {} as Record<string, T>);
}

/**
 * Converts object keys from snake_case to PascalCase.
 * @param  obj - The object with snake_case keys.
 * @returns  - The object with PascalCase keys.
 */
export function snakeToPascal<T = unknown>(
  obj: Record<string, T>,
): Record<string, T> {
  return Object.entries(obj).reduce((result, [key, value]) => {
    result[key.replace(/(^\w|_\w)/g, (m) => m.replace("_", "").toUpperCase())] =
      value;
    return result;
  }, {} as Record<string, T>);
}

/**
 * Converts object keys from kebab-case to PascalCase.
 * @param  obj - The object with kebab-case keys.
 * @returns  - The object with PascalCase keys.
 */
export function kebabToPascal<T = unknown>(
  obj: Record<string, T>,
): Record<string, T> {
  return Object.entries(obj).reduce((result, [key, value]) => {
    result[key.replace(/(^\w|-\w)/g, (m) => m.replace("-", "").toUpperCase())] =
      value;
    return result;
  }, {} as Record<string, T>);
}

/**
 * Converts object keys from PascalCase to kebab-case.
 * @param  obj - The object with PascalCase keys.
 * @returns  - The object with kebab-case keys.
 */
export function pascalToKebab<T = unknown>(
  obj: Record<string, T>,
): Record<string, T> {
  return Object.entries(obj).reduce((result, [key, value]) => {
    result[key.replace(/([A-Z])/g, "-$1").toLowerCase().slice(1)] = value;
    return result;
  }, {} as Record<string, T>);
}
