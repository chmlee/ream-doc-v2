# Template

::: warning NOTE
Template is not yet implemented in the current parser.

The goal of the template is to make datasets modular. Save a large datasets in smaller, manageable chunks, and bind them with the template specified int he codebook.
It also makes importing external datasets possible.

Template is inspired by template languages.
One of the earlier implementations was based on [Jinja](https://jinja.palletsprojects.com), but since the project has moved away from Python, a new solution is needed.

Say you want to bind the following three files into one file:

```ream
# Country
- name: Belgium
- capital: Brussels
```

```ream
# Country
- name: Netherlands
- capital: Amsterdam
```

```ream
# Country
- name: Luxembourg
- capital: Luxembourg City
```

You can do so by specifying the schema in the codebook:
```ream
# The Benelux Union
- countries (List.Path):
  * ./Country/Belgium.ream
  * ./Country/Netherlands.ream
  * ./Country/Luxembourg.ream

{% FOR Country IN $countries %}
## Country
- name: {{ Country$name }}
- capital: {{ Country$capital}}
```

If you are familiar with any template language, you can probably tell I'm trying to write the template logics with REAM syntax as much as I can to let them less out of place.
External elements are imported through specifying a variable with `List.path` type, a list of file paths.
We don't need to mark where the `FOR` loop ends with something like `{% ENDFOR %}` since of course I want to render the entire `## Country` entry and not just part of it.
But I have yet to find a better way to incorporate the `FOR` logic with REAM syntax, hence the weird `{% FOR ... IN ... %}` syntax.

Or maybe it is a bad idea to write template logics with native syntax, and I should just write all template logics with an entirely different syntax.
Since Jinja is the only template language I am familiar with, let's write the template logics in a Jinja-like syntax.
It would probably look like:

```jinja2
{% import './Country/Belgium.ream'     as Belgium %}
{% import './Country/Netherlands.ream' as Netherlands %}
{% import './Country/Luxembourg.ream'  as Luxembourg %}
{% set Countries = [ Belgium, Netherlands, Luxembourg ] %}
# The Benelux Union

{% for Country in Countries %}
## Country
- name: {{ Country$name }}
- capital: {{ Country$capital }}
{% endfor %}
```

This is so much harder to read.
If this is what my template language eventually looks like, why would anyone choose this instead of using something like Jinja which features similar syntax but more mature, more feature-rich, and (almost certainly) faster?

(Well, one reason may be that this is NOT how you should write Jinja, as [it is usually recommended to remove as much logic from templates as possible](https://jinja.palletsprojects.com/en/2.11.x/faq/#isn-t-it-a-terrible-idea-to-put-logic-into-templates), and I put EVERY logic in the template.
I would assume other template languages have similar recommendations.)

If I want to write a template language for REAM, I want my solution to incorporate elegantly into REAM's native syntax, just like Vue's [`v-for`](https://vuejs.org/v2/api/#v-for).

Anyway, both templates should generate the following file:

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

[Filter](https://jinja.palletsprojects.com/en/2.11.x/templates/#list-of-builtin-filters) is another useful functionality I plan to implement.
See [Computed Variable](/ream-doc/Language/Advanced/Computed-Variable).
:::
