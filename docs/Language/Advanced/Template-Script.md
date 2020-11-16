# Template Script

::: warning NOTE
Template Script is not yet implemented in the current parser.

The goal of the template script is to make datasets modular. Save a large datasets in smaller, manageable chunks, and bind them with the script.
It also make importing external datasets easier.

Template script is inspired by template languages.
One of the earlier implementations was based on [Jinja](https://jinja.palletsprojects.com), but since the project has moved away from Python, the earlier codes are no longer usable.

Say you want to bind the following three files:

```ream
---
title: Belgium
---
# Country
- name: Belgium
- capital: Brussels
```

```ream
---
title: Netherlands
---
# Country
- name: Netherlands
- capital: Amsterdam
```

```ream
---
title: Luxembourg
---
# Country
- name: Luxembourg
- capital: Luxembourg City
```

You can do so by specifying the schema in the codebook:
```ream
---
title: The Benelux Union
import:
  Belgium:     Belgium.md
  Netherlands: Netherlands.md
  Luxembourg:  Luxembourg.md
---
# The Benelux Union

## FOR Country IN [Belgium, Netherlands, Luxembourg]
- name: `Country.name`
- capital: `Country.capital`
```
and get the following REAM file:
```ream
# The Benelux Union

## Country
- name: Belgium
- capital: Brussels

## Country
- name: Netherlands
- capital: Amsterdam

## Country
- name: Luxembourg
- capital: Luxembourg City
```

This is equivalent to the following Jinja code:

```jinja2
# The Benelux Union

{% for country in Countries %}
## Country
- name: {{ country['name'] }}
- capital {{ country['capital'] }}
{% endfor %}
```

This is not super hard to implement.
Once you understand the basic of REAM, you can write your own template generator.
You can use Python:

```python
# You read and parsed the three files and got three dictionaries:
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
benelux.close()
```
or use any programming or template language you desire.

It's not hard, but writing a custom script every time you make a dataset seems cumbersome.
There should be a better way.

![the general problem](https://imgs.xkcd.com/comics/the_general_problem.png)

[Filter](https://jinja.palletsprojects.com/en/2.11.x/templates/#list-of-builtin-filters) is another useful functionality I plan to implement.
:::
