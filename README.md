# denops-bind-params

This is a deno library to reserve and bind parameters for [denops](https://vim-denops.github.io/denops-documentation/) dispatcher.

This library provides `bindDispatcher` function to bind parameters for denops dispatcher.
For example, if you want to bind parameters, you can write like this:

```typescript:denops/foo/main.ts
import { bindDispatcher } from "jsr:@kyoh86/denops-bind-params@MODULE_VERSION/mod.ts";
import { ensure, is } from "https://deno.land/x/unknownutil@v3.18.0/mod.ts";

export function main(denops: Denops) {
    denops.dispatcher = bindDispatcher({
      hello(uParams: unknown) {
        const {name, age} = uParams as is.ObjectOf({
            name: is.String,
            age: is.Number,
        });
        return `Hello, ${name}! You are ${age} years old.`;
      },

      goodbye(uParams: unknown) {
        const {name} = uParams as is.ObjectOf({
            name: is.String,
        });
        return `Goodbye, ${name}!`;
      },
    });
}
```

Then, users can reserve parameters for `hello` method like this:

```vim
:call denops#request("foo", "params:set-for-method", ["hello", {"name": "Alice", "age": 20}])
```

And users can call `hello` method without parameters like this:

```vim
:echo denops#request("foo", "hello")
```

It will show `Hello, Alice! You are 20 years old.`.

Of course, users can call `hello` method with parameters like this:

```vim
:echo denops#request("foo", "hello", {"name": "Bob", "age": 18})
```

It will show `Hello, Bob! You are 18 years old.`.

Users can also set one parameter for a method like this:

```vim
:call denops#request("foo", "params:set-for-method", ["hello", {"name": "Charlie"}])
```

or

```vim
:call denops#request("foo", "params:set-one", ["hello", "age", 16])
```

And also can set multiple parameters for multiple methods like this:

```vim
:call denops#request("foo", "params:set-all", [{"hello": {"name": "David"}}, {"goodbye": {"name": "Eve"}}])
```

If users want to set a default value for a parameter, they can specify `_` as a function name:

```vim
:call denops#request("foo", "params:set-for-method", ["_", {"name": "Frank"}])
```

Then, `hello` and `goodbye` methods will use `name` parameter as `Frank` by default.
Of cource, users can override the default value like this:

```vim
:call denops#request("foo", "params:set-for-method", ["hello", {"name": "Grace"}])
```

Then, `hello` method will use `name` parameter as `Grace`.

# License

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg)](http://www.opensource.org/licenses/MIT)

This software is released under the
[MIT License](http://www.opensource.org/licenses/MIT), see LICENSE.
