# Template Script

::: warning NOTE
Template Script is not yet implemented in the current parser.

The goal of template script is to make datasets modular. Save a large datasets in smaller, manageable chunks, and bind them with the script.
It also make importing other datasets easier.

Template script is inspired by template languages.
One of the earlier implementation was based on [Jinja](https://jinja.palletsprojects.com), but since the project has moved away from Python, the earlier codes are no longer valid.

A preliminary design is as follows:

```markdown
---
title: European Union
author: Chih-Ming Louis Lee
import:
  Belgium: ./Belgium.md
  Netherlands: ./Netherlands.md
  Luxembourg: ./Luxembourg.md
---

# The Benelux Union

## Country `FOR Country IN Belgium, Netherlands, Luxembourg`
- name <String>: `Country::name`
- capital <String>: `Country::capital`
- population <Number>: `Country::population`
- euro zone <Boolean>: `Country::euro_zone`
```

is equivalent to the following Jinja code:

```jinja2
# The Benelux Union

{% for country in Country %}
## Country
- name: {{ country['name'] }}
- capital {{ country['capital'] }}
- population: {{ country['population'] }}
- euro zone: {{ country['euro_zone'] }}
{% endfor %}
```

(There is definitely a better way to write this, but you get the idea.)

This is not super hard to implement.
Once you understand the basic of REAM, you can kind of write your own template:

```python
# You read and parsed the three files and get three dictionaries:
# belgium_dict = { "Country": [ { "name": "Belgium", "capital": "Brussels", "population": 11433256, "euro_zone": True } ] }
# netherlands_dict = { "Country": [ { "name": "Netherlands", "capital": "Amsterdam", "population": 17332850, "euro_zone": True } ] }
# luxembourg_dict = { "Country": [ { "name": "Luxembourg", "capital": "Luxembourg City", "population": 619900, "euro_zone": True } ] }

benelux_list = [
    belgium_dict,
    netherlands_dict,
    luxembourg_dict,
]

benelux = open('./benelux.md', 'w')
benelux.write("# The Benelux Union\n")
for file in benelux_list:
    country_list = file['Country']
    for country in country_list:
        benelux.write("## Country\n")
        benelux.write(f"- name: { country['name'] }\n")
        benelux.write(f"- capital: { country['capital'] }\n")
        benelux.write(f"- population: { country['population'] }\n")
        benelux.write(f"- euro zone: { country['euro_zone'] }\n")
benelux.close()
```
or use any template language you desire.

It's not hard, but it gets cumbersome to manually write custom script for every single dataset.
There should be an easier way.

[Filter](https://jinja.palletsprojects.com/en/2.11.x/templates/#list-of-builtin-filters) is another useful functionality I plan to implement.
:::
