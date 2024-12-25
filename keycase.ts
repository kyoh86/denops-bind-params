type KebabToCamel<S extends string> = S extends `${infer T}-${infer U}`
  ? `${T}${Capitalize<KebabToCamel<U>>}`
  : S;

type CamelizeFromKebab<T> = {
  [K in keyof T as KebabToCamel<string & K>]: T[K];
};

/**
 * Converts object keys from kebab-case to camelCase.
 * @param obj - The object with kebab-case keys.
 * @returns  - The object with camelCase keys.
 */
export function kebabToCamel<K extends Record<string, unknown>>(
  obj: K,
): CamelizeFromKebab<K> {
  return Object.entries(obj).reduce((result, [key, value]) => {
    const camelKey = key.replace(
      /-([a-z])/g,
      (_, c) => c.toUpperCase(),
    ) as keyof CamelizeFromKebab<K>;
    result[camelKey] = value as CamelizeFromKebab<
      K
    >[keyof CamelizeFromKebab<K>];
    return result;
  }, {} as CamelizeFromKebab<K>);
}

type CamelToKebab<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Capitalize<T> ? "-" : ""}${Lowercase<T>}${CamelToKebab<U>}`
  : S;

type KebabizeFromCamel<T> = {
  [K in keyof T as CamelToKebab<string & K>]: T[K];
};

/**
 * Converts object keys from camelCase to kebab-case.
 * @param obj - The object with camelCase keys.
 * @returns  - The object with kebab-case keys.
 */
export function camelToKebab<K extends Record<string, unknown>>(
  obj: K,
): KebabizeFromCamel<K> {
  return Object.entries(obj).reduce((result, [key, value]) => {
    const kebabKey = key.replace(/([a-z])([A-Z])/g, "$1-$2")
      .toLowerCase() as keyof KebabizeFromCamel<K>;
    result[kebabKey] = value as KebabizeFromCamel<
      K
    >[keyof KebabizeFromCamel<K>];
    return result;
  }, {} as KebabizeFromCamel<K>);
}

type SnakeToCamel<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamel<U>>}`
  : S;

type CamelizeFromSnake<T> = {
  [K in keyof T as SnakeToCamel<string & K>]: T[K];
};

/**
 * Converts object keys from snake_case to camelCase.
 * @param obj - The object with snake_case keys.
 * @returns  - The object with camelCase keys.
 */
export function snakeToCamel<K extends Record<string, unknown>>(
  obj: K,
): CamelizeFromSnake<K> {
  return Object.entries(obj).reduce((result, [key, value]) => {
    const camelKey = key.replace(
      /_([a-z])/g,
      (_, c) => c.toUpperCase(),
    ) as keyof CamelizeFromSnake<K>;
    result[camelKey] = value as CamelizeFromSnake<
      K
    >[keyof CamelizeFromSnake<K>];
    return result;
  }, {} as CamelizeFromSnake<K>);
}

type CamelToSnake<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Capitalize<T> ? "_" : ""}${Lowercase<T>}${CamelToSnake<U>}`
  : S;

type SnakeizeFromCamel<T> = {
  [K in keyof T as CamelToSnake<string & K>]: T[K];
};

/**
 * Converts object keys from camelCase to snake_case.
 * @param obj - The object with camelCase keys.
 * @returns  - The object with snake_case keys.
 */
export function camelToSnake<K extends Record<string, unknown>>(
  obj: K,
): SnakeizeFromCamel<K> {
  return Object.entries(obj).reduce((result, [key, value]) => {
    const snakeKey = key.replace(/([a-z])([A-Z])/g, "$1_$2")
      .toLowerCase() as keyof SnakeizeFromCamel<K>;
    result[snakeKey] = value as SnakeizeFromCamel<
      K
    >[keyof SnakeizeFromCamel<K>];
    return result;
  }, {} as SnakeizeFromCamel<K>);
}

type PascalToCamel<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${Lowercase<First>}${Rest}`
  : S;

type CamelizeFromPascal<T> = {
  [K in keyof T as PascalToCamel<string & K>]: T[K];
};
/**
 * Converts object keys from PascalCase to camelCase.
 * @param obj - The object with PascalCase keys.
 * @returns  - The object with camelCase keys.
 */

export function pascalToCamel<K extends Record<string, unknown>>(
  obj: K,
): CamelizeFromPascal<K> {
  return Object.entries(obj).reduce((result, [key, value]) => {
    const camelKey =
      (key.charAt(0).toLowerCase() + key.slice(1)) as keyof CamelizeFromPascal<
        K
      >;
    result[camelKey] = value as CamelizeFromPascal<
      K
    >[keyof CamelizeFromPascal<K>];
    return result;
  }, {} as CamelizeFromPascal<K>);
}

type CamelToPascal<S extends string> = S extends `${infer T}${infer U}`
  ? `${Capitalize<T>}${U}`
  : S;

type PascalizeFromCamel<T> = {
  [K in keyof T as CamelToPascal<string & K>]: T[K];
};

/**
 * Converts object keys from camelCase to PascalCase.
 * @param obj - The object with camelCase keys.
 * @returns  - The object with PascalCase keys.
 */
export function camelToPascal<K extends Record<string, unknown>>(
  obj: K,
): PascalizeFromCamel<K> {
  return Object.entries(obj).reduce((result, [key, value]) => {
    const pascalKey =
      (key.charAt(0).toUpperCase() + key.slice(1)) as keyof PascalizeFromCamel<
        K
      >;
    result[pascalKey] = value as PascalizeFromCamel<
      K
    >[keyof PascalizeFromCamel<K>];
    return result;
  }, {} as PascalizeFromCamel<K>);
}

type KebabToSnake<S extends string> = S extends `${infer T}-${infer U}`
  ? `${T}_${KebabToSnake<U>}`
  : S;

type SnakeizeFromKebab<T> = {
  [K in keyof T as KebabToSnake<string & K>]: T[K];
};

/**
 * Converts object keys from kebab-case to snake_case.
 * @param obj - The object with kebab-case keys.
 * @returns  - The object with snake_case keys.
 */
export function kebabToSnake<K extends Record<string, unknown>>(
  obj: K,
): SnakeizeFromKebab<K> {
  return Object.entries(obj).reduce((result, [key, value]) => {
    const snakeKey = key.replace(/-/g, "_") as keyof SnakeizeFromKebab<K>;
    result[snakeKey] = value as SnakeizeFromKebab<
      K
    >[keyof SnakeizeFromKebab<K>];
    return result;
  }, {} as SnakeizeFromKebab<K>);
}

type SnakeToKebab<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}-${SnakeToKebab<U>}`
  : S;

type KebabizeFromSnake<T> = {
  [K in keyof T as SnakeToKebab<string & K>]: T[K];
};

/**
 * Converts object keys from snake_case to kebab-case.
 * @param obj - The object with snake_case keys.
 * @returns  - The object with kebab-case keys.
 */
export function snakeToKebab<K extends Record<string, unknown>>(
  obj: K,
): KebabizeFromSnake<K> {
  return Object.entries(obj).reduce((result, [key, value]) => {
    const kebabKey = key.replace(/_/g, "-") as keyof KebabizeFromSnake<K>;
    result[kebabKey] = value as KebabizeFromSnake<
      K
    >[keyof KebabizeFromSnake<K>];
    return result;
  }, {} as KebabizeFromSnake<K>);
}

type PascalToSnake<S extends string> = S extends `${infer First}${infer Rest}`
  ? Rest extends Capitalize<Rest>
    ? `${Lowercase<First>}${Rest extends "" ? "" : `_${PascalToSnake<Rest>}`}`
  : `${Lowercase<First>}${PascalToSnake<Rest>}`
  : S;

type SnakeizeFromPascal<T> = {
  [K in keyof T as PascalToSnake<string & K>]: T[K];
};

/**
 * Converts object keys from PascalCase to snake_case.
 * @param obj - The object with PascalCase keys.
 * @returns  - The object with snake_case keys.
 */
export function pascalToSnake<K extends Record<string, unknown>>(
  obj: K,
): SnakeizeFromPascal<K> {
  return Object.entries(obj).reduce((result, [key, value]) => {
    const snakeKey = key.replace(/([A-Z])/g, "_$1").toLowerCase().slice(
      1,
    ) as keyof SnakeizeFromPascal<K>;
    result[snakeKey] = value as SnakeizeFromPascal<
      K
    >[keyof SnakeizeFromPascal<K>];
    return result;
  }, {} as SnakeizeFromPascal<K>);
}

type SnakeToPascal<S extends string> = S extends `${infer T}_${infer U}`
  ? `${Capitalize<T>}${Capitalize<SnakeToPascal<U>>}`
  : Capitalize<S>;

type PascalizeFromSnake<T> = {
  [K in keyof T as SnakeToPascal<string & K>]: T[K];
};

/**
 * Converts object keys from snake_case to PascalCase.
 * @param obj - The object with snake_case keys.
 * @returns  - The object with PascalCase keys.
 */
export function snakeToPascal<K extends Record<string, unknown>>(
  obj: K,
): PascalizeFromSnake<K> {
  return Object.entries(obj).reduce((result, [key, value]) => {
    const pascalKey = key.replace(
      /(^\w|_\w)/g,
      (m) => m.replace("_", "").toUpperCase(),
    ) as keyof PascalizeFromSnake<K>;
    result[pascalKey] = value as PascalizeFromSnake<
      K
    >[keyof PascalizeFromSnake<K>];
    return result;
  }, {} as PascalizeFromSnake<K>);
}

type KebabToPascal<S extends string> = S extends `${infer T}-${infer U}`
  ? `${Capitalize<T>}${Capitalize<KebabToPascal<U>>}`
  : Capitalize<S>;

type PascalizeFromKebab<T> = {
  [K in keyof T as KebabToPascal<string & K>]: T[K];
};

/**
 * Converts object keys from kebab-case to PascalCase.
 * @param obj - The object with kebab-case keys.
 * @returns  - The object with PascalCase keys.
 */
export function kebabToPascal<K extends Record<string, unknown>>(
  obj: K,
): PascalizeFromKebab<K> {
  return Object.entries(obj).reduce((result, [key, value]) => {
    const pascalKey = key.replace(
      /(^\w|-\w)/g,
      (m) => m.replace("-", "").toUpperCase(),
    ) as keyof PascalizeFromKebab<K>;
    result[pascalKey] = value as PascalizeFromKebab<
      K
    >[keyof PascalizeFromKebab<K>];
    return result;
  }, {} as PascalizeFromKebab<K>);
}

type PascalToKebab<S extends string> = S extends `${infer First}${infer Rest}`
  ? Rest extends Capitalize<Rest>
    ? `${Lowercase<First>}${Rest extends "" ? "" : `-${PascalToKebab<Rest>}`}`
  : `${Lowercase<First>}${PascalToKebab<Rest>}`
  : S;

type KebabizeFromPascal<T> = {
  [K in keyof T as PascalToKebab<string & K>]: T[K];
};

/**
 * Converts object keys from PascalCase to kebab-case.
 * @param obj - The object with PascalCase keys.
 * @returns  - The object with kebab-case keys.
 */
export function pascalToKebab<K extends Record<string, unknown>>(
  obj: K,
): KebabizeFromPascal<K> {
  return Object.entries(obj).reduce((result, [key, value]) => {
    const kebabKey = key.replace(/([A-Z])/g, "-$1").toLowerCase().slice(
      1,
    ) as keyof KebabizeFromPascal<K>;
    result[kebabKey] = value as KebabizeFromPascal<
      K
    >[keyof KebabizeFromPascal<K>];
    return result;
  }, {} as KebabizeFromPascal<K>);
}
