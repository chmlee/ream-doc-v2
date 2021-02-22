# Typed Variable

::: warning NOTE
Typed system is not yet implemented in the current parser.

The type of the variables are specified in the codebook.
It may look like:

```ream
# Country
- name (String): %
- capital (String): %
- population (Number): %
- euro zone (Boolean): %
```

or

```ream
# Country
- name: (String)
- capital: (String)
- population: (Number)
- euro zone: (Boolean)
```

or

```ream
# Country
- name: %
  > !Type: String
- capital: %
  > !Type: String
- population: %
  > !Type: Number
- euro zone: %
  > !Type: Boolean
```

I'm leaning toward the first one, but no decision has been made yet.

New types will also be introduced, such as:
- `Number.Fraction`
- `Date`
- `Coordinates`

Explicit typing can also be added to a regular REAM data file:

```ream
# Country
- name (String): Belgium
- capital (String): Brussels
- population (Integer): $11433256$
- euro zone (Boolean): `TRUE`
```

:::
