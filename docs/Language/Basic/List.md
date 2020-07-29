# List

A list is a sequence of strings, numbers, and/or boolean, in the form of:

```
- <key>:
  * <item>
  * <item>
  ...
  * <item>
```
`<item>` should be in separate lines, following an asterisk (`*`)

Example:
```markdown
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
<EditorLite item="list1" />

::: tip
By default, lists will be ignored when compiled to datasets.
:::

Spaces before asterisks are not required, but two spaces are recommended.

```markdown
# Example
- still a list:
* item 1
* item 2
* item 3
```

<EditorLite item="list2" />

Empty lines between list items are allowed, but discouraged:
```markdown
# Example
- still a list:
  * item 1

  * item 2
  * item 3
```
<EditorLite item="list3" />
