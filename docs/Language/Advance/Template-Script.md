# Template Script

::: warning NOTE
Template Script is not yet implemented in the current parser.

The goal of template script is to make datasets modular. Save a large datasets in smaller, manageable chunks, and bind them with the script.
It also make importing other datasets easier.

Template script is inspired by template languages.
One of the earlier implementation was written in [Jinja](https://jinja.palletsprojects.com), but since the project has moved away from Python, the earlier codes are no longer valid.

The current design is as follows:

```markdown
---
title: European Union
author: Chih-Ming Louis Lee
import:
  Belgium: ./Belgium.md
---
# European Union

## Country
- name <String>: `Country$name FOR Country IN Belgium`
- capital <String>: `Country$capital`
- population <Number>: `Country$population`
- euro zone <Boolean>: `Country$euro_zone`
```

is equivalent to the following Jinja code:

```jinja2
## Europen Union

{% for country in Belgium["Country"] %}
## Country
- name: {{ country['name'] }}
- capital {{ country['capital'] }}
- population: {{ country['population'] }}
- euro zone: {{ country['euro_zone'] }}
{% endfor %}
```

It doesn't make much sense to import one file to another, but you get the idea.

This is not super hard to implement.
In fact, once you understand the basic of Markdata, you can kind of write your own template:

```python
# Belgium = { "Country": [ { "name": "Belgium", "capital": "Brussels", "population": 11433256, "euro_zone": True } ] }
file = open('./data.md', 'w')
file.write("# European Union\n")
for country in Belgium["Country"]:
    file.write("## Country\n")
    file.write(f"- name: { country['name'] }\n")
    file.write(f"- capital: { country['capital'] }\n")
    file.write(f"- population: { country['population'] }\n")
    file.write(f"- euro zone: { country['euro_zone'] }\n")
file.close()
```
or use any template language you desire.

[Filter](https://jinja.palletsprojects.com/en/2.11.x/templates/#list-of-builtin-filters) is another useful functionality to implement.
:::
