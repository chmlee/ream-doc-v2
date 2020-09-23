# Typed Variable

::: warning NOTE
Typed variables are not yet implemented in the current parser.

The goal is to implement synchronize type checking in the editor, and async type checking in the standalone parser.

The type of the variables are specified in the schema file.
The design will be either:
```markdown
# Country
- name: <String>
- capital: <String>
- population: <Number>
- euro zone: <Boolean>
```

or

```markdown
# Country
- name <String>: %
- capital <String>: %
- population <Number>: %
- euro zone <Boolean>: %
```

Subtypes will be introduced, such as:
- `Number::Interger`
- `Number::Float`
- `Number::Fraction`
- `String::Year`
- `String::Date`

New types will also be introduced, such as:
- `Factor:[ (AF)rica | (AS)ia | (EU)rope | (N)orth (A)merica | (S)outh (A)merica ]`
- `Regex:/^(0?[1-9]|1[0-2]):[0-5][0-9]$/`
- `List:Number:Integer`

:::
