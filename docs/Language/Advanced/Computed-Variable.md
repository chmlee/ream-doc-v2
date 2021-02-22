# Computed Variable

::: warning NOTE

Computed variables are not yet implemented in the parser.

Computed variables are functions that returns one or more values, in the form of
```ream
- function (fn -> return_type): `statements that return values`
```

Some simple examples:
```ream
# Numbers
- one (Number): $1$
- two (Number): $2$
- three (Number): $3$
- four (fn -> Number): `2 + 2`
```

```ream
# CountryYear
- country (String): Belgium
- year (String): 2020
- unique_id (fn -> String): `'Belgium' + '_' + '2020'`
```

For function with more than one line, the syntax would be:

````ream
- function (fn -> return_type):
```language_name
statements
that
return
values
```
````

But what language to use?

I'm currently rewriting the parser in Rust, with the goal to use the same codebase for both standalone CLI tool and the web-based editor.
That being said, I need this embedded language to
1. be interpreted or compiled just in time,
2. works with WASM,
3. is easy to learn and read.

There are [a lot of langauges created to be embedded in Rust applications.](https://arewegameyet.rs/ecosystem/scripting/).
I've been experimenting with [Rhai](https://rhai.rs/book/), and is pleased with how easy it is to integrate the language with Rust.
It has basic libraries for strings and numbers, and it's easy add my own modules.
But one major problem that Rhai, as well as most such languages, has is that my targeted audience most definitely don't know it.
It's hard to convince them to learn a language that has little use outside of REAM; the most popular among those is Lua, and even that would be a hard sell.
Relying too much on these embedable langauges may lead to a steaper learning curve.

The second option is to embed a mature language interpreter written in Rust, such as [RustPython](https://rustpython.github.io/) for Python or [Boa](https://github.com/boa-dev/boa) for JavaScript.
People are more likely to know these langauges, and may be more willing to learn even if they don't.
One obvious downside is that I have to ship my tool with the language interpreter, while I'm trying to keep the core application small.
It's almost certain that any of such add-ons would be larger in size than the core code base.
Another problem is that most of such projects are not production ready.

The third option is to write my own language.
It doesn't have to be a general-purpose turning-complete language, but to simply provide basic methods to manipulate strings, numbers, and other types supported by REAM.
If doing so, the syntax of this language would be similar to Python and supports method chaining.

Currently I'm debating between using Rhai and writing my own.
I lean slightly toward writing my own because I want to implement [Reference](/ream-doc/Language/Advanced/Reference).

:::
