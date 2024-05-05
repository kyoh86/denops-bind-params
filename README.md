# denops-bind-params

This is a deno library to reserve and bind parameters for denops dispatcher.

This library provides `bindDispatcher` function to bind parameters for denops dispatcher.
For example, if you want to bind parameters for `hello` command, you can write like this:

```typescript
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
    });
}
```

Then, users can reserve parameters for `hello` method like this:

```vim
:call denops#request("foo", "params:set-for-method", ["hello", {"name": "Alice", "age": 20}])
```

And users can call `hello` method without parameters like this:


```vim
:echo denops#request("hello")
```

It will show `Hello, Alice! You are 20 years old.`.

# License

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg)](http://www.opensource.org/licenses/MIT)

This software is released under the
[MIT License](http://www.opensource.org/licenses/MIT), see LICENSE.
