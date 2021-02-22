---
home: true
tagline: Human-friendly data serialization standard for social science datasets
actionText: Get Started
actionLink: /Language/Getting-Started
footer: Made by Chih-Ming Louis Lee
---

> It reads like Markdown, writes like Markdonw, converts like Markdown.
> Is it Markdown?

> **RE**am **A**int **M**arkdown!

```ream
# Country
- name: Belgium
- capital: Brussels
- population: $11433256$
  > data from 2019; retrieved from World Bank
- euro zone: `TRUE`
  > joined in 1999

## Language
- name: Dutch

## Language
- name: French

## Language
- name: German
```


<EditorLite-EditorLite item="entry8" showDefault="True"/>

REAM is a data serialization standard that compiles to analysis-ready formats (JSON, CSV, etc.) and documentations (HTML, PDF, etc.)
The language, along with the [toolchain](/ream-doc/Toolchain), aims to create human-readable, modular, interoperable and reusable datasets for social science.

## Key Features

### Inline Documentation

Recording data and its documentation in two separate files - a spreadsheet and a text file - is prone to human-error.
The potential inconsistency between the two files makes managing datasets difficult, especially for large collaborative projects.
REAM encourages inline documentation through [annotations](/ream-doc/Language/Basics/Annotation) which are included when generating the documentations and ignored when compiling to datasets.
Two files, one source.

### Human-Readable Syntax

REAM syntax is a strict subset of [Markdown](https://commonmark.org/), and can be processed as such to generate documentations.
The basic syntax should be human-readable and easy to learn if not already familiar.
In addition, social science data can sometimes be better presented in a nested structured, and REAM syntax is designed to work well with deeply nested data structures.
See [here](#) for a more detailed discussion and comparison.

### Easy to Use

A [web-based editor](https://chmlee.github.io/ream-editor) is available for basic editing.
No local installation is required: visit the link, drag and drop[1] your REAM file, and start editing.
Advanced functionalities are available through the [REAM CLI tool](https://github.com/chmlee/ream-core) [2].
No complex development environment to set up.
No third-party dependencies to manage besides Git.
Just one executable binary file.

### Don't Repeat Yourself (WIP)

REAM implements a reference system where each entry can reference attributes from its parent- and sub-entries.
This keep datasets clean and easy to maintain as the size grows.
See [how reference work](/ream-doc/Language/Advanced/Reference).

### Batteriess Included (WIP)

Multiple tools are developed around REAM to provide a user-friendly workflow to create, edit, distribute and reuse REAM dataset, including REAM serializer/deserializer, documentation generator, linter, schema validator, template engine, project manager, and more.
See [Toolchain](/ream-doc/Toolchain) for more information.

### Git Integration

Though not required, REAM and its toolchain are designed to work with [Git](https://git-scm.com/), a distributed version control system for personal and collaborative projects.
See [how REAM works with Git](/ream-doc/Language/Git-Integration)


---

[1]: not yet implemented

[2]: Working in progress

::: warning NOTE
The project is under active development, and is not production ready.
You are free to play around with the tools, but note that backward compatibility is not guaranteed.

See [Roadmap](#) for more information.
:::
