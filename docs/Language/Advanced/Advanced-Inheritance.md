# Advanced Inheritance
::: warning NOTE

Advanced inheritance is not yet implemented in the parser.
The goal is for entries to make use of the information from their parent entries and/or sub-entires.

To generate entries based on their parent entires:
```ream
# The Benelux Union
- members:
  * Belgium
  * Netherlands
  * Luxembourg

## FOR member in @The_Benelux_Union.members
- name: `member`
- is_Belgium: `member == 'Belgium'`
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

:::
