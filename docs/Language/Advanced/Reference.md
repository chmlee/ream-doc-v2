# Reference

::: warning NOTE

Reference is not yet implemented in the parser.
The functionality is inspired by YAML's [anchors and aliases](https://yaml.org/spec/1.2/spec.html#anchor/), and allows users to reuse existing data.

This allows referencing data from parent entry:

```ream
# The Benelux Union
- members:
  * Belgium
  * Netherlands
  * Luxembourg

## `FOR Member IN @TheBeneluxUnion.members`
- name: `Member`
- is_Belgium: `Member == 'Belgium'`
```
and get
```ream
# The Benelux Union
- members:
  * Belgium
  * Netherlands
  * Luxembourg

## Member
- name: Belgium
- is_Belgium: `TRUE`

## Member
- name: Netherlands
- is_Belgium: `FALSE`

## Member
- name: Luxembourg
- is_Belgium: `FALSE`
```

Reference also work on subentries:
```ream
# The Benelux Union
- total_pop: `FOR ALL $Country.pop | SUM()`

## Country
- name: Belgium
- pop: $11433256$

## Country
- name: Netherlands
- pop: $17332850$

## Country
- name: Luxembourg
- pop: $619900$
```
and get
```ream
# The Benelux Union
- total_pop: $29386005$

## Country
- name: Belgium
- pop: $11433255$

## Country
- name: Netherlands
- pop: $17332850$

## Country
- name: Luxembourg
- pop: $619900$
```

:::
