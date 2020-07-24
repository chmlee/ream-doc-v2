# Entry

Entry is a collection of variables.
An entry name is proceeded by one or multiple pound signs `#`, in the form of:

```markdown
# <entry name>
- <key 1>: <value 1>
- <key 2>: <value 2>
...
- <key n>: <value n>
```

Entries are useful when describing an object with multiple attributes:

```markdown
# Country
- name: Belgium
- capital: Brussels
- population: $11433256$
- euro_zone: `TRUE`
```

<EditorLite item="entry1" />

You can also annotate variables.
```markdown
# Country
- name: Belgium
  > short for the Kingdom of Belgium
- capital: Brussels
- population: $11433256$
  > data from 2019; retrieved from World Bank
- euro_zone: `TRUE`
  > joined in 1999
```

<EditorLite item="entry2" />

Entries should have local unique keys.
The following code will raise error:
```markdown
# Country
- name: Belgium
- offical_language: Dutch
- offical_language: French
- offical_language: German
```
::: warning NOTE
The current parser don't check for duplicate keys, so technically this is still valid.
This will be fixed in future versions.
:::

## Subentry

Entries can be nested.


::: details
```python
class Country(object):
    def __init__(self, con_nam, con_cap, con_pop, con_eur):
        self.country_name = con_nam
        self.country_capital = con_cap
        self.country_population = con_pop
        self.country_euro_zone = con_eur

class Language(Country):
    def __init__(self, con_nam, con_cap, con_pop, con_eur, lan_nam, lan_siz):
        Country.__init__(self, con_nam, con_cap, con_pop, con_eur)
        self.language_name = lan_nam
        self.language_size = lan_siz
```
:::
