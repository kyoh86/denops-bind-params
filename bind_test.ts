import { ensure, is } from "@core/unknownutil";
import { test } from "@denops/test";
import { assertEquals } from "@std/assert";
import { bindDispatcher } from "./bind.ts";

test({
  mode: "all",
  name: "It can call all bound methods",
  fn: () => {
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
    assertEquals(dispatcher.hello({ name: "Alice" }), "Hello, Alice!");
    assertEquals(dispatcher.bye({ name: "Alice" }), "Bye, Alice!");
  },
});

test({
  mode: "all",
  name: "It can call a bound method with a reserved parameter",
  fn: () => {
    const dispatcher = bindDispatcher({
      hello: (...args: unknown[]) => {
        const { name } = ensure(args[0], is.ObjectOf({ name: is.String }));
        return `Hello, ${name}!`;
      },
    });
    dispatcher["params:set-one"]("hello", "name", "Alice");
    assertEquals(dispatcher.hello(), "Hello, Alice!");
  },
});

test({
  mode: "all",
  name:
    "It can call a bound method with a reserved parameter and a normal parameter",
  fn: () => {
    const dispatcher = bindDispatcher({
      hello: (...args: unknown[]) => {
        const { name, age } = ensure(
          args[0],
          is.ObjectOf({ name: is.String, age: is.Number }),
        );
        return `Hello, ${name}! You are ${age} years old.`;
      },
    });
    dispatcher["params:set-one"]("hello", "name", "Alice");
    assertEquals(
      dispatcher.hello({ age: 20 }),
      "Hello, Alice! You are 20 years old.",
    );
  },
});

test({
  mode: "all",
  name:
    "It can call a bound method with a reserved parameter and override it with a normal parameter",
  fn: () => {
    const dispatcher = bindDispatcher({
      hello: (...args: unknown[]) => {
        const { name } = ensure(args[0], is.ObjectOf({ name: is.String }));
        return `Hello, ${name}!`;
      },
    });
    dispatcher["params:set-one"]("hello", "name", "Alice");
    assertEquals(dispatcher.hello({ name: "Bob" }), "Hello, Bob!");
  },
});

test({
  mode: "all",
  name:
    "It can call a bound method with a reserved parameter and override it with a normal parameter",
  fn: () => {
    const dispatcher = bindDispatcher({
      hello: (...args: unknown[]) => {
        const { name } = ensure(args[0], is.ObjectOf({ name: is.String }));
        return `Hello, ${name}!`;
      },
    });
    dispatcher["params:set-one"]("hello", "name", "Alice");
    assertEquals(dispatcher.hello({ name: "Bob" }), "Hello, Bob!");
  },
});

test({
  mode: "all",
  name:
    "It can call a bound method with a reserved default value for across methods and reserved parameter and override it with a normal parameter",
  fn: () => {
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
    dispatcher["params:set-one"]("_", "name", "Alice");
    dispatcher["params:set-one"]("bye", "name", "Bob");
    assertEquals(
      dispatcher.hello({ age: 20 }),
      "Hello, Alice! You are 20 years old.",
    );
    assertEquals(dispatcher.bye(), "Bye, Bob!");
    assertEquals(
      dispatcher.hello({ name: "Charlie", age: 30 }),
      "Hello, Charlie! You are 30 years old.",
    );
    assertEquals(
      dispatcher.bye({ name: "Charlie" }),
      "Bye, Charlie!",
    );
  },
});
