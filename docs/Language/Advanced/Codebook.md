# Codebook

::: warning NOTE
Codebook is not yet implemented in the current parser.

The codebook is a separate file that acts as a linter configuration file.
It allows synchronize checking in REAM editor, and async checking in the standalone parser.

The codebook is very similar to a regular REAM file, with some extra parameters added.
The current design is as follows:

```ream
# Country{1}
- name: %
- captial: %
- popilation: %
- euro zone: %

## Language+
- name: %
- size: %

## Region+
- name: %

### Province*
- name: %
```
The `%` is a placeholder.

The codebook not only dictates what variables each entry has, but also the amount of entries for each class.
The parameters following entry names are inspired by regular expression, and imply:

- The file contains exactly one `# Country` entry, as implied by the `{1}` suffix.
- Each `# Country` entry has 1 or more `## Language` subentry, and 1 or more `## Region` subentry, as implied by the `+` suffix.
- Each `## Region` entry has 0 or more `### Province` subentry, as implied by the `*` suffix.

Other common regular expression notations will also be implemented, such as `?, {min, max}`
:::
