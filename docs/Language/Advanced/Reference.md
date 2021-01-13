# Advanced Inheritance
::: warning NOTE

Advanced inheritance is not yet implemented in the parser.
The goal is for entries to make use of the information from their parent entries and/or sub-entries.

To generate entries based on their parent entries:
```ream
# The Benelux Union
- members:
  * Belgium
  * Netherlands
  * Luxembourg

## FOR Member in @The_Benelux_Union.members
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

To summarize the sub-entires:
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
