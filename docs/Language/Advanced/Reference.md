# Reference
::: warning NOTE

Reference is not yet implemented in the parser.

REAM reference is inspired by YAML's anchor and alias, and is my implementation for [this rejected feature for TOML](https://github.com/toml-lang/toml/issues/13).

Another inspiration for referencing is my wrong understanding of how inheritances work in object-oriented programming.
I initially thought inheritances works with *instances*, and child instances are able to call parent instances' attributes and methods.

It turns out that what I was thinking was similar to a programming paradigm called "environmental acquisition" [(Gil & Lorenz, 1995)](https://www.cs.technion.ac.il/users/wwwb/cgi-bin/tr-get.cgi/1995/LPCR/LPCR9507.pdf) but there is almost no implementation for it.
The only one I could find is the python package [Acquisition](https://github.com/zopefoundation/Acquisition), and a simple illustration of how it work is as follows:

```python
import ExtensionClass, Acquisition

class Country(ExtensionClass.Base):
    def __init__(self, name):
        self.name = name

class Language(Acquisition.Implicit):
    def __init__(self, name):
        self.name = name

belgium = Country("Belgium")
flemish = Language("Flemmish")

flemish.country = belgium

print(flemish.country.name) # Belgium
```

`belgium` is a `Country` object, and `flemish` is a `Language` object.
While `Language` is not a subclass of `Country`, I can make `flemish` acquire the attribute `name` from `belgium`.

The preliminary design is as follows.

(The syntax highlighting is a bit messed up)

Example 1:
```ream
# CountryYear
- country (String): Belgium
- year (String): 2020
- unique_id (fn -> String): `THIS$country + '_' + THIS$year`
```

The keyword `THIS` can be omitted if it is followed by a local attribute:

```ream
# CountryYear
- country (String): Belgium
- year (String): 2020
- unique_id (fn -> String): `$country + '_' + $year`
```

Also values that are referenced require explicit typings.
The following will raise an error:

```ream
# CountryYear
- country (String): Belgium
- year: 2020
- unique_id (fn -> String): `$country + '_' + $year`
```

Example 2:
```ream
# The Benelux Union
- members:
  * Belgium
  * Netherlands
  * Luxembourg
- total_pop (fn -> Number): `THIS::Country$pop.SUM()`

## Country
- name: Belgium
- pop (Number): $11433256$

## Country
- name: Netherlands
- pop (Number): $17332850$

## Country
- name: Luxembourg
- pop (Number): $619900$
```

Attributes from sub-entries can be referenced by the namespace `<SubEntry Name>`.

Example 3:
```ream
# Country
- name: United States of America
- captial: Washington, D.C.

## City
- name: New York
- is_capital (fn -> Boolean): `THIS$name == THIS::SUPER$capital`

## City
- name: Washington, D.C.
- is_capital (fn -> Boolean): `THIS$name == THIS::SUPER$capital`
```

Attributes from a parent entry can be referenced by the `SUPER` namespace.

:::
