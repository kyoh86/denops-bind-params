import { assertEquals } from "@std/assert";
import { ensure, is } from "@core/unknownutil";
import { test } from "https://deno.land/x/denops_test@v1.6.2/mod.ts";
import { bindDispatcher } from "./bind.ts";

test({
  mode: "all",
  name: "It can call all bound methods",
  fn: async () => {
    const dispatcher = bindDispatcher({
      hello: (...args: unknown[]) => {
        const { name } = ensure(args[0], is.ObjectOf({ name: is.String }));
        return `Hello, ${name}!`;
      },
      bye: (...args: unknown[]) => {
        const { name } = ensure(args[0], is.ObjectOf({ name: is.String }));
        return `Bye, ${name}!`;
      },
    });
    assertEquals(await dispatcher.hello({ name: "Alice" }), "Hello, Alice!");
    assertEquals(await dispatcher.bye({ name: "Alice" }), "Bye, Alice!");
  },
});

test({
  mode: "all",
  name: "It can call a bound method with a reserved parameter",
  fn: async () => {
    const dispatcher = bindDispatcher({
      hello: (...args: unknown[]) => {
        const { name } = ensure(args[0], is.ObjectOf({ name: is.String }));
        return `Hello, ${name}!`;
      },
    });
    await dispatcher["params:set-one"]("hello", "name", "Alice");
    assertEquals(await dispatcher.hello(), "Hello, Alice!");
  },
});

test({
  mode: "all",
  name:
    "It can call a bound method with a reserved parameter and a normal parameter",
  fn: async () => {
    const dispatcher = bindDispatcher({
      hello: (...args: unknown[]) => {
        const { name, age } = ensure(
          args[0],
          is.ObjectOf({ name: is.String, age: is.Number }),
        );
        return `Hello, ${name}! You are ${age} years old.`;
      },
    });
    await dispatcher["params:set-one"]("hello", "name", "Alice");
    assertEquals(
      await dispatcher.hello({ age: 20 }),
      "Hello, Alice! You are 20 years old.",
    );
  },
});

test({
  mode: "all",
  name:
    "It can call a bound method with a reserved parameter and override it with a normal parameter",
  fn: async () => {
    const dispatcher = bindDispatcher({
      hello: (...args: unknown[]) => {
        const { name } = ensure(args[0], is.ObjectOf({ name: is.String }));
        return `Hello, ${name}!`;
      },
    });
    await dispatcher["params:set-one"]("hello", "name", "Alice");
    assertEquals(await dispatcher.hello({ name: "Bob" }), "Hello, Bob!");
  },
});

test({
  mode: "all",
  name:
    "It can call a bound method with a reserved parameter and override it with a normal parameter",
  fn: async () => {
    const dispatcher = bindDispatcher({
      hello: (...args: unknown[]) => {
        const { name } = ensure(args[0], is.ObjectOf({ name: is.String }));
        return `Hello, ${name}!`;
      },
    });
    await dispatcher["params:set-one"]("hello", "name", "Alice");
    assertEquals(await dispatcher.hello({ name: "Bob" }), "Hello, Bob!");
  },
});

test({
  mode: "all",
  name:
    "It can call a bound method with a reserved default value for across methods and reserved parameter and override it with a normal parameter",
  fn: async () => {
    const dispatcher = bindDispatcher({
      hello: (...args: unknown[]) => {
        const { name, age } = ensure(
          args[0],
          is.ObjectOf({ name: is.String, age: is.Number }),
        );
        return `Hello, ${name}! You are ${age} years old.`;
      },
      bye: (...args: unknown[]) => {
        const { name } = ensure(args[0], is.ObjectOf({ name: is.String }));
        return `Bye, ${name}!`;
      },
    });
    await dispatcher["params:set-one"]("_", "name", "Alice");
    await dispatcher["params:set-one"]("bye", "name", "Bob");
    assertEquals(
      await dispatcher.hello({ age: 20 }),
      "Hello, Alice! You are 20 years old.",
    );
    assertEquals(await dispatcher.bye(), "Bye, Bob!");
    assertEquals(
      await dispatcher.hello({ name: "Charlie", age: 30 }),
      "Hello, Charlie! You are 30 years old.",
    );
    assertEquals(
      await dispatcher.bye({ name: "Charlie" }),
      "Bye, Charlie!",
    );
  },
});
