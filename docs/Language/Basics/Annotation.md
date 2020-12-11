# Annotation

Annotations follow
[strings](Variable.html#string),
[numbers](Variable.html#number),
and
[booleans](Variable.html#boolean)
in variables in the form of
```ream
- <key>: <value>
  > <annotation>
```
and items in [lists](Variable.html#list) in the form of

```ream
- <key>:
  * <item>
    > <annotation>
```

Examples:

```ream
# Example
- key 1: value
  > Annotation for string
- key 2: $1$
  > Annotation for number
- key 3: `TRUE`
  > Annotation for boolean
```
<EditorLite-EditorLite item="annotation1" />

```ream
# Example
- list:
  * value
    > Annotation for string
  * $1$
    > Annotation for number
  * `TRUE`
    > Annotation for boolean
```
<EditorLite-EditorLite item="annotation2" />

::: tip
Annotations are ignored when compiled to datasets.
:::

Empty lines around annotations are allowed, but discouraged.

```ream
# Example
- key 1: value 1
- key 2: value 2
  > Annotation
- key 3: value 3

  > Valid annotation

- key 4: value 4
```
<EditorLite-EditorLite item="annotation3" />
