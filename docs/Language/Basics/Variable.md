# Variable

All REAM file starts with a Level-1 Entry Header, in the form of

```ream
# <Level-1 Entry Header>
```

We will discuss what [entries](/Language/Basics/Entry) are later.
For now, just see this as the title of your dataset.

---

`<variable>` assigns a `<value>` to a `<key>`, in the form of

```ream
- <key>: <value>
```
Note that a space is required after the dash and colon.

`<key>` can't be empty.
It may contain any upper and lowercase letters (`A-Za-z`), digits (`0-9`) and spaces (`U+0020`), but must start with a letter.

`<value>` can be any of the following types:

- [String](#string)
- [Number](#number)
- [Boolean](#boolean)
- [List](#list)

## String

Example:
```ream
# Example
- string: value
- long string: Hello World
- quoted string: "quote"
```

<EditorLite-EditorLite item="string" />

There is not need to quote strings.
Quotation marks are stored as they are.

Values can't contain line breaks.
The following will raise an error:
```ream{3}
# Example
- key 1: first line
         second line
- key 2: value
```
::: details Known Issue
The current parser is able to parse the example.
It will read everything before and including `- key 1: first line`, then stop parsing and return whatever has been parsed, ignoring the rest of the file.
So the example is equivalent to:
```ream
# Example
- key 1: first line
```
Error handling will be improved in future versions.
:::

## Number

Numbers are surrounded by dollar signs (`$`).

Example:
```ream
# Example
- number 1: $1$
- number 2: $-2$
- number 3: $3.1415926$
```
<EditorLite-EditorLite item="number" />

If characters are placed outside the dollar signs, the entire value will be stored as a string, preserving the dollar signs.

Example:
```ream
# Example
- number: $1$
- not number 1: a$1$
- not number 2: $1$b
```
<EditorLite-EditorLite item="notNumber" />

::: details Known Issue
The current parser will identify every value surrounded by dollar signs as a number.
So
```ream
# Example
- number: $1$
- not a number: $abc$
```
generates
```csv
1,abc
```
instead of
```csv
1,$abc$
```
even though `abc` is not a valid number.

Strict number type checking will be implemented in the future.
:::

## Boolean

Boolean values are `` `TRUE` `` and `` `FALSE` ``, both uppercase and surrounded by backticks (`` ` ``).

Example:

```ream
# Example
- bool 1: `TRUE`
- bool 2: `FALSE`
- not bool 1: `true`
- not bool 2: FALSE
```
<EditorLite-EditorLite item="boolean" />

Note that boolean values must be exact matches.
Values not surrounded by batckticks or not uppercased will be stored as strings.

## List

A list is a sequence of strings, numbers, and/or boolean, in the form of:

```ream
- <key>:
  * <item>
  * <item>
  ...
  * <item>
```
`<item>` should be in separate lines, following an asterisk (`*`)

Example:
```ream
# Example
- list of strings:
  * item 1
  * item 2
  * item 3
- list of numbers:
  * $1$
  * $-2$
  * $3.1415926$
```
<EditorLite-EditorLite item="list1" />

::: tip
By default, lists are ignored when compiled to datasets.
:::

Recall that REAM is indentation insensitive.
Spaces before asterisks are not required, but two spaces are recommended.

```ream
# Example
- still a list:
* item 1
* item 2
* item 3
```

<EditorLite-EditorLite item="list2" />

Empty lines between list items are allowed, but discouraged:
```ream
# Example
- still a list:
  * item 1

  * item 2
  * item 3
```
<EditorLite-EditorLite item="list3" />
