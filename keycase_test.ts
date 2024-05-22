import { test } from "@denops/test";
import { assertEquals } from "@std/assert";
import {
  camelToKebab,
  camelToPascal,
  camelToSnake,
  kebabToCamel,
  kebabToPascal,
  kebabToSnake,
  pascalToCamel,
  pascalToKebab,
  pascalToSnake,
  snakeToCamel,
  snakeToKebab,
  snakeToPascal,
} from "./keycase.ts"; // 実際の関数のパスに置き換えてください

test({
  mode: "all",
  name: "kebabToCamel should convert kebab-case keys to camelCase",
  fn: () => {
    const input = { "first-name": "John", "last-name": "Doe" };
    const expected = { firstName: "John", lastName: "Doe" };
    const result = kebabToCamel(input);
    assertEquals(result, expected);
  },
});

test({
  mode: "all",
  name: "camelToKebab should convert camelCase keys to kebab-case",
  fn: () => {
    const input = { firstName: "John", lastName: "Doe" };
    const expected = { "first-name": "John", "last-name": "Doe" };
    const result = camelToKebab(input);
    assertEquals(result, expected);
  },
});

test({
  mode: "all",
  name: "snakeToCamel should convert snake_case keys to camelCase",
  fn: () => {
    const input = { first_name: "John", last_name: "Doe" };
    const expected = { firstName: "John", lastName: "Doe" };
    const result = snakeToCamel(input);
    assertEquals(result, expected);
  },
});

test({
  mode: "all",
  name: "camelToSnake should convert camelCase keys to snake_case",
  fn: () => {
    const input = { firstName: "John", lastName: "Doe" };
    const expected = { first_name: "John", last_name: "Doe" };
    const result = camelToSnake(input);
    assertEquals(result, expected);
  },
});

test({
  mode: "all",
  name: "pascalToCamel should convert PascalCase keys to camelCase",
  fn: () => {
    const input = { FirstName: "John", LastName: "Doe" };
    const expected = { firstName: "John", lastName: "Doe" };
    const result = pascalToCamel(input);
    assertEquals(result, expected);
  },
});

test({
  mode: "all",
  name: "camelToPascal should convert camelCase keys to PascalCase",
  fn: () => {
    const input = { firstName: "John", lastName: "Doe" };
    const expected = { FirstName: "John", LastName: "Doe" };
    const result = camelToPascal(input);
    assertEquals(result, expected);
  },
});

test({
  mode: "all",
  name: "kebabToSnake should convert kebab-case keys to snake_case",
  fn: () => {
    const input = { "first-name": "John", "last-name": "Doe" };
    const expected = { first_name: "John", last_name: "Doe" };
    const result = kebabToSnake(input);
    assertEquals(result, expected);
  },
});

test({
  mode: "all",
  name: "snakeToKebab should convert snake_case keys to kebab-case",
  fn: () => {
    const input = { first_name: "John", last_name: "Doe" };
    const expected = { "first-name": "John", "last-name": "Doe" };
    const result = snakeToKebab(input);
    assertEquals(result, expected);
  },
});

test({
  mode: "all",
  name: "pascalToSnake should convert PascalCase keys to snake_case",
  fn: () => {
    const input = { FirstName: "John", LastName: "Doe" };
    const expected = { first_name: "John", last_name: "Doe" };
    const result = pascalToSnake(input);
    assertEquals(result, expected);
  },
});

test({
  mode: "all",
  name: "snakeToPascal should convert snake_case keys to PascalCase",
  fn: () => {
    const input = { first_name: "John", last_name: "Doe" };
    const expected = { FirstName: "John", LastName: "Doe" };
    const result = snakeToPascal(input);
    assertEquals(result, expected);
  },
});

test({
  mode: "all",
  name: "kebabToPascal should convert kebab-case keys to PascalCase",
  fn: () => {
    const input = { "first-name": "John", "last-name": "Doe" };
    const expected = { FirstName: "John", LastName: "Doe" };
    const result = kebabToPascal(input);
    assertEquals(result, expected);
  },
});

test({
  mode: "all",
  name: "pascalToKebab should convert PascalCase keys to kebab-case",
  fn: () => {
    const input = { FirstName: "John", LastName: "Doe" };
    const expected = { "first-name": "John", "last-name": "Doe" };
    const result = pascalToKebab(input);
    assertEquals(result, expected);
  },
});
